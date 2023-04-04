import { Schema } from "../schema";

export const tiberian: Schema = {
  VOCAL_SHEVA: "a",
  HATAF_SEGOL: "ɛ",
  HATAF_PATAH: "a",
  HATAF_QAMATS: "o",
  HIRIQ: "i",
  TSERE: "e",
  SEGOL: "ɛ",
  PATAH: "a",
  QAMATS: "ɔ",
  HOLAM: "o",
  HOLAM_HASER: "o",
  QUBUTS: "u",
  DAGESH: "",
  DAGESH_CHAZAQ: true,
  MAQAF: "-",
  PASEQ: "",
  SOF_PASUQ: "",
  QAMATS_QATAN: "ɔ",
  FURTIVE_PATAH: "a",
  HIRIQ_YOD: "iː",
  TSERE_YOD: "eː",
  SEGOL_YOD: "ɛː",
  SHUREQ: "uː",
  HOLAM_VAV: "oː",
  QAMATS_HE: "ɔː",
  SEGOL_HE: "ɛː",
  TSERE_HE: "eː",
  MS_SUFX: "ɔw",
  ALEF: "ʔ",
  BET: "v",
  BET_DAGESH: "b",
  GIMEL: "ʁ",
  GIMEL_DAGESH: "g",
  DALET: "ð",
  DALET_DAGESH: "d",
  HE: "h",
  VAV: "v",
  ZAYIN: "z",
  HET: "ħ",
  TET: "tˁ",
  YOD: "j",
  FINAL_KAF: "χ",
  KAF: "χ",
  KAF_DAGESH: "kʰ",
  LAMED: "l",
  FINAL_MEM: "m",
  MEM: "m",
  FINAL_NUN: "n",
  NUN: "n",
  SAMEKH: "s",
  AYIN: "ʕ",
  FINAL_PE: "f",
  PE: "f",
  PE_DAGESH: "pʰ",
  FINAL_TSADI: "sˁ",
  TSADI: "sˁ",
  QOF: "q̟",
  RESH: "ʀ̟",
  SHIN: "ʃ",
  SIN: "s",
  TAV: "θ",
  TAV_DAGESH: "tʰ",
  DIVINE_NAME: "ʔaðoːˈnɔːj",
  DIVINE_NAME_ELOHIM: "ʔɛloːˈhiːim",
  STRESS_MARKER: { location: "before-syllable", mark: "ˈ" },
  ADDITIONAL_FEATURES: [
    {
      FEATURE: "cluster",
      HEBREW: "\u{05D9}\u{05BC}",
      TRANSLITERATION(cluster, hebrew, _schema) {
        return cluster.text.replace(hebrew, "ɟɟ");
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: "\u{05D0}(?![\u{05B1}-\u{05BB}\u{05C7}])",
      TRANSLITERATION: ""
    },
    {
      FEATURE: "syllable",
      HEBREW: "ח\u{05B7}$",
      TRANSLITERATION: (syllable, _hebrew, schema) => {
        // furtive patach before het preceded by vav or yod
        const prevText = syllable.prev?.value?.text || "";

        if (syllable.isFinal && prevText && /[יו]/.test(prevText)) {
          const glide = /ו/.test(prevText) ? "w" : "j";
          return glide + schema["PATAH"] + schema["HET"];
        }

        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: "ע\u{05B7}$",
      TRANSLITERATION: (syllable, _hebrew, schema) => {
        // furtive patach before ayin preceded by vav or yod
        const prevText = syllable.prev?.value?.text;

        if (syllable.isFinal && prevText && /[יו]/.test(prevText)) {
          const glide = /ו/.test(prevText) ? "w" : "j";
          return glide + schema["PATAH"] + schema["AYIN"];
        }

        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: "ה\u{05BC}\u{05B7}$",
      TRANSLITERATION: (syllable, _hebrew, schema) => {
        // furtive patach before he preceded by vav or yod
        const prevText = syllable.prev?.value?.text;

        if (syllable.isFinal && prevText && /[יו]/.test(prevText)) {
          const glide = /ו/.test(prevText) ? "w" : "j";
          return glide + schema["PATAH"] + schema["HE"];
        }

        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /^[^\u{05B0}]+$/,
      TRANSLITERATION(syllable, _hebrew, _schema) {
        // this features matches any syllable that does not have a sheva
        const vowelName = syllable.vowelName;
        const vowel = syllable.vowel;

        if (!vowel || !vowelName) {
          return null;
        }

        if (vowelName === "SHEVA") {
          throw new Error(`Syllable ${syllable.text} has a sheva as vowel, should not have matched`);
        }

        const hasMaters = syllable.clusters.map((c) => c.isMater).includes(true);
        const isClosed = syllable.isClosed;
        const isAccented = syllable.isAccented;
        const lengthMarker = "ː";

        // TPT §1.2.4, p288
        // When long vowels with the main stress occur in closed syllables,
        // there is evidence that an epenthetic with the same quality as that of the long vowel
        // occurred before the final consonant in its phonetic realization"
        if (isAccented && isClosed) {
          return syllable.text.replace(vowel, `${vowel + lengthMarker + vowel}`);
        }

        // TPT §1.2.2.1 p268
        // Vowels represented by basic vowel signs are long when they are either
        // (i) in a stressed syllable or (ii) in an unstressed open syllable.
        if (isAccented || (!isAccented && !isClosed)) {
          return syllable.text.replace(vowel, `${vowel + lengthMarker}`);
        }

        if (!hasMaters && !isClosed && !isAccented) {
          return syllable.text.replace(vowel, `${vowel}`);
        }

        return null;
      }
    }
  ],
  allowNoNiqqud: false,
  article: true,
  holemHaser: "remove",
  longVowels: false,
  qametsQatan: false,
  sqnmlvy: true,
  strict: true,
  wawShureq: false
};
