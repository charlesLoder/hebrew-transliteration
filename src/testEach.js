const {changeElementSplit, changeElementSubstr} = require('./changeElement');

/***
 * @param {array} array - an array of strings
 * @param {Object} [options]
 * @param {boolean} [options.qametsQatan=false] - checks for Qamets Qatan
 */

module.exports = (array, options = {'qametsQatan': false}) => {
    let qametsQatan = options.qametsQatan;
    array.forEach( (element, index) => {

        // Tests for shin non-ligatures
        if (element.includes('8')) {
            // 8 is the shin-dot = \u05C1
            element = changeElementSplit(element, '8', '');
        }

        // Tests for sin non-ligatures
        if (element.includes('7')) {
            // 7 is the sin-dot = \u05C2
            element = changeElementSplit(element, 'š7', 'ś');
        }

         // Tests for hiriq-yod mater
         if (/iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/.test(element)) {
            element = changeElementSplit(element, /iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/, 'î');
        }

         // Tests for tsere-yod mater
         if (/ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/.test(element)) {
            element = changeElementSplit(element, /ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/, 'ê');
        }

         // Tests for seghol-yod mater
         if (/ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/.test(element)) {
            element = changeElementSplit(element, /ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/, 'ê');
        }

        // Tests for waw as a holem-mater
        if (/wō(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|9)/.test(element)) {
            element = changeElementSplit(element, /wō(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|9)/, 'ô');
        }

        // Tests for waw as a holem-mater
        if (/ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|9)/.test(element)) {
            element = changeElementSplit(element, /ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|9)/, 'ô');
        }

        // Tests for waw as a shureq-mater
        if (/w9(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/.test(element)) {
            element = changeElementSplit(element, /w9(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/, 'û');
        }

        // Tests for He as a final mater or with mappiq or tests for furtive patach
        if (/āh$/.test(element) ) {
            element = changeElementSplit(element, /āh$/, 'â');  
        } else if (/ēh$/.test(element)) {
            element = changeElementSplit(element, /ēh$/, 'ê');
        } else if (/eh$/.test(element)) {
            element = changeElementSplit(element, /eh$/, 'ê');
        } else if (/h9$/.test(element)) {
            element = changeElementSplit(element, /h9$/, 'h');
        } else if (/h9a$/.test(element)) {
            element = changeElementSplit(element, /h9a$/, 'ah');
        } else if (/ḥa$/.test(element)) {
            element = changeElementSplit(element, /ḥa$/, 'aḥ');
        } else if (/ʿa$/.test(element)) {
            element = changeElementSplit(element, /ʿa$/, 'aʿ');
        }

        // Tests if a shewa exists in the element
        if (element.includes('ǝ')) {
            let pos = element.indexOf('ǝ');
            while (pos !== -1) {
                // shewa at the end of a word
                if (element.charAt(element.length-1) === 'ǝ' ) {
                    element = changeElementSubstr(element, element.length-1, '');
                }
                // if the shewa is preceded by a short vowel
                if (/ǝ|a|e|i|u|o/.test(element.charAt(pos-2)) ) {
                    // if it SQeNeM LeVY letters in wayyiqtol forms
                    if (/s|ṣ|š|ś|q|n|m|l|w|y/.test(element.charAt(pos-1)) && /w/.test(element.charAt(pos-3)) ) {
                        element;
                    } else {
                        element = changeElementSubstr(element, pos, '');
                    } 
                }
                pos = element.indexOf('ǝ', pos +1);
            }
            element = element;
        }

        // tests for Qamets qatan vs gadol
        if (qametsQatan) {
            if (/k9āl-/.test(element) ) {
                element = changeElementSplit(element, 'k9āl-', 'k9ol-');
            } else if (/kāl-/.test(element)) {
                element = changeElementSplit(element, 'kāl-', 'kol-');
            }
             else if (/ḥāq-/.test(element)) {
                element = changeElementSplit(element, 'ḥāq-', 'ḥoq-');
            }
        }

        // tests for a doubling dagesh
        if (element.includes('9')) {
            const elArray = element.split("");
            elArray.forEach( (e, i) => {
               if (e === '9' && /a|ā|e|ē|i|î|u|û|o|ō|ô/.test(elArray[i-2]) && Boolean(elArray[i-2]) ) {
                   elArray[i] = elArray[i-1];
                }
            })
            element = elArray.join("");
        }

        //  tests for yhwh
        if (element === "yǝhwâ") {
            element = "yhwh";
        } else if (element.includes('yǝhwâ')){
            element = changeElementSplit(element, 'yǝhwâ', 'yhwh');
        } else if (element.includes('yhwâ')) {
            element = changeElementSplit(element, 'yhwâ', 'yhwh');
        }

        // removes any remaining digits
        if (/\d/.test(element)) {
            element = changeElementSplit(element, /\d/, '')
        }

        array[index] = element;
    });  // forEach
    return array;
}