const { AES, MD5 } = require("./encrypt");

/**
 *
 * @param {number|string} uid the user identifier
 * @param {string} userAgent the client's user agent
 * @returns {string}
 */
function generateToken(uid = -1, userAgent) {
  return AES.encrypt(
    `${MD5.encrypt(`${userAgent}##${uid}`)}##${uid}##${Date.now()}`
  );
}

/**
 *
 * @param {string} token the user's token
 * @param {string} userAgent the client's user agent
 * @returns {false|string}
 */
function checkToken(token, userAgent) {
  if (token === undefined || token.trim() === "") {
    return false;
  }

  const decodedArr = AES.decrypt(token).split("##");

  if (
    decodedArr.length === 3 &&
    MD5.encrypt(`${userAgent}##${decodedArr[1]}`) === decodedArr[0]
  ) {
    return decodedArr[1];
  } else {
    return false;
  }
}

module.exports = {
  generateToken,
  checkToken,
};
