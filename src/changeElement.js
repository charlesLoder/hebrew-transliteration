module.exports = {
  /***
   * @param {string} input
   * @param {string} split
   * @param {string} join
   */
  changeElementSplit: (input, split, join) => input.split(split).join(join),
  /***
   * @param {string} input
   * @param {number} index
   * @param {string} join
   */
  changeElementSubstr: (input, index, join) => input.substring(0, index) + join + input.substring(index + 1)
}
