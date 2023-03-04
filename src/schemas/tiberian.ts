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
  HIRIQ_YOD: "i:",
  TSERE_YOD: "e:",
  SEGOL_YOD: "ɛ:",
  SHUREQ: "u:",
  HOLAM_VAV: "o:",
  QAMATS_HE: "ɔ:",
  SEGOL_HE: "ɛ:",
  TSERE_HE: "e:",
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
  DIVINE_NAME: "ʔaðo:ˈnɔ:j",
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
        // furtive patach before het preceded by vav
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
        // furtive patach before ayin preceded by vav
        const prevText = syllable.prev?.value?.text;

        if (syllable.isFinal && prevText && /[יו]/.test(prevText)) {
          const glide = /ו/.test(prevText) ? "w" : "j";
          return glide + schema["PATAH"] + schema["AYIN"];
        }

        return syllable.text;
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
