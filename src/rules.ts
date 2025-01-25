import { Cluster } from "havarotjs/cluster";
import { Syllable } from "havarotjs/syllable";
import { clusterSplitGroup, hebChars } from "havarotjs/utils/regularExpressions";
import { Word } from "havarotjs/word";
import { transliterateMap as map } from "./hebCharsTrans";
import { Schema } from "./schema";

const taamim = /[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]/gu;

/**
 * maps Hebrew characters to schema
 *
 * @param input - text to be transliterated
 * @param schema - a {@link Schema} for transliterating the input
 * @returns transliteration of characters
 *
 */
const mapChars = (schema: Schema) => (input: string) => {
  return [...input].map((char: string) => (char in map ? schema[map[char]] : char)).join("");
};

/**
 * a wrapper around String.replace() to constrain to a RegExp
 *
 * @param input the string to be modified
 * @param regex the regex to be used as the search value
 * @param replaceValue the string to replace the regex
 * @returns
 */
const replaceWithRegex = (input: string, regex: RegExp, replaceValue: string) => input.replace(regex, replaceValue);

/**
 * replaces part of a string and transliterates the remaining characters according to the schema
 *
 * @example
 * ```ts
 * // replaces בָ as VA, but only when matching the regex sequence
 * const betAndQamats = /\u{05D1}\u{05B8}/u
 * replaceAndTransliterate("דָּבָר", betAndQamats, "VA", schema);
 * // dāVAr
 * ```
 *
 * @param input the text to be transliterated
 * @param regex the regex used as the search value
 * @param replaceValue the string to replace the regex
 * @param schema the Schema
 * @returns
 */
export const replaceAndTransliterate = (input: string, regex: RegExp, replaceValue: string, schema: Schema) => {
  const sylSeq = replaceWithRegex(input, regex, replaceValue);
  return [...sylSeq].map(mapChars(schema)).join("");
};

const isDageshChazaq = (cluster: Cluster, schema: Schema) => {
  // if there is no dagesh chazaq in the schema, then return false
  if (!schema.DAGESH_CHAZAQ) {
    return false;
  }

  // a shureq could potentially match because of dagesh
  if (cluster.isShureq) {
    return false;
  }

  // if there is no dagesh in the text, then return false
  if (!/\u{05BC}/u.test(cluster.text)) {
    return false;
  }

  const prevWord = cluster.syllable?.word?.prev?.value;
  if (prevWord && prevWord?.isInConstruct && !prevWord.syllables[prevWord.syllables.length - 1].isClosed) {
    return true;
  }

  // this could be a code smell, b/c the copySyllable function results are not the most predictable
  const prevSyllable = cluster.syllable?.prev;
  if (!prevSyllable) {
    return false;
  }

  const prevCoda = prevSyllable.value?.codaWithGemination;
  if (!prevCoda) {
    return false;
  }

  return prevCoda === cluster.syllable?.onset;
};

const getDageshChazaqVal = (input: string, dagesh: Schema["DAGESH_CHAZAQ"], isChazaq: boolean) => {
  if (!isChazaq) {
    return input;
  }

  if (typeof dagesh === "boolean") {
    return input.repeat(2);
  }

  return input + dagesh;
};

/**
 * formats the Divine Name with any Latin chars
 *
 * @param str word text
 * @param schema
 * @returns the Divine Name with any pre or proceding Latin chars
 */
const getDivineName = (str: string, schema: Schema): string => {
  const begn = str[0];
  const end = str[str.length - 1];
  // if DN is pointed with a hiriq, then it is read as 'elohim
  const divineName =
    schema.DIVINE_NAME_ELOHIM && /\u{05B4}/u.test(str) ? schema.DIVINE_NAME_ELOHIM : schema.DIVINE_NAME;
  return `${hebChars.test(begn) ? "" : begn}${divineName}${hebChars.test(end) ? "" : end}`;
};

