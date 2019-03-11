const hebChars = require('./char_objs/hebCharsTrans');

/***
 * @param {string} text - replaces Heb chars with Latin chars in a tit-for-tat manner
 * @return {string}
 */

module.exports = text => text.replace(/[\u0591-\u05F4, \uFB1D-\uFB4F]/gu, i => hebChars[i]);