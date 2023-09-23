const Router = require("express").Router;
const prisma = require("../db/prisma");

const { checkEntries } = require("../lib/helpers");
const { checkToken } = require("../lib/token");

// declare router
const router = Router();

// add category api
router.post("/", async (req, res) => {
  const body = req.body;

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
  if (!checkEntries(body, ["name", "color"])) {
    return res.status(500).json({ message: "Insufficient data provided!" });
  }
  const { name, color } = body;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        color,
      },
    });

    res.json({ category, message: "Category was created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "Something went wrong." });
  }
});

// edit category api
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const body = req.body;

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
  if (!checkEntries(body, ["name", "color"])) {
    return res.status(500).json({ message: "Insufficient data provided!" });
  }
  const { name, color } = body;

  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        color,
      },
    });

    res.json({ category, message: "Category was updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "Something went wrong." });
  }
});

// delete category api
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

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

  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    res.json({ message: "Category was deleted successfully." });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "Something went wrong." });
  }
});

module.exports = router;
