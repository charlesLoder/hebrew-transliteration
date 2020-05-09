type Dict = { [key: string]: string };

export const transliterateMap: Dict = {
  // # consonants
  // ## BMP
  א: "ʾ",
  ב: "b",
  ג: "g",
  ד: "d",
  ה: "h",
  ו: "w",
  ז: "z",
  ח: "ḥ",
  ט: "ṭ",
  י: "y",
  כ: "k",
  ך: "k",
  ל: "l",
  מ: "m",
  ם: "m",
  נ: "n",
  ן: "n",
  ס: "s",
  ע: "ʿ",
  פ: "p",
  ף: "p",
  צ: "ṣ",
  ץ: "ṣ",
  ק: "q",
  ר: "r",
  ש: "š",
  ת: "t",
  // ## Alphabetic Presentation Block
  ﬠ: "ʿ",
  ﬡ: "ʾ",
  ﬢ: "d",
  ﬣ: "h",
  ﬤ: "k",
  ﬥ: "l",
  ﬦ: "m",
  ﬧ: "r",
  ﬨ: "t",
  אַ: "ʾa",
  אָ: "ʾā",
  אּ: "ʾ\u{05BC}",
  בּ: "b\u{05BC}",
  בֿ: "b",
  גּ: "g\u{05BC}",
  דּ: "d\u{05BC}",
  הּ: "h\u{05BC}",
  וּ: "w\u{05BC}",
  וֹ: "wō",
  זּ: "z\u{05BC}",
  טּ: "ṭ\u{05BC}",
  יּ: "y\u{05BC}",
  כּ: "k\u{05BC}",
  כֿ: "k",
  ךּ: "k\u{05BC}",
  לּ: "l\u{05BC}",
  מּ: "m\u{05BC}",
  נּ: "n\u{05BC}",
  סּ: "s\u{05BC}",
  פּ: "p\u{05BC}",
  פֿ: "p",
  ףּ: "p\u{05BC}",
  צּ: "ṣ\u{05BC}",
  קּ: "q\u{05BC}",
  רּ: "r\u{05BC}",
  // '\u05C1':'8',
  // '\u05C2':'7',
  שּ: "š\u{05BC}", // shin + dagesh, no shin-dot
  שׁ: "š", // shin + shin-dot
  שּׁ: "š\u{05BC}", // shin + shin-dot + dagesh
  שׂ: "ś", // shin + sin dot
  שּׂ: "ś\u{05BC}", // shin + sin dot + dagesh
  תּ: "t\u{05BC}",
  // # vowels
  "\u05B0": "ǝ", //shewa
  "\u05B1": "ĕ", //hataf segol
  "\u05B2": "ă", //hataf patach
  "\u05B3": "ŏ", //hataf qamats
  "\u05B4": "i", //hiriq
  "\u05B5": "ē", //tsere
  "\u05B6": "e", //segol
  "\u05B7": "a", //patach
  "\u05B8": "ā", //qamats
  "\u05B9": "ō", //holam
  "\u05BA": "ō", //this is the codepoint for a holam on a const waw, but it is rarely used
  "\u05BB": "u", //qibbuts
  // '\u05BC': '9', // dagesh
  //   "\u05BD": "", // metheg
  "\u05BE": "-", // maqqef
  "\u05BF": "", // rafe
  "\u05C7": "o", //qamets hatuf/qatan. Not used often, most use a qamats instead
  // # extra marks and cantillations
  "\u0591": "", //athna
  "\u0592": "",
  "\u0593": "",
  "\u0594": "",
  "\u0595": "",
  "\u0596": "",
  "\u0597": "",
  "\u0598": "",
  "\u0599": "",
  "\u059A": "",
  "\u059B": "",
  "\u059C": "",
  "\u059D": "",
  "\u059E": "",
  "\u059F": "",
  "\u05A0": "",
  "\u05A1": "",
  "\u05A2": "",
  "\u05A3": "",
  "\u05A4": "",
  "\u05A5": "",
  "\u05A6": "",
  "\u05A7": "",
  "\u05A8": "",
  "\u05A9": "",
  "\u05AA": "",
  "\u05AB": "",
  "\u05AC": "",
  "\u05AD": "",
  "\u05AE": "",
  "\u05AF": "",
  "\u05C0": "",
  "\u05C1": "",
  "\u05C3": "",
  "\u05C4": "",
  "\u05C5": ""
};

