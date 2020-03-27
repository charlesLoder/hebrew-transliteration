const hebChars = require("./char_objs/hebCharsTrans")

/***
 * @param {string} text - replaces Heb chars with Latin chars in a tit-for-tat manner
 * @return {string}
 */

module.exports = (text) => [...text].map((char) => (char in hebChars ? hebChars[char] : char)).reduce((a, c) => a + c)