const materFeatures = (syl: Syllable, schema: Schema) => {
  const mater = syl.clusters.filter((c) => c.isMater)[0];
  const prev = mater.prev instanceof Cluster ? mater.prev : null;
  const materText = mater.text;
  const prevText = (prev?.text || "").replace(taamim, "");
  // string comprised of all non-mater clusters in a syl with a mater
  let noMaterText = syl.clusters
    .filter((c) => !c.isMater)
    .map((c) => consonantFeatures(c.text.replace(taamim, ""), syl, c, schema))
    .join("");

  // workaround for maqaf
  const hasMaqaf = mater.text.includes("־");
  noMaterText = hasMaqaf ? noMaterText.concat("־") : noMaterText;

  if (/י/.test(materText)) {
    // hiriq
    if (/\u{05B4}/u.test(prevText)) {
      return replaceWithRegex(noMaterText, /\u{05B4}/u, schema.HIRIQ_YOD);
    }
    // tsere
    if (/\u{05B5}/u.test(prevText)) {
      return replaceWithRegex(noMaterText, /\u{05B5}/u, schema.TSERE_YOD);
    }
    // segol
    if (/\u{05B6}/u.test(prevText)) {
      return replaceWithRegex(noMaterText, /\u{05B6}/u, schema.SEGOL_YOD);
    }
  }

  if (/ו/u.test(materText)) {
    // holam
    if (/\u{05B9}/u.test(prevText)) {
      return replaceWithRegex(noMaterText, /\u{05B9}/u, schema.HOLAM_VAV);
    }
  }

  if (/ה/.test(materText)) {
    // qamets
    if (/\u{05B8}/u.test(prevText)) {
      return replaceWithRegex(noMaterText, /\u{05B8}/u, schema.QAMATS_HE);
    }

    // seghol
    if (/\u{05B6}/u.test(prevText)) {
      return replaceWithRegex(noMaterText, /\u{05B6}/u, schema.SEGOL_HE);
    }

    // tsere
    if (/\u{05B5}/u.test(prevText)) {
      return replaceWithRegex(noMaterText, /\u{05B5}/u, schema.TSERE_HE);
    }
  }

  return materText;
};

const joinSyllableChars = (syl: Syllable, sylChars: string[], schema: Schema): string => {
  const isInConstruct = syl.word?.isInConstruct;

  if (isInConstruct) {
    return sylChars.map(mapChars(schema)).join("");
  }

  if (!syl.isAccented) {
    return sylChars.map(mapChars(schema)).join("");
  }

  // if syllable is only punctuation (e.g. a paseq), it should not receive a stress marker
  const isOnlyPunctuation = syl.clusters.map((c) => c.isPunctuation).every((c) => c);
  if (isOnlyPunctuation) {
    return sylChars.map(mapChars(schema)).join("");
  }

  if (schema.STRESS_MARKER) {
    const exclude = schema.STRESS_MARKER?.exclude ?? "never";

    if (exclude === "single" && !syl.prev && !syl.next) {
      return sylChars.map(mapChars(schema)).join("");
    }

    if (exclude === "final" && !syl.next) {
      return sylChars.map(mapChars(schema)).join("");
    }

    const location = schema.STRESS_MARKER.location;
    const mark = schema.STRESS_MARKER.mark;

    // if the stress marker is already present, no need to add it again
    if (syl.text.includes(mark)) {
      return sylChars.map(mapChars(schema)).join("");
    }

    if (location === "before-syllable") {
      const isDoubled = syl.clusters.map((c) => isDageshChazaq(c, schema)).includes(true);
      if (isDoubled) {
        const chars = sylChars.map(mapChars(schema)).join("");
        const [first, ...rest] = chars;
        return `${first}${mark}${rest.join("")}`;
      }

      return `${mark}${sylChars.map(mapChars(schema)).join("")}`;
    }

    if (location === "after-syllable") {
      return `${sylChars.map(mapChars(schema)).join("")}${mark}`;
    }

    const vowels = [
      schema.PATAH,
      schema.HATAF_PATAH,
      schema.QAMATS,
      schema.HATAF_QAMATS,
      schema.SEGOL,
      schema.HATAF_SEGOL,
      schema.TSERE,
      schema.HIRIQ,
      schema.HOLAM,
      schema.QAMATS_QATAN,
      schema.QUBUTS,
      schema.QAMATS_HE,
      schema.SEGOL_HE,
      schema.TSERE_HE,
      schema.HIRIQ_YOD,
      schema.TSERE_YOD,
      schema.SEGOL_YOD,
      schema.HOLAM_VAV,
      schema.SHUREQ
    ]
      .filter((v) => typeof v === "string")
      .sort((a, b) => b.length - a.length);
    const vowelRgx = new RegExp(`${vowels.join("|")}`);
    const str = sylChars.map(mapChars(schema)).join("");
    const match = str.match(vowelRgx);

    if (location === "before-vowel") {
      return match?.length ? str.replace(match[0], `${mark}${match[0]}`) : str;
    }

    // after-vowel
    return match?.length ? str.replace(match[0], `${match[0]}${mark}`) : str;
  }

  return sylChars.map(mapChars(schema)).join("");
};

