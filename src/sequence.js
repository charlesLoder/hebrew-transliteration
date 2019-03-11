/***
 * @param {string} text - sequences the text according to SBL Hebrew Font manual
 * @returns {string}
 */

module.exports = text => {
    let splits = /(?=[\u05D0-\u05F2, \uFB20-\uFB4F])/;
    let consonants = /[\u05D0-\u05F2, \uFB20-\uFB4F]/;
    let ligature = /[\u05C1-\u05C2]/; 
    let dagesh = /[\u05BC, \u05BF]/; // includes rafe
    let vowels = /[\u05B0-\u05BB, \u05C7]/;
    let accents = /[\u0590-\u05AF, \u05BD-\u05BE, \u05C0, \u05C3]/;
    return text.split(splits).map(e => {
          return e.split('').sort((a,b) => {
            // since the str is split at consonants, the first a is always const, thus never flip
             if(consonants.test(a) ) {return 0}
             // if a is anything except a consonant and b is a ligature, then flip
             if(!consonants.test(a) && ligature.test(b)){return 1}
             if(vowels.test(a) && dagesh.test(b)) {return 1}
             if(accents.test(a) && dagesh.test(b)) {return 1}
        }).join('')
      }).join('')
}