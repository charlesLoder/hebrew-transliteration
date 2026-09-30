/**
 * Deḥiq (דחיק) / ʾathe me-raḥiq detection — Khan, _The Tiberian Pronunciation
 * Tradition of Biblical Hebrew_, §I.2.8.1.2.
 *
 * When the first word is penultimately stressed, ends in an open unstressed
 * *qameṣ* / *segol*, and is bound by a conjunctive accent or *maqqef*, the
 * final vowel compresses to half-long and the following word's initial
 * consonant (with *dagesh*) geminates.
 */
import type { Word } from "havarotjs/word";
import type { Syllable } from "havarotjs/syllable";

/** Conjunctive teʿamim (Yeivin). Deḥi (U+05AD) is disjunctive — excluded. */
const CONJUNCTIVE = /[\u{05A3}-\u{05AA}\u{05AC}]/u;
const GUTTURAL_ONSET = /[אהחע]/u;

const sylHasMeteg = (syl: Syllable): boolean => syl.clusters.some((c) => c.hasMeteg);

const penultimatelyStressed = (word: Word): boolean => {
  const syls = word.syllables;
  if (syls.length < 2 || syls[syls.length - 1].isAccented) {
    return false;
  }
  return syls.slice(0, -1).some((s) => s.isAccented || sylHasMeteg(s));
};

const finalIsLaxOpen = (word: Word): boolean => {
  const syls = word.syllables;
  if (!syls.length) {
    return false;
  }
  const final = syls[syls.length - 1];
  if (final.isClosed) {
    return false;
  }
  // Gaʿya on the final vowel blocks compression (full length is required).
  if (sylHasMeteg(final)) {
    return false;
  }
  const names = final.vowelNames;
  return Boolean(names.length && (names[0] === "QAMATS" || names[0] === "SEGOL"));
};

const initialFootStressed = (word: Word): boolean => {
  const syls = word.syllables;
  if (!syls.length) {
    return false;
  }
  if (syls[0].isAccented) {
    return true;
  }
  // Stress on the first full vowel after an initial vocalic shewa.
  if (
    syls.length > 1 &&
    syls[0].vowelNames.length === 1 &&
    syls[0].vowelNames[0] === "SHEVA" &&
    syls[1].isAccented
  ) {
    return true;
  }
  return false;
};

const followingHasDagesh = (word: Word): boolean => {
  const syls = word.syllables;
  if (!syls.length || !syls[0].clusters.length) {
    return false;
  }
  return /\u{05BC}/u.test(syls[0].clusters[0].text);
};

/**
 * True if `first` + `second` form a deḥiq / ʾathe me-raḥiq bond.
 */
export const isDehiqPair = (first: Word | null | undefined, second: Word | null | undefined): boolean => {
  if (!first || !second) {
    return false;
  }
  if (!penultimatelyStressed(first)) {
    return false;
  }
  if (!finalIsLaxOpen(first)) {
    return false;
  }
  const bound = first.isInConstruct || CONJUNCTIVE.test(first.text);
  if (!bound) {
    return false;
  }
  if (!initialFootStressed(second)) {
    return false;
  }
  const onset = second.syllables[0]?.onset ?? "";
  if (GUTTURAL_ONSET.test(onset)) {
    return false;
  }
  if (!followingHasDagesh(second)) {
    return false;
  }
  return true;
};

/**
 * True if `word` is the first member of a deḥiq pair with its next word.
 */
export const wordIsDehiqHost = (word: Word): boolean => {
  const nxt = word.next?.value ?? null;
  return isDehiqPair(word, nxt);
};
