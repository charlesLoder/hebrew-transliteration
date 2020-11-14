import { Dict } from "./interfaces";

const qQsnippets: string[] = [
  "ʾāzǝn",
  "ʾākǝl",
  "ʾākǝl",
  "ʾāniyּ",
  "ʾāpǝn",
  "ʾārǝḥ",
  "ʾārǝkּ",
  "ʾāšǝr",
  "bāʾǝš",
  "bāšǝtּ",
  "bּāšǝtּ",
  "gābǝh",
  "gּābǝh",
  "gādǝl",
  "gּādǝl",
  "gārǝn",
  "gּārǝn",
  "ḥādǝš",
  "ḥākǝm",
  "ḥālǝyֽwō",
  "ḥālǝyōw",
  "ḥānּēniy",
  "ḥāpǝn",
  "ḥāpǝniy",
  "ḥāpǝšiy",
  "ḥāpǝšiyt",
  "ḥāq-",
  "ḥārǝb",
  "ḥārǝneper",
  "ḥārǝpּ",
  "ḥāšǝkּ",
  "yāpǝy",
  "yāšǝr",
  "kāl-",
  "kּāl-",
  "mār-",
  "mārǝdּǝkay",
  "mātǝn",
  "sālǝtּ",
  "ʿāzּ",
  "ʿāmǝriy",
  "ʿānǝy",
  "ʿāpǝr",
  "ʿārǝl",
  "ʿārǝpּ",
  "ʿāšǝr",
  "ṣārǝkּ",
  "qādǝq",
  "qādǝš",
  "qārǝbּ",
  "qārǝḥ",
  "rāb-",
  "rāgǝz",
  "rāḥǝbּ",
  "šārǝš",
  "šārāš",
  "šּārāš", // with dagesh
  "tּākǝniyt",
  "tām-",
  "tּām-"
];

const qQRgx = qQsnippets.map((snippet) => new RegExp(snippet, "m"));

const qametsQatanDict: Dict = {
  // for certain inflected and contextual occurences
  bּǝʾābǝdan: "bǝʾobdan",
  hāʾābǝnāyim: "hāʾobnāyim", // Exod 1:16, Jer 18:3
  ḥāqǝkā: "ḥoqkā", // Lev 10:13, 14
  ḥāqǝkem: "ḥoqkem", // Exod 5:14
  hadּārǝbāֽn: "haddorbān", // 1 Sam 13:21
  lǝʾākǝlāֽh: "lǝʾoklāh", // with siluq
  haqּārǝbāֽn: "haqqorbān", // Ezk 40:43
  ḥāpǝraʿ: "ḥopraʿ",
  wayּāmāt: "wayּāmot",
  wayּānās: "wayּānos",
  wayּāqām: "wayּāqom",
  wayּārām: "wayּārām",
  wayּāšׁāb: "wayּāšׁob",
  watּāmāt: "watּāmot",
  watּāqām: "watּāqom",
  watּāšׁāb: "watּāšׁob",
  wǝhāֽʿāpǝniy: "wǝhāʿopniy",
  tּākǝniֽyt: "tokniyt" // with silluq
};

export const qametsQ = (text: string[]) => {
  return text.map((word) => {
    //   if there is no qamets char, return
    if (!/ā/.test(word)) {
      return word;
    }

    if (qametsQatanDict[word]) {
      return qametsQatanDict[word];
    }

    if (/ŏ/.test(word)) {
      const pos = word.indexOf("ŏ");
      if (word.charAt(pos - 2) === "ā") {
        return word.substring(pos - 2) + "o" + word.substring(pos - 1);
      }
    }

    for (const rgx of qQRgx) {
      if (rgx.test(word)) {
        let newRgx = rgx.source.split("ā").join("o");
        const matches = rgx.source.match(/ā/g);

        // checks for qQ forms w/ two ā's
        if (matches && matches.length >= 2) {
          const parts = rgx.source.split("ā");
          const firstMatch = [parts.shift(), parts.join("ā")];
          newRgx = firstMatch.join("o");
        }

        return word.split(rgx).join(newRgx);
      }
    }

    return word;
  });
};