const consonantFeatures = (clusterText: string, syl: Syllable, cluster: Cluster, schema: Schema) => {
  if (schema.ADDITIONAL_FEATURES?.length) {
    const seqs = schema.ADDITIONAL_FEATURES;
    for (const seq of seqs) {
      const heb = new RegExp(seq.HEBREW, "u");
      if (seq.FEATURE === "cluster" && heb.test(clusterText)) {
        const transliteration = seq.TRANSLITERATION;
        const passThrough = seq.PASS_THROUGH ?? true;
        if (typeof transliteration === "string") {
          return replaceAndTransliterate(clusterText, heb, transliteration, schema);
        }
        if (!passThrough) {
          return transliteration(cluster, seq.HEBREW, schema);
        }
        clusterText = transliteration(cluster, seq.HEBREW, schema);
      }
    }
  }

  clusterText = cluster.hasSheva && syl.isClosed ? clusterText.replace(/\u{05B0}/u, "") : clusterText;

  // mappiq he
  if (/ה\u{05BC}$/mu.test(clusterText)) {
    return replaceWithRegex(clusterText, /ה\u{05BC}/u, schema.HE);
  }

  if (syl.isFinal && !syl.isClosed) {
    const furtiveChet = /\u{05D7}\u{05B7}$/mu;
    if (furtiveChet.test(clusterText)) {
      return replaceWithRegex(clusterText, furtiveChet, "\u{05B7}\u{05D7}");
    }

    const furtiveAyin = /\u{05E2}\u{05B7}$/mu;
    if (furtiveAyin.test(clusterText)) {
      return replaceWithRegex(clusterText, furtiveAyin, "\u{05B7}\u{05E2}");
    }

    const furtiveHe = /\u{05D4}\u{05BC}\u{05B7}$/mu;
    if (furtiveHe.test(clusterText)) {
      return replaceWithRegex(clusterText, furtiveHe, "\u{05B7}\u{05D4}\u{05BC}");
    }
  }

  // dagesh chazaq
  const isDageshChazq = isDageshChazaq(cluster, schema);

  if (schema.BET_DAGESH && /ב\u{05BC}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /ב\u{05BC}/u,
      getDageshChazaqVal(schema.BET_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (schema.GIMEL_DAGESH && /ג\u{05BC}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /ג\u{05BC}/u,
      getDageshChazaqVal(schema.GIMEL_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (schema.DALET_DAGESH && /ד\u{05BC}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /ד\u{05BC}/u,
      getDageshChazaqVal(schema.DALET_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (schema.KAF_DAGESH && /כ\u{05BC}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /כ\u{05BC}/u,
      getDageshChazaqVal(schema.KAF_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (schema.KAF_DAGESH && /ך\u{05BC}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /ך\u{05BC}/u,
      getDageshChazaqVal(schema.KAF_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (schema.PE_DAGESH && /פ\u{05BC}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /פ\u{05BC}/u,
      getDageshChazaqVal(schema.PE_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (schema.TAV_DAGESH && /ת\u{05BC}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /ת\u{05BC}/u,
      getDageshChazaqVal(schema.TAV_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (/ש\u{05C1}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /ש\u{05C1}/u,
      getDageshChazaqVal(schema.SHIN, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (/ש\u{05C2}/u.test(clusterText)) {
    return replaceWithRegex(
      clusterText,
      /ש\u{05C2}/u,
      getDageshChazaqVal(schema.SIN, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (isDageshChazq) {
    const consonant = cluster.chars[0].text;
    const consonantDagesh = new RegExp(consonant + "\u{05BC}", "u");
    return replaceWithRegex(
      clusterText,
      consonantDagesh,
      getDageshChazaqVal(consonant, schema.DAGESH_CHAZAQ, isDageshChazq)
    );
  }

  if (cluster.isShureq) {
    return clusterText.replace("וּ", schema.SHUREQ);
  }

  return clusterText;
};

const copySyllable = (newText: string, old: Syllable) => {
  const newClusters = newText.split(clusterSplitGroup).map((clusterString) => new Cluster(clusterString, true));
  const oldClusters = old.clusters;

  // set prev and next based on old syllable
  if (newClusters.length === oldClusters.length) {
    newClusters.forEach((c, i) => ((c.prev = oldClusters[i]?.prev ?? null), (c.next = oldClusters[i]?.next ?? null)));
  } else {
    for (let i = 0; i < newClusters.length; i++) {
      const c = newClusters[i];
      if (oldClusters[i]?.text[0] === c?.text[0]) {
        c.prev = oldClusters[i]?.prev ?? null;
        c.next = oldClusters[i]?.next ?? null;
      } else {
        c.prev = oldClusters[i]?.prev ?? null;
        c.next = oldClusters[i + 1]?.next ?? null;
        i++;
      }
    }
  }

  const newSyl = new Syllable(newClusters, {
    isClosed: old.isClosed,
    isAccented: old.isAccented,
    isFinal: old.isFinal
  });

  newClusters.forEach((c) => (c.syllable = newSyl));

  newSyl.prev = old.prev;
  newSyl.next = old.next;
  newSyl.word = old.word;

  return newSyl;
};

export const sylRules = (syl: Syllable, schema: Schema): string => {
  const sylTxt = syl.text.replace(taamim, "");

  if (schema.ADDITIONAL_FEATURES?.length) {
    const seqs = schema.ADDITIONAL_FEATURES;
    for (const seq of seqs) {
      const heb = new RegExp(seq.HEBREW, "u");
      if (seq.FEATURE === "syllable" && heb.test(sylTxt)) {
        const transliteration = seq.TRANSLITERATION;
        const passThrough = seq.PASS_THROUGH ?? true;

        // if transliteration is a string, then replace
        if (typeof transliteration === "string") {
          return replaceAndTransliterate(sylTxt, heb, transliteration, schema);
        }

        // if transliteration is a function and passThrough is false, then transliterate and exit
        if (!passThrough) {
          return transliteration(syl, seq.HEBREW, schema);
        }

        const newText = transliteration(syl, seq.HEBREW, schema);

        // if the transliteration just returns the syllable.text, then no need to copy the syllable
        if (newText !== sylTxt) {
          syl = copySyllable(newText, syl);
        }
      }
    } // end of seqs loop
  }

  // syllable is 3ms sufx
  const mSSuffix = /\u{05B8}\u{05D9}\u{05D5}/u;
  if (syl.isFinal && mSSuffix.test(sylTxt)) {
    const sufxSyl = replaceWithRegex(sylTxt, mSSuffix, schema.MS_SUFX);
    return joinSyllableChars(syl, [...sufxSyl], schema);
  }

  // syllable has a mater
  const hasMater = syl.clusters.map((c) => c.isMater).includes(true);
  if (hasMater) {
    const materSyl = materFeatures(syl, schema);
    return joinSyllableChars(syl, [...materSyl], schema);
  }

  // regular syllables
  const returnTxt = syl.clusters.map((cluster) => {
    const clusterText = cluster.text.replace(taamim, "");
    return consonantFeatures(clusterText, syl, cluster, schema);
  });

  // there may be taamim still in the text, so remove them
  return joinSyllableChars(syl, returnTxt, schema).replace(taamim, "");
};

export const wordRules = (word: Word, schema: Schema): string | Word => {
  if (word.isDivineName) {
    return getDivineName(word.text, schema);
  }

  if (word.hasDivineName) {
    return `${sylRules(word.syllables[0], schema)}-${getDivineName(word.text, schema)}`;
  }

  if (word.isNotHebrew) {
    return word.text;
  }

  const text = word.text.replace(taamim, "");
  if (schema.ADDITIONAL_FEATURES?.length) {
    const seqs = schema.ADDITIONAL_FEATURES;
    for (const seq of seqs) {
      const heb = new RegExp(seq.HEBREW, "u");
      if (seq.FEATURE === "word" && heb.test(text)) {
        const transliteration = seq.TRANSLITERATION;
        const passThrough = seq.PASS_THROUGH ?? true;
        if (typeof transliteration === "string") {
          return replaceAndTransliterate(text, heb, transliteration, schema);
        }
        if (!passThrough) {
          return transliteration(word, seq.HEBREW, schema);
        }
        return new Word(transliteration(word, seq.HEBREW, schema), schema);
      }
    }
    return word;
  }
  return word;
};
