import { TransOptions, Dict } from "./interfaces";

const changeElementSplit = (input: string, split: RegExp, join: string) => input.split(split).join(join);

const changeElementSubstr = (input: string, index: number, join: string) =>
  input.substring(0, index) + join + input.substring(index + 1);

const qametsQatanDict: Dict = {
  // for certain inflected and contextual occurences
  ḥāqǝkā: "ḥoqkā", // Lev 10:13, 14
  ḥāqǝkem: "ḥoqkem", // Exod 5:14
  wayּāqām: "wayyāqom",
  wayּāqāֽm: "wayyāqom", // with siluq
  watּāqām: "wattāqom",
  watּāqāֽm: "wattāqom", // with siluq
  tּākǝniyt: "toknît", // Ezk 28:12
  hadּārǝbāֽn: "haddorbān", // 1 Sam 13:21
  lǝʾākǝlāֽh: "lǝʾoklāh", // with siluq
  haqּārǝbāֽn: "haqqorbān", // Ezk 40:43
  ḥāpǝniy: "ḥopnî",
  ʿārǝpּāh: "ʿorpāh",
  ḥāpǝraʿ: "ḥopraʿ"
};

const academicRules = (array: string[], { qametsQatan = false, isSimple = false }: TransOptions = {}) => {
  return array.map((element: string) => {
    // Tests for shin non-ligatures
    if (/\u{05C1}/u.test(element)) {
      element = changeElementSplit(element, /\u{05C1}/u, "");
    }

    // Tests for sin non-ligatures
    if (/š\u{05C2}/u.test(element)) {
      element = changeElementSplit(element, /š\u{05C2}/u, "ś");
    }

    // tests for Qamets qatan vs gadol
    if (qametsQatan) {
      // tests kol
      if (/k\u{05BC}āl-/u.test(element)) {
        element = changeElementSplit(element, /k\u{05BC}āl-/u, "k\u{05BC}ol-");
      } else if (/kāl-/.test(element)) {
        element = changeElementSplit(element, /kāl-/, "kol-");
      }

      if (qametsQatanDict[element]) {
        element = qametsQatanDict[element];
      } else if (/ḥāq-/.test(element)) {
        element = changeElementSplit(element, /ḥāq-/, "ḥoq-");
      } else if (/ḥākǝmāh$/m.test(element)) {
        element = changeElementSplit(element, /ḥākǝmāh$/m, "ḥokmāh");
      } else if (/ḥākǝmāt/.test(element)) {
        element = changeElementSplit(element, /ḥākǝmāt/, "ḥokmāt");
      } else if (/ḥākǝmat/.test(element)) {
        element = changeElementSplit(element, /ḥākǝmat/, "ḥokmat");
      } else if (/ʾāzǝn/.test(element)) {
        element = changeElementSplit(element, /ʾāzǝn/, "ʾozn");
      } else if (/tּākǝniֽyt/.test(element)) {
        // only for Ezk 43:10!
        element = changeElementSplit(element, /tּākǝniֽyt/, "toknît");
      } else if (/ḥānּēniy/.test(element)) {
        element = changeElementSplit(element, /ḥānּēniy/, "ḥonnēnî");
      } else if (/ʾākǝl/.test(element)) {
        element = changeElementSplit(element, /ʾākǝl/, "ʾokl");
      } else if (/qārǝb\u{05BC}ān/u.test(element)) {
        element = changeElementSplit(element, /qārǝb\u{05BC}ān/u, "qorbān");
      } else if (/qārǝb\u{05BC}an/u.test(element)) {
        element = changeElementSplit(element, /qārǝb\u{05BC}an/u, "qorban");
      } else if (/qārǝb\u{05BC}ǝn/u.test(element)) {
        element = changeElementSplit(element, /qārǝb\u{05BC}ǝn/u, "qorbǝn");
      } else if (/dārǝbān/.test(element)) {
        // in case this word out of context is used
        element = changeElementSplit(element, /dārǝbān/, "dorbān");
      } else if (/qādǝqōd/.test(element)) {
        element = changeElementSplit(element, /qādǝqōd/, "qodqōd");
      } else if (/qādǝqŏd/.test(element)) {
        element = changeElementSplit(element, /qādǝqŏd/, "qodqŏd");
      } else if (/qādǝš/.test(element)) {
        element = changeElementSplit(element, /qādǝš/, "qodš");
      } else if (/šārǝš/.test(element)) {
        element = changeElementSplit(element, /šārǝš/, "šorš");
      } else if (/šārāš/.test(element)) {
        element = changeElementSplit(element, /šārāš/, "šorāš");
      } else if (/š\u{05BC}ārāš/u.test(element)) {
        element = changeElementSplit(element, /š\u{05BC}ārāš/u, "ššorāš");
      } else if (/ʾābǝdan/.test(element)) {
        element = changeElementSplit(element, /ʾābǝdan/, "ʾobdan");
      } else if (/ʾābǝn/.test(element)) {
        element = changeElementSplit(element, /ʾābǝn/, "ʾobn");
      } else if (/ʾāpǝn/.test(element)) {
        element = changeElementSplit(element, /ʾāpǝn/, "ʾopn");
      } else if (/ʿāpǝniy/.test(element)) {
        element = changeElementSplit(element, /ʿāpǝniy/, "ʿopnî");
      } else if (/ʿāpǝrāh/.test(element)) {
        element = changeElementSplit(element, /ʿāpǝrāh/, "ʿoprāh");
      } else if (/ʿāpǝrāt/.test(element)) {
        element = changeElementSplit(element, /ʿāpǝrāt/, "ʿoprāt");
      } else if (/ḥāpǝšiy/.test(element)) {
        element = changeElementSplit(element, /ḥāpǝšiy/, "ḥopšî");
      } else if (/ḥāpǝn/.test(element)) {
        element = changeElementSplit(element, /ḥāpǝn/, "ḥopn");
      } else if (/ḥāpǝšiyt/.test(element)) {
        element = changeElementSplit(element, /ḥāpǝšiyt/, "ḥopšît");
      } else if (/ŏ/.test(element)) {
        // tests for certain rules
        let pos = element.indexOf("ŏ");
        if (element.charAt(pos - 2) === "ā") {
          element = changeElementSubstr(element, pos - 2, "o");
        }
      }
    }

    // remove metheg that is left in for checking qamets qatan vs gadol
    if (/\u{05BD}/u.test(element)) {
      element = changeElementSplit(element, /\u{05BD}/u, "");
    }

    // Tests for hiriq-yod mater
    if (/iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u{05BC})/u.test(element)) {
      element = changeElementSplit(element, /iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, "î");
    }

    // Tests for tsere-yod mater
    if (/ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u{05BC})/u.test(element)) {
      element = changeElementSplit(element, /ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, "ê");
    }

    // Tests for seghol-yod mater
    if (/ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u{05BC})/u.test(element)) {
      element = changeElementSplit(element, /ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, "ê");
    }

    // Tests for waw as a holem-mater
    if (/wō/.test(element)) {
      // this is a workaround for lack of lookbehind support
      let rev = [...element].reverse().reduce((a, c) => a + c);
      if (/ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u)/.test(rev)) {
        rev = changeElementSplit(rev, /ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u)/, "ô");
      }
      element = [...rev].reverse().reduce((a, c) => a + c);
    }

    // Tests for waw as a holem-mater
    // this will catch a waw as a consonant like - C+ō+w+V+C > CōwVC
    if (/ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|\u{05BC})/u.test(element)) {
      element = changeElementSplit(element, /ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|\u05BC)/, "ô");
    }

    // Tests for waw as a shureq-mater
    if (/w\u{05BC}(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/u.test(element)) {
      element = changeElementSplit(element, /w\u05BC(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/, "û");
    }

    // Tests for He as a final mater
    /* if using simple version, ēh remains so that it is passed into simpleRules
    if not, then there would be now way to distinguish between ê from tsere-yod vs he-mater */
    if (!isSimple) {
      if (/āh(?=$|-)/m.test(element)) {
        element = changeElementSplit(element, /āh(?=$|-)/m, "â");
      } else if (/ēh(?=$|-)/m.test(element)) {
        element = changeElementSplit(element, /ēh(?=$|-)/m, "ê");
      } else if (/eh(?=$|-)/m.test(element)) {
        element = changeElementSplit(element, /eh(?=$|-)/m, "ê");
      }
    }

    // tests for he with mappiq or furtive patach
    if (/h\u{05BC}$/mu.test(element)) {
      element = changeElementSplit(element, /h\u{05BC}$/mu, "h");
    } else if (/h\u{05BC}a$/mu.test(element)) {
      element = changeElementSplit(element, /h\u{05BC}a$/mu, "ah");
    } else if (/ḥa$/m.test(element)) {
      element = changeElementSplit(element, /ḥa$/m, "aḥ");
    } else if (/ʿa$/m.test(element)) {
      element = changeElementSplit(element, /ʿa$/m, "aʿ");
    }

    // Tests if a shewa exists in the element
    if (/ǝ/.test(element)) {
      let pos = element.indexOf("ǝ");
      while (pos !== -1) {
        // shewa at the end of a word
        if (element.charAt(element.length - 1) === "ǝ") {
          element = changeElementSubstr(element, element.length - 1, "");
        }
        // if the shewa is preceded by a short vowel
        if (/ǝ|a|e|i|u|o/.test(element.charAt(pos - 2))) {
          // if it SQeNeM LeVY letters in wayyiqtol forms
          if (/s|ṣ|š|ś|q|n|m|l|w|y/.test(element.charAt(pos - 1)) && /w/.test(element.charAt(pos - 3))) {
            element;
          } else {
            element = changeElementSubstr(element, pos, "");
          }
        }
        pos = element.indexOf("ǝ", pos + 1);
      }
      element = element;
    }

    // tests for a doubling dagesh
    if (/\u{05BC}/u.test(element)) {
      const elArray = element.split("");
      elArray.forEach((e, i) => {
        if (e === "\u05BC" && /a|ā|e|ē|i|î|u|û|o|ō|ô/.test(elArray[i - 2]) && Boolean(elArray[i - 2])) {
          elArray[i] = elArray[i - 1];
        }
      });
      element = elArray.join("");
    }

    //  tests for yhwh
    if (element === "yǝhwâ") {
      element = "yhwh";
    } else if (element.includes("yǝhwâ")) {
      element = changeElementSplit(element, /yǝhwâ/, "yhwh");
    } else if (element.includes("yhwâ")) {
      element = changeElementSplit(element, /yhwâ/, "yhwh");
    }

    // removes any remaining dageshes
    if (/\u{05BC}/u.test(element)) {
      element = changeElementSplit(element, /\u{05BC}/u, "");
    }

    return element;
  }); // map
};

