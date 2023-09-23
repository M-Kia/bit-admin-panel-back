const Router = require("express").Router;
const prisma = require("../db/prisma");

const { checkEntries } = require("../lib/helpers");
const { generateToken, checkToken } = require("../lib/token");
const { MD5 } = require("../lib/encrypt");

// declare router
const router = Router();

// login api
router.post("/login", async (req, res) => {
  const body = req.body;

  // check if request has user-agent header or not.
  // we need that for token.
  const userAgent = req.headers["user-agent"];
  if (userAgent === undefined) {
    return res.status(400).json({ message: "No User-Agent provided!" });
  }

  // checks if the data we need has been sent or not.
  if (!checkEntries(body, ["email", "password"])) {
    return res.status(500).json({ message: "Insufficient data provided!" });
  }
  const { email, password } = body;

  try {
    // find the user
    const user = await prisma.user.findUnique({
      where: {
        email,
        password: MD5.encrypt(password),
      },
      include: {
        image: true,
      },
    });
    if (user === null) {
      return res
        .status(404)
        .json({ message: "There is no user with this email and password." });
    }

    const token = generateToken(user.id, userAgent);

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "Something went wrong." });
  }
});

// sign up api
router.post("/", async (req, res) => {
  // check if request has user-agent header or not.
  // we need that for token.
  const userAgent = req.headers["user-agent"];
  if (userAgent === undefined) {
    return res.status(400).json({ message: "No User-Agent provided!" });
  }

  // checks if the data we need has been sent or not.
  if (!checkEntries(body, ["email", "password"])) {
    return res.status(500).json({ message: "Insufficient data provided!" });
  }
  const { email, password } = body;

  try {
    // create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: MD5.encrypt(password),
      },
    });
    if (user === null) {
      return res
        .status(404)
        .json({ message: "There is no user with this email and password." });
    }

    const token = generateToken(user.id, userAgent);

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "Something went wrong." });
  }
});

// change password api
router.patch("/", async (req, res) => {
  // check if request has user-agent header or not.
  // we need that for token.
  const userAgent = req.headers["user-agent"];
  if (userAgent === undefined) {
    return res.status(400).json({ message: "No User-Agent provided!" });
  }

  const token = req.headers.authorization;

  // check the token's existence
  if (token === undefined) {
    return res.status(501).json({ message: "No token provided!" });
  }

  // validate the token
  const userId = checkToken(token, userAgent);
  if (userId === false) {
    return res.status(502).json({ message: "Wrong token provided!" });
  }

  // checks if the data we need has been sent or not.
  if (!checkEntries(body, ["oldPassword", "newPassword"])) {
    return res.status(500).json({ message: "Insufficient data provided!" });
  }
  const { oldPassword, newPassword } = body;

  try {
    // find the user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user === null) {
      return res
        .status(504)
        .json({ message: "Something went wrong. Please try again later." });
    }

    if (user.password !== MD5.encrypt(oldPassword)) {
      return res.status(505).json({ message: "Wrong old password." });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: MD5.encrypt(newPassword),
      },
    });

    res.json({ message: "User was updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "Something went wrong." });
  }
});

// edit profile api
router.put("/", async (req, res) => {
  // check if request has user-agent header or not.
  // we need that for token.
  const userAgent = req.headers["user-agent"];
  if (userAgent === undefined) {
    return res.status(400).json({ message: "No User-Agent provided!" });
  }

  const token = req.headers.authorization;

  // check the token's existence
  if (token === undefined) {
    return res.status(501).json({ message: "No token provided!" });
  }

  // validate the token
  const userId = checkToken(token, userAgent);
  if (userId === false) {
    return res.status(502).json({ message: "Wrong token provided!" });
  }

  // checks if the data we need has been sent or not.
  if (!checkEntries(body, ["fullName", "birthday", "gender", "imageId"])) {
    return res.status(500).json({ message: "Insufficient data provided!" });
  }
  const { fullName, birthday, gender, imageId } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user === null) {
      return res
        .status(504)
        .json({ message: "Something went wrong. Please try again later." });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName,
        birthday,
        gender,
        imageId,
      },
    });

    res.json({ message: "User was updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "Something went wrong." });
  }
});

module.exports = router;
