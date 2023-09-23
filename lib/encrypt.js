const CryptoJs = require("crypto-js");

const secretKey = "secret key 112200";
class AES {
  /**
   * encode the entry string
   * @param {string} text the entry string
   * @returns {string}
   */
  static encrypt(text) {
    return CryptoJs.AES.encrypt("" + text, secretKey).toString();
  }

  /**
   * decode hashed string
   * @param {string} hashText the hashed text
   * @returns {string}
   */
  static decrypt(hashText) {
    return CryptoJs.AES.decrypt(hashText, secretKey).toString(
      CryptoJs.enc.Utf8
    );
  }
}

class MD5 {
  /**
   * encode the entry string
   * @param {string} text the entry string
   * @returns {string}
   */
  static encrypt(text) {
    return CryptoJs.MD5("" + text).toString();
  }
}

class Base64URL {
  /**
   * encode the entry string
   * @param {string} text the entry string
   * @returns {string}
   */
  static encrypt(text) {
    return CryptoJs.enc.Base64url.stringify(CryptoJs.enc.Utf8.parse(text));
  }

  /**
   * decode hashed string
   * @param {string} hashText the hashed text
   * @returns {string}
   */
  static decrypt(hashText) {
    return CryptoJs.enc.Base64url.parse(hashText).toString(CryptoJs.enc.Utf8);
  }
}

module.exports = { AES, MD5, Base64URL };