export const removeVowels: Dict = {
  // alphabetic presentation block
  שּׁ: "\uFB2A",
  שּׂ: "\uFB2B",
  אּ: "א",
  בּ: "ב",
  גּ: "ג",
  דּ: "ד",
  הּ: "ה",
  וּ: "ו",
  זּ: "ז",
  טּ: "ט",
  יּ: "י",
  ךּ: "ך",
  כּ: "כ",
  לּ: "ל",
  מּ: "מ",
  הּ0: "נ",
  הּ1: "ס",
  הּ3: "ף",
  הּ4: "פ",
  הּ6: "צ",
  הּ7: "ק",
  הּ8: "ר",
  הּ9: "ש",
  הּA: "ת",
  הּB: "ו",
  הּC: "ב",
  הּD: "כ",
  הּE: "פ",
  // vowels
  "\u05B0": "", // shewa
  "\u05B1": "", // hataf segol
  "\u05B2": "", // hataf patach
  "\u05B3": "", // hataf qamats
  "\u05B4": "", // hiriq
  "\u05B5": "", // tsere
  "\u05B6": "", // segol
  "\u05B7": "", // patach
  "\u05B8": "", // qamats
  "\u05B9": "", // holam
  "\u05BA": "", // this is the codepoint for a holam on a const waw, but it is rarely used
  "\u05BB": "", // qibbuts
  "\u05BC": "",
  "\u05BD": "",
  // '\u05BE':'\u05BE', // maqqef
  "\u05BF": "\u05BF", // rafe
  "\u05C7": "", // qamets hatuf/qatan. Not used often, most use a qamats instead
  // extra marks and cantillations
  "\u0591": "", // athna
  "\u0592": "",
  "\u0593": "",
  "\u0594": "",
  "\u0595": "",
  "\u0596": "",
  "\u0597": "",
  "\u0598": "",
  "\u0599": "",
  "\u059A": "",
  "\u059B": "",
  "\u059C": "",
  "\u059D": "",
  "\u059E": "",
  "\u059F": "",
  "\u05A0": "",
  "\u05A1": "",
  "\u05A2": "",
  "\u05A3": "",
  "\u05A4": "",
  "\u05A5": "",
  "\u05A6": "",
  "\u05A7": "",
  "\u05A8": "",
  "\u05A9": "",
  "\u05AA": "",
  "\u05AB": "",
  "\u05AC": "",
  "\u05AD": "",
  "\u05AE": "",
  "\u05AF": "",
  "\u05C0": "",
  "\u05C1": "", // shin dot
  "\u05C2": "", // sin dot
  "\u05C3": "",
  "\u05C4": "",
  "\u05C5": "",
  "\u05F3": "", //geresh
  "\u05F4": "" //gereshayim
};

export const removeCantillation: Dict = {
  // extra marks and cantillations
  "\u0591": "", // athna
  "\u0592": "",
  "\u0593": "",
  "\u0594": "",
  "\u0595": "",
  "\u0596": "",
  "\u0597": "",
  "\u0598": "",
  "\u0599": "",
  "\u059A": "",
  "\u059B": "",
  "\u059C": "",
  "\u059D": "",
  "\u059E": "",
  "\u059F": "",
  "\u05A0": "",
  "\u05A1": "",
  "\u05A2": "",
  "\u05A3": "",
  "\u05A4": "",
  "\u05A5": "",
  "\u05A6": "",
  "\u05A7": "",
  "\u05A8": "",
  "\u05A9": "",
  "\u05AA": "",
  "\u05AB": "",
  "\u05AC": "",
  "\u05AD": "",
  "\u05AE": "",
  "\u05AF": "",
  "\u05C0": "",
  "\u05C3": "",
  "\u05C4": "",
  "\u05C5": "",
  "\u05F3": "", //geresh
  "\u05F4": "" //gereshayim
};
