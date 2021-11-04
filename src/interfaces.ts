export interface TransOptions {
  isSequenced?: boolean;
  qametsQatan?: boolean;
  isSimple?: boolean;
}

/**
 * Options for the `remove()` function
 */
export interface RemoveOptions {
  /**
   * an option to remove vowels
   * @example
   * ```ts
   * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true });
   * // "שׂרי אשׁתך";
   * ```
   */
  removeVowels?: boolean;
  /**
   * an option to remove the shin dot (U+05C1)
   * @example
   * ```ts
   * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true, removeShinDot: true, removeSinDot: true });
   * // "שרי אשתך";
   * ```
   */
  removeShinDot?: boolean;
  /**
   * an option to remove the sin dot (U+05C2)
   * @example
   * ```ts
   * heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true, removeShinDot: true, removeSinDot: true });
   * // "שרי אשתך";
   * ```
   */
  removeSinDot?: boolean;
}

export interface Dict {
  [key: string]: string;
}
