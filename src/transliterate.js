const sequence = require('./sequence');
const titForTat = require('./titForTat');
const testEach = require('./testEach');

/***
 * @param {string} text
 * @param {Object} [options]
 * @param {boolean} [options.isSeqeunced=true] - sequences text according to SBL Hebrew Font manual
 * @param {boolean} [options.qametsQatan=false] - checks for Qamets Qatan
 * @returns {string}
 */

module.exports = (text, options = {'isSeqeunced': true, 'qametsQatan': false}) => {
    let newSeq = '';
    if(options.isSeqeunced) {
        newSeq = sequence(text);
    } else {
        newSeq = text;
    }
    let titTat = titForTat(newSeq);
    let array = titTat.split(' ');
    let modArray = testEach(array, {'qametsQatan': options.qametsQatan});
    let transliteration = modArray.join(' ');
    return transliteration;
}