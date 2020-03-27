const hebCharsRC = require("./char_objs/hebCharsRC")
const hebCharsRV = require("./char_objs/hebCharsRV")

/***
 * @param {string} text
 * @param {Object} [options]
 * @param {boolean} [options.removeVowels=false] - removes vowels in addition to cantillation marks
 * @returns {string}
 */

const remCant = (char) => (char in hebCharsRC ? hebCharsRC[char] : char)
const remVow = (char) => (char in hebCharsRV ? hebCharsRV[char] : char)

module.exports = (text, options = { removeVowels: false }) => {
  return [...text].map((char) => (!options.removeVowels ? remCant(char) : remVow(char))).reduce((a, c) => a + c)
}
