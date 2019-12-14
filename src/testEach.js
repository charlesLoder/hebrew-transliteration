const {changeElementSplit, changeElementSubstr} = require('./changeElement');

/***
 * @param {array} array - an array of strings
 * @param {Object} [options]
 * @param {boolean} [options.qametsQatan=false] - checks for Qamets Qatan
 */

module.exports = (array, options = {qametsQatan: false}) => {
    let qametsQatan = options.qametsQatan;
    return array.map( element => {

        // Tests for shin non-ligatures
        if (element.includes('\u05C1')) {
            element = changeElementSplit(element, '\u05C1', '');
        }

        // Tests for sin non-ligatures
        if (element.includes('\u05C2')) {
            element = changeElementSplit(element, 'š\u05C2', 'ś');
        }

         // Tests for hiriq-yod mater
         if (/iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/.test(element)) {
            element = changeElementSplit(element, /iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, 'î');
        }

         // Tests for tsere-yod mater
         if (/ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/.test(element)) {
            element = changeElementSplit(element, /ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, 'ê');
        }

         // Tests for seghol-yod mater
         if (/ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/.test(element)) {
            element = changeElementSplit(element, /ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, 'ê');
        }

        // Tests for waw as a holem-mater
        if (/wō/.test(element)) {
            // this is a workaround for lack of lookbehind support
            let rev = [...element].reverse().reduce((a, c) => a + c);
            if (/ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u)/.test(rev)) {
                element = changeElementSplit(element, /wō/, 'ô');   
            }
        }

        // Tests for waw as a holem-mater
        // this will catch a waw as a consonant like - C+ō+w+V+C > CōwVC
        if (/ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|\u05BC)/.test(element)) {
            element = changeElementSplit(element, /ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|\u05BC)/, 'ô');
        }

        // Tests for waw as a shureq-mater
        if (/w\u05BC(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/.test(element)) {
            element = changeElementSplit(element, /w\u05BC(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/, 'û');
        }

        // Tests for He as a final mater or with mappiq or tests for furtive patach
        if (/āh$/m.test(element) ) {
            element = changeElementSplit(element, /āh$/m, 'â');  
        } else if (/ēh$/m.test(element)) {
            element = changeElementSplit(element, /ēh$/m, 'ê');
        } else if (/eh$/m.test(element)) {
            element = changeElementSplit(element, /eh$/m, 'ê');
        } else if (/h\u05BC$/m.test(element)) {
            element = changeElementSplit(element, /h\u05BC$/m, 'h');
        } else if (/h\u05BCa$/m.test(element)) {
            element = changeElementSplit(element, /h\u05BCa$/m, 'ah');
        } else if (/ḥa$/m.test(element)) {
            element = changeElementSplit(element, /ḥa$/m, 'aḥ');
        } else if (/ʿa$/m.test(element)) {
            element = changeElementSplit(element, /ʿa$/m, 'aʿ');
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
            if (/k\u05BCāl-/.test(element) ) {
                element = changeElementSplit(element, 'k\u05BCāl-', 'k\u05BCol-');
            } else if (/kāl-/.test(element)) {
                element = changeElementSplit(element, 'kāl-', 'kol-');
            }
             else if (/ḥāq-/.test(element)) {
                element = changeElementSplit(element, 'ḥāq-', 'ḥoq-');
            }
        }

        // tests for a doubling dagesh
        if (element.includes('\u05BC')) {
            const elArray = element.split("");
            elArray.forEach( (e, i) => {
               if (e === '\u05BC' && /a|ā|e|ē|i|î|u|û|o|ō|ô/.test(elArray[i-2]) && Boolean(elArray[i-2]) ) {
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

        // removes any remaining dageshes
        if (/\u05BC/.test(element)) {
            element = changeElementSplit(element, /\u05BC/, '')
        }

        return element;
    });  // map
}
