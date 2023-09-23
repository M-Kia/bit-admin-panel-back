/**
 * Checking if key(s) sent from client side of not
 *
 * @param { {[key: string]: any} } body body of request
 * @param {string|string[]} key key(s) we want to check
 * @return {boolean}
 */
function checkEntries(body, key) {
  if (!Array.isArray(key)) {
    key = [key];
  }

  const bodyKeys = Object.keys(body);
  return key.every((k) => bodyKeys.includes(k));
}

module.exports = { checkEntries };
