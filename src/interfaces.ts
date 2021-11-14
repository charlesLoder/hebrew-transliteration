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

export interface Schema {
  // vowel characters
  VOCAL_SHEVA: string; // HEBREW POINT SHEVA (U+05B0)
  HATAF_SEGOL: string; // HEBREW POINT HATAF SEGOL (U+05B1)
  HATAF_PATAH: string; // HEBREW POINT HATAF PATAH (U+05B2)
  HATAF_QAMATS: string; // HEBREW POINT HATAF QAMATS (U+05B3)
  HIRIQ: string; // HEBREW POINT HIRIQ (U+05B4)
  TSERE: string; // HEBREW POINT TSERE (U+05B5)
  SEGOL: string; // HEBREW POINT SEGOL (U+05B6)
  PATAH: string; // HEBREW POINT PATAH (U+05B7)
  QAMATS: string; // HEBREW POINT QAMATS (U+05B8)
  HOLAM: string; // HEBREW POINT HOLAM (U+05B9)
  QUBUTS: string; // HEBREW POINT QUBUTS (U+05BB)
  DAGESH: string; // HEBREW POINT DAGESH OR MAPIQ (U+05BC)
  METEG: string; // HEBREW POINT METEG (U+05BD)
  MAQAF: string; // HEBREW PUNCTUATION MAQAF (U+05BE)
  QAMATS_QATAN: string; // HEBREW POINT QAMATS QATAN (U+05C7)
  FURTIVE_PATAH: string;
  // vowel-consonant sequences
  HIRIQ_YOD: string;
  TSERE_YOD: string;
  SEGOL_YOD: string;
  SHUREQ: string;
  HOLAM_VAV: string;
  QAMATS_HE: string;
  MS_SUFX: string;
  // consonant characters
  ALEF: string; // HEBREW LETTER ALEF (U+05D0)
  BET: string; // HEBREW LETTER BET (U+05D1)
  GIMEL: string; // HEBREW LETTER GIMEL (U+05D2)
  DALET: string; // HEBREW LETTER DALET (U+05D3)
  HE: string; // HEBREW LETTER HE (U+05D4)
  VAV: string; // HEBREW LETTER VAV (U+05D5)
  ZAYIN: string; // HEBREW LETTER ZAYIN (U+05D6)
  HET: string; // HEBREW LETTER HET (U+05D7)
  TET: string; // HEBREW LETTER TET (U+05D8)
  YOD: string; // HEBREW LETTER YOD (U+05D9)
  FINAL_KAF: string; // HEBREW LETTER FINAL KAF (U+05DA)
  KAF: string; // HEBREW LETTER KAF (U+05DB)
  LAMED: string; // HEBREW LETTER LAMED (U+05DC)
  FINAL_MEM: string; // HEBREW LETTER FINAL MEM (U+05DD)
  MEM: string; // HEBREW LETTER MEM (U+05DE)
  FINAL_NUN: string; // HEBREW LETTER FINAL NUN (U+05DF)
  NUN: string; // HEBREW LETTER NUN (U+05E0)
  SAMEKH: string; // HEBREW LETTER SAMEKH (U+05E1)
  AYIN: string; // HEBREW LETTER AYIN (U+05E2)
  FINAL_PE: string; // HEBREW LETTER FINAL PE (U+05E3)
  PE: string; // HEBREW LETTER PE (U+05E4)
  FINAL_TSADI: string; // HEBREW LETTER FINAL TSADI (U+05E5)
  TSADI: string; // HEBREW LETTER TSADI (U+05E6)
  QOF: string; // HEBREW LETTER QOF (U+05E7)
  RESH: string; // HEBREW LETTER RESH (U+05E8)
  SHIN: string; // HEBREW LETTER SHIN (U+05E9)
  TAV: string; // HEBREW LETTER TAV (U+05EA)
  TRIANGLE: string; // HEBREW YOD TRIANGLE (U+05EF)
  DOUBLE_VAV: string; // HEBREW LIGATURE YIDDISH DOUBLE VAV (U+05F0)
  VAV_YOD: string; // HEBREW LIGATURE YIDDISH VAV YOD (U+05F1)
  DOUBLE_YOD: string; // HEBREW LIGATURE YIDDISH DOUBLE YOD (U+05F2)
  // spirantized form
  BET_DAGESH: string;
  GIMEL_DAGESH: string;
  DALET_DAGESH: string;
  KAF_DAGESH: string;
  PE_DAGESH: string;
  TAV_DAGESH: string;
}
