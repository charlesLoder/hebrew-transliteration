import { sequence } from "./sequence";
const cantillation = /[\u{0591}-\u{05AF}\u{05BF}\u{05C0}\u{05C3}-\u{05C6}\u{05F3}\u{05F4}]/gu;
const vowels = /[\u{05B0}-\u{05BD}\u{05BF}\u{05C7}]/gu;
const shinDot = /\u{05C1}/gu;
const sinDot = /\u{05C2}/gu;

/**
 * Options for the `remove()` function
 */
interface RemoveOptions {
  /**
   * an option to remove vowels
   *
   * @example
   * ```ts
   * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true });
   * // "שׂרי אשׁתך";
   * ```
   */
  removeVowels?: boolean;
  /**
   * an option to remove the shin dot (U+05C1)
   *
   * @example
   * ```ts
   * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true, removeShinDot: true, removeSinDot: true });
   * // "שרי אשתך";
   * ```
   */
  removeShinDot?: boolean;
  /**
   * an option to remove the sin dot (U+05C2)
   *
   * @example
   * ```ts
   * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true, removeShinDot: true, removeSinDot: true });
   * // "שרי אשתך";
   * ```
   */
  removeSinDot?: boolean;
}

const removeItem = (text: string, item: RegExp) => text.replace(item, "");

/**
 * removes taamim and optionally removes certain niqqudim
 *
 * @param text - a string of Hebrew characters
 * @param RemoveOptions - {@link RemoveOptions}
 * @returns Hebrew characters with taamim and niqqud optionally removed
 *
 * @example Default
 *
 * ```ts
 * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔");
 * // "שָׂרַי אִשְׁתְּךָ";
 * ```
 *
 * @example Remove vowels
 *
 * ```ts
 * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true });
 * // "שׂרי אשׁתך";
 * ```
 *
 * @example Remove all
 *
 * ```ts
 * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true, removeShinDot: true, removeSinDot: true });
 * // "שרי אשתך";
 * ```
 */
export const remove = (
  text: string,
  { removeVowels = false, removeShinDot = false, removeSinDot = false }: RemoveOptions = {}
): string => {
  const sequenced = sequence(text);
  const remCantillation = removeItem(sequenced, cantillation);
  const remVowels = removeVowels ? removeItem(remCantillation, vowels) : remCantillation;
  const remShin = removeShinDot ? removeItem(remVowels, shinDot) : remVowels;
  return removeSinDot ? removeItem(remShin, sinDot) : remShin;
};
