import { Text } from "havarotjs";

export const vowels = /[\u{05B0}-\u{05BC}\u{05C7}]/u;

/**
 * Sequences Hebrew charactes according to the [SBL Hebrew Font Manual](https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf)
 *
 * @param text - a string of Hebrew character
 * @param qametsQatan - convert qamets to qamets qatan
 * @returns a sequenced string of text
 *
 * @example
 * ```js
 * import { sequence } from "hebrew-transliteration";
 *
 * sequence("\u{5D1}\u{5B0}\u{5BC}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5B4}\u{5C1}\u{596}\u{5D9}\u{5EA}");
 * //       "\u{5D1}\u{5BC}\u{5B0}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5C1}\u{5B4}\u{596}\u{5D9}\u{5EA}";
 * ```
 *
 * @remarks
 * Seqeuncing follows the pattern of: consonant - dagesh - vowel - ta'am as defined in the {@link https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf | SBL Hebrew Font Manual}
 */
export const sequence = (text: string, qametsQatan = false): string => {
  return vowels.test(text) ? new Text(text, { qametsQatan }).text : text;
};
