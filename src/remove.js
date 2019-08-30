const hebCharsRC = require('./char_objs/hebCharsRC');
const hebCharsRV = require('./char_objs/hebCharsRV');

/***
 * @param {string} text
 * @param {Object} [options]
 * @param {boolean} [options.removeVowels=false] - removes vowels in addition to cantillation marks
 * @returns {string}
 */

module.exports = (text, options = {removeVowels: false}) => !options.removeVowels ? text.replace(/[\u0591-\u05F4, \uFB1D-\uFB4F]/gu, i => hebCharsRC[i]) : text.replace(/[\u0591-\u05F4, \uFB1D-\uFB4F]/gu, i => hebCharsRV[i]);
