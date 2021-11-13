import { Text } from "havarotjs";

/**
 *
 * @param {string} text
 * @param {boolean} qametsQatan
 * @returns {string} a sequenced string of text
 */
export const sequence = (text: string, qametsQatan = false) => {
  const vowels = /[\u{05B0}-\u{05BD}\u{05BF}\u{05C7}]/gu;
  return vowels.test(text) ? new Text(text, { qametsQatan }).text : text;
};
