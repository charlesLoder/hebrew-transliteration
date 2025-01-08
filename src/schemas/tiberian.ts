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
  DIVINE_NAME: "ʔaðoːˈnɔːɔj",
  DIVINE_NAME_ELOHIM: "ʔɛloːˈhiːim",
  STRESS_MARKER: { location: "before-syllable", mark: "ˈ" },
  ADDITIONAL_FEATURES: [
    {
      FEATURE: "cluster",
      HEBREW: "\u{05D9}\u{05BC}",
      TRANSLITERATION: (cluster, hebrew) => {
        return cluster.text.replace(hebrew, "ɟɟ");
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: /תּ(?!\u{05B0})/u,
      TRANSLITERATION: (cluster, _, schema) => {
        // if there is a dagesh, but it is the beginning of the word
        // we can return the text, as the character w/ the dagesh will not be doubled
        if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
          return cluster.text;
        }

        // if there is a dagesh, it may be that it is a dagesh qal (i.e. lene)
        // if it is a dagesh lene, then like the beginning of the word,
        // the character w/ the dagesh will not be doubled
        const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
        if (!prevCoda?.includes("ת")) {
          return cluster.text;
        }

        // because the *_DAGESH value is a digraph, we need to replace the first character
        // or it will be doubled in rules.ts as "tʰtʰ"
        const noAspiration = schema["TAV_DAGESH"]?.replace("ʰ", "") ?? "";
        return cluster.text.replace("תּ", `${noAspiration + schema["TAV_DAGESH"]}`);
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: /פ(?!\u{05b0})/u,
      TRANSLITERATION: (cluster, _, schema) => {
        //  /ת(?!\u{05b0})/u rule for explanation
        if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
          return cluster.text;
        }

        const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
        if (!prevCoda?.includes("פ")) {
          return cluster.text;
        }

        const noAspiration = schema["PE_DAGESH"]?.replace("ʰ", "") ?? "";
        return cluster.text.replace("פּ", `${noAspiration + schema["PE_DAGESH"]}`);
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: /טּ(?!\u{05b0})/u,
      TRANSLITERATION: (cluster, _, schema) => {
        //  /ת(?!\u{05b0})/u rule for explanation
        if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
          return cluster.text;
        }

        const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
        if (!prevCoda?.includes("ט")) {
          return cluster.text;
        }

        const noPharyngealization = schema["TET"]?.replace("ˁ", "") ?? "";
        return cluster.text.replace("ט", `${noPharyngealization + schema["TET"]}`);
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: /צּ(?!\u{05b0})/u,
      TRANSLITERATION: (cluster, _, schema) => {
        //  /ת(?!\u{05b0})/u rule for explanation
        if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
          return cluster.text;
        }

        const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
        if (!prevCoda?.includes("צ")) {
          return cluster.text;
        }

        const noPharyngealization = schema["TSADI"]?.replace("ˁ", "") ?? "";
        return cluster.text.replace("צ", `${noPharyngealization + schema["TSADI"]}`);
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: /(כּ|ךּ)(?!\u{05b0})/u,
      TRANSLITERATION: (cluster, _, schema) => {
        // /תּ[\u{05B4}-\u{05BB}]/u rule for explanation
        if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
          return cluster.text;
        }

        const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
        if (!prevCoda?.includes("כ") && !prevCoda?.includes("ך")) {
          return cluster.text;
        }

        const noAspiration = schema["KAF_DAGESH"]?.replace("ʰ", "") ?? "";
        return cluster.text.replace(/כּ|ךּ/u, `${noAspiration + schema["KAF_DAGESH"]}`);
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: "\u{05D0}(?![\u{05B1}-\u{05BB}\u{05C7}])",
      TRANSLITERATION: (cluster) => {
        const next = cluster.next?.value;
        if (next && next.isShureq) {
          return cluster.text;
        }

        return "";
      }
    },
    {
      FEATURE: "cluster",
      HEBREW: "\u{05D0}\u{05BC}",
      TRANSLITERATION: (cluster) => {
        // remove the dagesh
        return cluster.text.replace("\u{05BC}", "");
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /ר/u,
      TRANSLITERATION: (syllable) => {
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
      FEATURE: "syllable",
      HEBREW: "ח\u{05B7}\u{05C3}?$",
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
      HEBREW: "ע\u{05B7}\u{05C3}?$",
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
      HEBREW: "ה\u{05BC}\u{05B7}\u{05C3}?$",
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
      HEBREW: /וּ(?![\u{05B4}-\u{05BB}])/u,
      TRANSLITERATION: (syllable, _, schema) => {
        // finds a vav with a dagesh not followed by a vowel character
        // if the syllable is the first syllable, replace with wuː
        // syllable.clusters[0].isShureq is not totally necessary, but it's a good check
        if (!syllable.prev && syllable.clusters[0].isShureq) {
          const text = syllable.text;
          const hasMeteg = syllable.clusters.map((c) => c.hasMeteg).includes(true); // also called gaya marking half long vowel length (§1.2.8.2.2)
          const secondaryAccent = hasMeteg ? "ˌ" : "";
          const halfLengthMarker = hasMeteg ? "ˑ" : "";
          return text.replace("וּ", `${secondaryAccent}wu${halfLengthMarker}`);
        }

        if (syllable.isAccented && syllable.isClosed) {
          const noLength = schema["SHUREQ"].replace("ː", "");
          return syllable.text.replace("וּ", schema["SHUREQ"] + noLength);
        }

        return syllable.text;
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /[\u{05B4}-\u{05BB}\u{05C7}]/u,
      TRANSLITERATION: (syllable, _, schema) => {
        // this features matches any syllable that has a full vowel character (i.e. not sheva)
        const vowelName = syllable.vowelNames[0];
        const vowel = syllable.vowels[0];

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
         * @returns the back unrounded patach realization of the vowel or the original vowel if not patach
         */
        function determinePatachRealization(vowelChar: string) {
          // see comment for explanation: https://github.com/charlesLoder/hebrew-transliteration/issues/45#issuecomment-1712186201
          // exit early if not patach
          if (vowelName !== "PATAH" && vowelName !== "HATAF_PATAH") {
            return vowelChar;
          }

          // by this point, the resh has already been pharyngealized
          // but only for the current syllable
          const pharyngealized = /rˁ|ט|צ|ץ/;
          if (pharyngealized.test(onset) || pharyngealized.test(coda)) {
            return "ɑ";
          }

          // the resh of the next syllable has not been transliterated yet
          // check if the next syllable has a resh in the onset
          // and if the current syllable's coda is an alveolar
          const nextSyllable = syllable.next?.value;
          const nextOnset = nextSyllable?.onset;
          const alveolars = /[דזצתטסלנ]|שׂ/;
          if (nextOnset === "ר" && alveolars.test(coda)) {
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

        // https://github.com/charlesLoder/hebrew-transliteration/issues/45#issuecomment-1747967050
        const longerVowels = ["HOLAM", "TSERE", "QAMATS"];
        if (!isAccented && isClosed && !syllable.isFinal && longerVowels.includes(vowelName)) {
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
      HEBREW: /[\u{05B1}-\u{05B3}]/u,
      TRANSLITERATION: (syllable) => {
        // this features matches any syllable that has a hataf vowel character
        const vowelName = syllable.vowelNames[0];
        const vowel = syllable.vowels[0];

        if (!vowel || !vowelName) {
          return syllable.text;
        }

        if (vowelName === "SHEVA") {
          throw new Error(`Syllable ${syllable.text} has a sheva as vowel, should not have matched`);
        }

        const hasNonHalfVowels = syllable.clusters.map((c) => c.hasShortVowel || c.hasLongVowel).includes(true);
        if (hasNonHalfVowels) {
          throw new Error(`Syllable ${syllable.text} does not have a hataf vowel, should not have matched`);
        }

        const [onset, _nuclues, coda] = syllable.structure(true);
        /**
         * Determines the realization of a patach
         *
         * @param vowelChar the hebrew vowel character
         * @returns the back unrounded patach realization of the vowel or the original vowel if not patach
         */
        function determinePatachRealization(vowelChar: string) {
          // exit early if not hataf patach
          if (vowelName !== "HATAF_PATAH") {
            return vowelChar;
          }

          // by this point, the resh has already been pharyngealized in the transliteration
          // but only for the current syllable
          const pharyngealized = /rˁ|ט|צ|ץ/;
          if (pharyngealized.test(onset) || pharyngealized.test(coda)) {
            return "ɑ";
          }

          // the resh of the next syllable has not been transliterated yet
          // check if the next syllable has a resh in the onset
          // and if the current syllable's coda is an alveolar
          const nextSyllable = syllable.next?.value;
          const nextOnset = nextSyllable?.onset;
          const alveolars = /[דזצתטסלנ]|שׂ/;
          if (nextOnset === "ר" && alveolars.test(coda)) {
            return "ɑ";
          }

          // check for the "environment of pharyngealized consonants"
          // https://www.tiberianhebrew.com/patah
          if (nextOnset && /[צץט]/.test(nextOnset)) {
            return "ɑ";
          }

          return vowelChar;
        }

        return syllable.text.replace(vowel, `${determinePatachRealization(vowel)}`);
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /(?<!.*([\u{05B4}-\u{05BB}\u{05C7}]|\u{05D5}\u{05BC}).*)\u{05B0}/u,
      TRANSLITERATION: (syllable, _hebrew, schema) => {
        // matches any syllable that contains a sheva that is not preceded by a full vowel character [\u{05B4}-\u{05BB}\u{05C7}]
        // or shureq \u{5D5}\u{5BC}
        const nextSyllable = syllable.next?.value;
        if (!nextSyllable) return syllable.text;

        const nextSylFirstCluster = nextSyllable.clusters[0].text;
        if (!nextSylFirstCluster) return syllable.text;

        const [onset, _, coda] = syllable.structure(true);

        function isBackUnrounded() {
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

        function transliterateShevaAsVowel(vowel: string) {
          const hasMeteg = syllable.clusters.map((c) => c.hasMeteg).includes(true);
          const secondaryAccent = hasMeteg ? "ˌ" : "";
          const halfLengthMarker = hasMeteg ? "ˑ" : "";
          const newVowel = vowel.replace("ː", "") + halfLengthMarker;

          return secondaryAccent + syllable.text.replace(/\u{05B0}/u, newVowel);
        }

        const isGuttural = /[אהחע]/.test(nextSylFirstCluster);
        if (!isGuttural) {
          return transliterateShevaAsVowel(isBackUnrounded() ? "ɑ" : schema["PATAH"]);
        }

        const nextVowel = nextSyllable.vowelNames[0];
        if (!nextVowel) {
          throw new Error(
            `Syllable ${syllable.text} has a sheva as a vowel, but the next syllable ${nextSylFirstCluster} does not have a vowel`
          );
        }

        if (nextVowel === "SHEVA") {
          throw new Error(
            `Syllable ${syllable.text} has a sheva as a vowel, but the next syllable ${nextSylFirstCluster} also has a sheva as a vowel`
          );
        }

        return transliterateShevaAsVowel(schema[nextVowel]);
      }
    },
    {
      FEATURE: "syllable",
      HEBREW: /^\u{5B4}\u{5DD}/u,
      TRANSLITERATION: (syl, heb, schema) => {
        // This rule attempts to find instances of Jerusalem spelled without a yod

        // this is just a sanity check that the previous syllable
        // should be a lamed with a qamats or a patah
        const prev = syl.prev?.value;
        if (prev && !prev.isClosed && !prev.hasVowelName("QAMATS") && !prev.hasVowelName("PATAH") && prev.onset !== "ל") {
          return syl.text;
        }
        
        // update this syllable to match the later spelling of Jerusalem
        return syl.text.replace(heb, `${schema["YOD"]}${schema["HIRIQ"]}${schema["FINAL_MEM"]}`);
      }
    },
    {
      FEATURE: "word",
      HEBREW: /(וְ)?יִשָּׂשכָר/,
      PASS_THROUGH: true,
      TRANSLITERATION: (word, heb) => {
        // matches the name Issachar
        const taamim = /[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]/gu;
        const text = word.text.replace(taamim, "");
        const match = text.match(heb);
        const vav = match && match[1] ? match[1] : "";
        const issachar = "jissɔːˈχɔːɔʀ̟";
        return `${vav}${issachar}`;
      }
    }
  ],
  allowNoNiqqud: false,
  article: false,
  holemHaser: "remove",
  ketivQeres: [
    {
      input: "הִוא",
      output: "הִיא",
      captureTaamim: true,
      ignoreTaamim: true
    }
  ],
  longVowels: false,
  qametsQatan: true,
  shevaAfterMeteg: false,
  shevaWithMeteg: true,
  sqnmlvy: false,
  strict: true,
  wawShureq: false
};
