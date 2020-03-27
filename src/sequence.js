/***
 * @param {string} text - sequences the text according to SBL Hebrew Font manual
 * @returns {string}
 */

let consonants = /[\u05D0-\u05F2,\uFB20-\uFB4F]/
let ligature = /[\u05C1-\u05C2]/
let dagesh = /[\u05BC,\u05BF]/ // includes rafe
let vowels = /[\u05B0-\u05BB,\u05C7]/
let accents = /[\u0590-\u05AF,\u05BD-\u05BE,\u05C0,\u05C3]/

function Char(char) {
  this.char = char
  this.posIndex = this.findPos(this.char)
}

Char.prototype.findPos = (char) => {
  if (consonants.test(char)) {
    return 0
  }
  if (ligature.test(char)) {
    return 1
  }
  if (dagesh.test(char)) {
    return 2
  }
  if (vowels.test(char)) {
    return 3
  }
  if (accents.test(char)) {
    return 4
  }
  return undefined
}

module.exports = (text) => {
  const splits = /(?=[\u05D0-\u05F2, \uFB20-\uFB4F])/
  const charClusters = text.split(splits)
  const mapClusters = charClusters.map((cluster) => {
    return [...cluster].map((char) => new Char(char))
  })
  const sortClusters = mapClusters.map((cluster) => cluster.sort((a, b) => a.posIndex - b.posIndex))
  const redClusters = sortClusters.map((cluster) => cluster.reduce((a, c) => ({ char: a.char + c.char })))
  const textObj = redClusters.reduce((a, c) => ({ char: a.char + c.char }))
  const seqText = textObj.char
  return seqText
}
