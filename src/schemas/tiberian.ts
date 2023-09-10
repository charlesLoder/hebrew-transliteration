import { Schema } from "../schema";

export const tiberian: Schema = {
  VOCAL_SHEVA: "a",
  HATAF_SEGOL: "ɛ",
  HATAF_PATAH: "a",
  HATAF_QAMATS: "ɔ",
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
      TRANSLITERATION(cluster, hebrew) {
        return cluster.text.replace(hebrew, "ɟɟ");
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: /תּ[\u{05B4}-\u{05BB}]/u,
      TRANSLITERATION(cluster) {
        if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
          return cluster.text;
        }
        return cluster.text.replace("תּ", "ttʰ");
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: /פּּ[\u{05B4}-\u{05BB}]/u,
      TRANSLITERATION(cluster) {
        if (!cluster.prev) {
          return cluster.text;
        }
        return cluster.text.replace("פּ", "ppʰ");
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /ר/u,
      TRANSLITERATION(syllable) {
        // see TPT 229 for a summary if the pharyngealized resh
        const alveolars = /[דזצתטסלנ]|שׂ/;

        // find cluster containing resh
        const cluster = syllable.clusters.filter((c) => c.text.includes("ר"))[0];
        const prevCluster = cluster.prev?.value;
        const currentSyllable = cluster?.syllable;
        const [onset, _, coda] = currentSyllable ? currentSyllable.structure(true) : ["", "", ""];

        if (prevCluster && alveolars.test(prevCluster.text)) {
          if (onset.includes("ר") && !prevCluster.hasVowel) {
            return syllable.text.replace("ר", "rˁ");
          }

          if (coda.includes("ר") && prevCluster.hasVowel) {
            return syllable.text.replace("ר", "rˁ");
          }
        }

        const nextCluster = cluster.next?.value;
        const lamedAndNun = /[לנן]/;
        if (nextCluster && lamedAndNun.test(nextCluster.text)) {
          if (onset.includes("ר") && !cluster.hasVowel) {
            return syllable.text.replace("ר", "rˁ");
          }

          if (coda.includes("ר") && cluster.hasSheva) {
            return syllable.text.replace("ר", "rˁ");
          }
        }

        // default
        return syllable.text;
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
      PASS_THROUGH: true,
      TRANSLITERATION: (syllable, _hebrew, schema) => {
        // furtive patach before het preceded by vav or yod
        const prevText = syllable.prev?.value?.text || "";
        // see Khan 497-98 for examples involving length and the meteg
        // make sure to adjust other rules
        if (syllable.isFinal && prevText) {
          if (/[יו]/.test(prevText)) {
            const glide = /ו/.test(prevText) ? "w" : "j";
            return glide + schema["PATAH"] + schema["HET"];
          }
          return schema["PATAH"] + schema["HET"];
        }

        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: "ע\u{05B7}$",
      PASS_THROUGH: true,
      TRANSLITERATION: (syllable, _hebrew, schema) => {
        // furtive patach before ayin preceded by vav or yod
        const prevText = syllable.prev?.value?.text;

        if (syllable.isFinal && prevText) {
          if (/[יו]/.test(prevText)) {
            const glide = /ו/.test(prevText) ? "w" : "j";
            return glide + schema["PATAH"] + schema["AYIN"];
          }
          return schema["PATAH"] + schema["AYIN"];
        }

        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: "ה\u{05BC}\u{05B7}$",
      PASS_THROUGH: true,
      TRANSLITERATION: (syllable, _hebrew, schema) => {
        // furtive patach before he preceded by vav or yod
        const prevText = syllable.prev?.value?.text;

        if (syllable.isFinal && prevText) {
          if (/[יו]/.test(prevText)) {
            const glide = /ו/.test(prevText) ? "w" : "j";
            return glide + schema["PATAH"] + schema["HE"];
          }
          return schema["PATAH"] + schema["HE"];
        }

        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /^וּ/u,
      TRANSLITERATION(syllable) {
        // finds a vav with a dagesh at the start of a work (i.e. a shureq)
        // if the syllable is the first syllable, replace with wuː
        // syllable.clusters[0].isShureq is not totally necessary, but it's a good check
        if (!syllable.prev && syllable.clusters[0].isShureq) {
          return syllable.text.replace("וּ", "wu");
        }
        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /[\u{05B4}-\u{05BB}]/u,
      TRANSLITERATION(syllable, _, schema) {
        // this features matches any syllable that has a full vowel character (i.e. not sheva)
        const vowelName = syllable.vowelName;
        const vowel = syllable.vowel;

        if (!vowel || !vowelName) {
          return syllable.text;
        }

        if (vowelName === "SHEVA") {
          throw new Error(`Syllable ${syllable.text} has a sheva as vowel, should not have matched`);
        }

        // half vowels do not have length; exit early
        const hasHalfVowel = syllable.clusters.map((c) => c.hasHalfVowel).includes(true);
        if (hasHalfVowel) {
          throw new Error(`Syllable ${syllable.text} has a hataf as vowel, should not have matched`);
        }

        const [onset, _nuclues, coda] = syllable.structure(true);
        /**
         * Determines the realization of a patach
         *
         * @param vowelChar the hebrew vowel character
         * @returns the backrounded patch realization of the vowel or the original vowel if not patach
         */
        function determinePatachRealization(vowelChar: string) {
          // see comment for explanation: https://github.com/charlesLoder/hebrew-transliteration/issues/45#issuecomment-1712186201
          // exit early if not patach
          if (vowelName !== "PATAH" && vowelName !== "HATAF_PATAH") {
            return vowelChar;
          }

          // by this point, the resh has already been pharyngealized in the transliteration
          const pharyngealized = /rˁ|ט|צ|ץ/;
          if (pharyngealized.test(onset) || pharyngealized.test(coda)) {
            return "ɑ";
          }

          const nextSyllable = syllable.next?.value;
          if (!nextSyllable) return vowelChar;

          const nextOnset = nextSyllable.onset;
          if (pharyngealized.test(nextOnset)) {
            return "ɑ";
          }

          return vowelChar;
        }

        const noMaterText = syllable.clusters
          .filter((c) => !c.isMater)
          .map((c) => c.text)
          .join("")
          // a holem followed by a he without a mappiq is not a mater
          // but b/c the he is not pronounced, we need to remove the final he
          .replace(/(\u{05B9}.{1})\u{05D4}(?!\u{05BC})/u, "$1");

        const hasMaters = syllable.clusters.map((c) => c.isMater).includes(true);
        const lengthMarker = "ː";
        const halfLengthMarker = "ˑ";

        // See TPT §1.2.10 concering meteg/gaya
        const hasMeteg = syllable.clusters.map((c) => c.hasMeteg).includes(true);
        if (hasMeteg) {
          const hasLongVowel = syllable.clusters.map((c) => c.hasLongVowel).includes(true);
          // when a meteg is present, the syllable implicitly has secondary stress
          // and the vowel is extended if it is not already long
          const firstConsonant = noMaterText[0];
          return noMaterText
            .replace(firstConsonant, `ˌ${firstConsonant}`)
            .replace(vowel, `${determinePatachRealization(vowel)}${hasLongVowel ? lengthMarker : halfLengthMarker}`);
        }

        const isClosed = syllable.isClosed;
        const isAccented = syllable.isAccented;

        // TPT §1.2.4, p288
        // When long vowels with the main stress occur in closed syllables,
        // there is evidence that an epenthetic with the same quality as that of the long vowel
        // occurred before the final consonant in its phonetic realization"
        if (isAccented && isClosed) {
          const syllableSeparator = schema["SYLLABLE_SEPARATOR"] || "";
          const vowelRealization = determinePatachRealization(vowel);
          return noMaterText.replace(
            vowel,
            `${vowelRealization + lengthMarker + syllableSeparator + vowelRealization}`
          );
        }

        // TPT §1.2.2.1 p268
        // Vowels represented by basic vowel signs are long when they are either
        // (i) in a stressed syllable or (ii) in an unstressed open syllable.
        if (isAccented || (!isAccented && !isClosed)) {
          return noMaterText.replace(vowel, `${determinePatachRealization(vowel) + lengthMarker}`);
        }

        if (!hasMaters && !isClosed && !isAccented) {
          return noMaterText.replace(vowel, `${determinePatachRealization(vowel)}`);
        }

        return syllable.text.replace(vowel, `${determinePatachRealization(vowel)}`);
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /(?<!.*([\u{05B4}-\u{05BB}]|\u{05D5}\u{05BC}).*)\u{05B0}/u,
      TRANSLITERATION(syllable, _hebrew, schema) {
        // matches any syllable that contains a sheva that is not preceded by a full vowel character [\u{05B4}-\u{05BB}]
        // or shureq \u{5D5}\u{5BC}
        const nextSyllable = syllable.next?.value;
        if (!nextSyllable) return syllable.text;

        const nextSylFirstCluster = nextSyllable.clusters[0].text;
        if (!nextSylFirstCluster) return syllable.text;

        const [onset, _, coda] = syllable.structure(true);

        function isBackRounded() {
          // see comment for explanation: https://github.com/charlesLoder/hebrew-transliteration/issues/45#issuecomment-1712186201
          // by this point, the resh has already been pharyngealized in the transliteration
          const pharyngealized = /rˁ|ט|צ|ץ/;
          if (pharyngealized.test(onset) || pharyngealized.test(coda)) {
            return true;
          }

          const nextSyllable = syllable.next?.value;
          if (!nextSyllable) {
            return false;
          }

          const nextOnset = nextSyllable.onset;
          if (pharyngealized.test(nextOnset)) {
            return true;
          }

          return false;
        }

        const isGuttural = /[אהחע]/.test(nextSylFirstCluster);
        if (!isGuttural) {
          return syllable.text.replace(/\u{05B0}/u, isBackRounded() ? "ɑ" : schema["PATAH"]);
        }

        const nextVowel = nextSyllable.vowelName;
        if (!nextVowel)
          throw new Error(
            `Syllable ${syllable.text} has a sheva as a vowel, but the next syllable ${nextSylFirstCluster} does not have a vowel`
          );

        if (nextVowel === "SHEVA")
          throw new Error(
            `Syllable ${syllable.text} has a sheva as a vowel, but the next syllable ${nextSylFirstCluster} also has a sheva as a vowel`
          );

        return syllable.text.replace(/\u{05B0}/u, schema[nextVowel]);
      }
    }
  ],
  allowNoNiqqud: false,
  article: true,
  holemHaser: "remove",
  longVowels: false,
  qametsQatan: false,
  shevaAfterMeteg: false,
  sqnmlvy: false,
  strict: true,
  wawShureq: false
};