const simpleRules = (array: string[]) => {
  return array.map((element: string) => {
    // remove aleph half-ring
    if (/ʾ/.test(element)) {
      element = changeElementSplit(element, /ʾ/, "");
    }

    // remove ayin half-ring
    if (/ʿ/.test(element)) {
      element = changeElementSplit(element, /ʿ/, "");
    }

    // simplify he-mater
    if (/āh$/m.test(element)) {
      element = changeElementSplit(element, /āh$/m, "ah");
    } else if (/ēh$/.test(element)) {
      element = changeElementSplit(element, /ēh$/m, "eh");
    }

    // simplify hiriq-yod
    if (/î/.test(element)) {
      element = changeElementSplit(element, /î/, "i");
    }

    // simplify tsere-yod / seghol-yod
    if (/ê/.test(element)) {
      element = changeElementSplit(element, /ê/, "e");
    }

    // simplify holem-waw
    if (/ô/.test(element)) {
      element = changeElementSplit(element, /ô/, "o");
    }

    // simplify shureq
    if (/û/.test(element)) {
      element = changeElementSplit(element, /û/, "u");
    }

    // remove doubling of shin
    if (/šš/.test(element)) {
      element = changeElementSplit(element, /šš/, "š");
    }

    // remove doubling of tsade
    if (/ṣṣ/.test(element)) {
      element = changeElementSplit(element, /ṣṣ/, "ṣ");
    }

    // simplify long-a
    if (/ā/.test(element)) {
      element = changeElementSplit(element, /ā/, "a");
    }

    // simplify short-a
    if (/ă/.test(element)) {
      element = changeElementSplit(element, /ă/, "a");
    }

    // simplify long-e
    if (/ē/.test(element)) {
      element = changeElementSplit(element, /ē/, "e");
    }

    // simplify short-e
    if (/ĕ/.test(element)) {
      element = changeElementSplit(element, /ĕ/, "e");
    }

    // simplify long-i
    if (/ī/.test(element)) {
      element = changeElementSplit(element, /ī/, "i");
    }

    // simplify long-o
    if (/ō/.test(element)) {
      element = changeElementSplit(element, /ō/, "o");
    }

    // simplify short-o
    if (/ŏ/.test(element)) {
      element = changeElementSplit(element, /ŏ/, "o");
    }

    // simplify long-u
    if (/ū/.test(element)) {
      element = changeElementSplit(element, /ū/, "u");
    }

    // simplify shewa
    if (/ǝ/.test(element)) {
      element = changeElementSplit(element, /ǝ/, "e");
    }

    // spirantized cons

    /* Since the negative lookbehind regex is not well supported, 
    the string is reversed and then the regex searches the pattern of
    the consonant that is followed by a vowel (which preceded it in the original direction) 
    */

    let rev = [...element].reverse().reduce((a, c) => a + c, "");
    // change b > v
    if (/b/.test(element) && !/bb/.test(element)) {
      if (/b(?=[aeiou])/.test(rev)) {
        rev = changeElementSplit(rev, /b(?=[aeiou])/, "v");
      }
    }

    // change p > f
    if (/p/.test(element) && !/pp/.test(element)) {
      if (/p(?=[aeiou])/.test(rev)) {
        rev = changeElementSplit(rev, /p(?=[aeiou])/, "f");
      }
    }

    // change k > kh
    if (/k/.test(element) && !/kk/.test(element)) {
      if (/k(?=[aeiou])/.test(rev)) {
        //   when the string is reversed back 'hk' > 'kh'
        rev = changeElementSplit(rev, /k(?=[aeiou])/, "hk");
      }
    }

    element = [...rev].reverse().reduce((a, c) => a + c, "");

    // simplify ṭet
    if (/ṭ/.test(element)) {
      element = changeElementSplit(element, /ṭ/, "t");
    }

    // simplify tsade
    if (/ṣ/.test(element)) {
      element = changeElementSplit(element, /ṣ/, "ts");
    }

    // simplify shin
    if (/š/.test(element)) {
      element = changeElementSplit(element, /š/, "sh");
    }

    // simplify sin
    if (/ś/.test(element)) {
      element = changeElementSplit(element, /ś/, "s");
    }

    // simplify ḥet
    if (/ḥ/.test(element)) {
      element = changeElementSplit(element, /ḥ/, "kh");
    }

    // simplify waw
    if (/w/.test(element)) {
      element = changeElementSplit(element, /w/, "v");
    }

    return element;
  }); // map
};

export const testEach = (array: string[], { qametsQatan = false, isSimple = false }: TransOptions = {}) => {
  const academic = academicRules(array, { qametsQatan: qametsQatan, isSimple: isSimple });
  return !isSimple ? academic : simpleRules(academic);
};
