import { Text } from "havarotjs";

export const vowels = /[\u{05B0}-\u{05BD}\u{05BF}\u{05C7}]/u;

/**
 *
 * @param {string} text
 * @param {boolean} qametsQatan
 * @returns {string} a sequenced string of text
 */
export const sequence = (text: string, qametsQatan: boolean = false): string => {
  return vowels.test(text) ? new Text(text, { qametsQatan }).text : text;
};
