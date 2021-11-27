import { SylOpts } from "havarotjs/dist/text";

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

/**
 * interface for defining a schema for transliteration
 */
export interface Schema {
  [k: string]: any;
  /**
   * HEBREW POINT SHEVA (U+05B0) ְ◌
   * @example
   * 'ǝ'
   */
  VOCAL_SHEVA: string;
  /**
   * HEBREW POINT HATAF SEGOL (U+05B1) ֱ◌
   * @example
   * 'ĕ'
   */
  HATAF_SEGOL: string;
  /**
   * HEBREW POINT HATAF PATAH (U+05B2) ֲ◌
   * @example
   * 'ă'
   */
  HATAF_PATAH: string;
  /**
   * HEBREW POINT HATAF QAMATS (U+05B3) ֳ◌
   * @example
   * 'ŏ'
   */
  HATAF_QAMATS: string;
  /**
   * HEBREW POINT HIRIQ (U+05B4) ִ◌
   * @example
   * 'i'
   */
  HIRIQ: string;
  /**
   * HEBREW POINT TSERE (U+05B5) ֵ◌
   * @example
   * 'ē'
   */
  TSERE: string;
  /**
   * HEBREW POINT SEGOL (U+05B6) ֶ◌
   * @example
   * 'e'
   */
  SEGOL: string;
  /**
   * HEBREW POINT PATAH (U+05B7) ַ◌
   * @example
   * 'a'
   */
  PATAH: string;
  /**
   * HEBREW POINT QAMATS (U+05B8) ָ◌
   * @example
   * 'ā'
   */
  QAMATS: string;
  /**
   * HEBREW POINT HOLAM (U+05B9) ֹ◌
   * @example
   * 'ō'
   */
  HOLAM: string;
  /**
   * HEBREW POINT QUBUTS (U+05BB) ֻ◌
   * @example
   * 'u'
   */
  QUBUTS: string;
  /**
   * HEBREW POINT DAGESH OR MAPIQ (U+05BC) ּ◌
   * @description if true, repeats the consonant with the dagesh
   * @example
   * ```js
   * transliterate('שַׁבָּת', { DAGESH_CHAZAQ: true });
   * // 'shabbat'
   * ```
   */
  DAGESH_CHAZAQ: boolean;
  /**
   * HEBREW PUNCTUATION MAQAF (U+05BE) ־◌
   * @example
   * '-'
   */
  MAQAF: string;
  /**
   * HEBREW POINT QAMATS QATAN (U+05C7) ׇ◌
   * @example
   * 'o'
   */
  QAMATS_QATAN: string;
  /**
   * HEBREW POINT PATAH (U+05B7) ◌ַ
   * @example
   * 'a'
   */
  FURTIVE_PATAH: string;
  /**
   * HEBREW POINT HIRIQ (U+05B4) and YOD (U+05D9) י◌ִ
   * @example
   * 'î'
   */
  HIRIQ_YOD: string;
  /**
   * HEBREW POINT TSERE (U+05B5) and YOD (U+05D9) י◌ֵ
   * @example
   * 'ê'
   */
  TSERE_YOD: string;
  /**
   * HEBREW POINT SEGOL (U+05B6) and YOD (U+05D9) י◌ֶ
   * @example
   * 'ê'
   */
  SEGOL_YOD: string;
  /**
   * HEBREW LETTER VAV (U+05D5) and DAGESH (U+05BC) וּ
   * @example
   * 'û'
   */
  SHUREQ: string;
  /**
   * HEBREW LETTER HOLAM (U+05B9) and VAV (U+05D5) ֹו◌
   * @example
   * 'ô'
   */
  HOLAM_VAV: string;
  /**
   * HEBREW POINT QAMATS (U+05B8) and HE (U+05D4) ה◌ָ
   * @example
   * 'â'
   */
  QAMATS_HE: string;
  /**
   * HEBREW LETTER QAMATS (U+05B8) and YOD (U+05D9) and VAV (U+05D5) יו◌ָ
   * @example
   * 'āyw'
   */
  MS_SUFX: string;
  /**
   * HEBREW LETTER ALEF (U+05D0) א
   * @example
   * 'ʾ'
   */
  ALEF: string;
  /**
   * HEBREW LETTER BET (U+05D1) ב
   * @example
   * 'b' or 'v'
   */
  BET: string;
  /**
   * HEBREW LETTER BET (U+05D1) and DAGESH (U+05BC) ּב
   * @description
   * the letter bet with a dagesh kal
   * @description
   * use when need to distinguish between spirantized forms
   * @example
   * 'b'
   */
  BET_DAGESH?: string;
  /**
   * HEBREW LETTER GIMEL (U+05D2) ג
   * @example
   * 'g'
   */
  GIMEL: string;
  /**
   * HEBREW LETTER GIMEL (U+05D2) and DAGESH (U+05BC) גּ
   * @description
   * the letter gimel with a dagesh kal
   * @description
   * use when need to distinguish between spirantized forms
   * @example
   * 'g'
   */
  GIMEL_DAGESH?: string;
  /**
   * HEBREW LETTER DALET (U+05D3) ד
   * @example
   * 'd'
   */
  DALET: string;
  /**
   * HEBREW LETTER DALET (U+05D3) and DAGESH (U+05BC) דּ
   * @description
   * the letter dalet with a dagesh kal
   * @description
   * use when need to distinguish between spirantized forms
   * @example
   * 'd'
   */
  DALET_DAGESH?: string;
  /**
   * HEBREW LETTER HE (U+05D4) ה
   * @example
   * 'h'
   */
  HE: string;
  /**
   * HEBREW LETTER VAV (U+05D5) ו
   * @example
   * 'w'
   */
  VAV: string;
  /**
   * HEBREW LETTER ZAYIN (U+05D6) ז
   * @example
   * 'z'
   */
  ZAYIN: string;
  /**
   * HEBREW LETTER HET (U+05D7) ח
   * @example
   * 'ḥ'
   */
  HET: string;
  /**
   * HEBREW LETTER TET (U+05D8) ט
   * @example
   * 'ṭ'
   */
  TET: string;
  /**
   * HEBREW LETTER YOD (U+05D9) י
   * @example
   * 'y'
   */
  YOD: string;
  /**
   * HEBREW LETTER FINAL KAF (U+05DA) ך
   * @example
   * 'k' or 'kh'
   */
  FINAL_KAF: string;
  /**
   * HEBREW LETTER KAF (U+05DB) כ
   * @example
   * 'k' or 'kh'
   */
  KAF: string;
  /**
   * HEBREW LETTER KAF (U+05DB) and DAGESH (U+05BC) כּ
   * @description
   * the letter kaf with a dagesh kal
   * @description
   * use when need to distinguish between spirantized forms
   * @example
   * 'k'
   */
  KAF_DAGESH?: string;
  /**
   * HEBREW LETTER LAMED (U+05DC) ל
   * @example
   * 'l'
   */
  LAMED: string;
  /**
   * HEBREW LETTER FINAL MEM (U+05DD) ם
   * @example
   * 'm'
   */
  FINAL_MEM: string;
  /**
   * HEBREW LETTER MEM (U+05DE) מ
   * @example
   * 'm'
   */
  MEM: string;
  /**
   * HEBREW LETTER FINAL NUN (U+05DF) ן
   * @example
   * 'n'
   */
  FINAL_NUN: string;
  /**
   * HEBREW LETTER NUN (U+05E0) נ
   * @example
   * 'n'
   */
  NUN: string;
  /**
   * HEBREW LETTER SAMEKH (U+05E1) ס
   * @example
   * 's'
   */
  SAMEKH: string;
  /**
   * HEBREW LETTER AYIN (U+05E2) ע
   * @example
   * 'ʿ'
   */
  AYIN: string;
  /**
   * HEBREW LETTER FINAL PE (U+05E3) ף
   * @example
   * 'p' or 'f'
   */
  FINAL_PE: string;
  /**
   * HEBREW LETTER PE (U+05E4) פ
   * @example
   * 'p' or 'f'
   */
  PE: string;
  /**
   * HEBREW LETTER  PE (U+05E4) and DAGESH (U+05BC) פּ
   * @description
   * the letter pe with a dagesh kal
   * @description
   * use when need to distinguish between spirantized forms
   * @example
   * 'p'
   */
  PE_DAGESH?: string;
  /**
   * HEBREW LETTER FINAL TSADI (U+05E5) ץ
   * @example
   * 'ṣ'
   */
  FINAL_TSADI: string;
  /**
   * HEBREW LETTER TSADI (U+05E6) צ
   * @example
   * 'ṣ'
   */
  TSADI: string;
  /**
   * HEBREW LETTER QOF (U+05E7) ק
   * @example
   * 'q'
   */
  QOF: string;
  /**
   * HEBREW LETTER RESH (U+05E8) ר
   * @example
   * 'r'
   */
  RESH: string;
  /**
   * HEBREW LETTER SHIN (U+05E9) and SHIN DOT (U+05C1) שׁ
   * @example
   * 'š'
   */
  SHIN: string;
  /**
   * HEBREW LETTER SHIN (U+05E9) and SIN DOT (U+05C2) שׁ
   * @example
   * 'ś'
   */
  SIN: string;
  /**
   * HEBREW LETTER TAV (U+05EA) ת
   * @example
   * 't' or 'th'
   */
  TAV: string;
  /**
   * HEBREW LETTER TAV (U+05EA) and DAGESH (U+05BC) תּ
   * @description
   * the letter tav with a dagesh kal
   * @description
   * use when need to distinguish between spirantized forms
   * @example
   * 't'
   */
  TAV_DAGESH?: string;
  /**
   * define additional sequences of characters
   * @example
   * [{
   *   HEBREW: 'זּ',
   *   TRANSLITERATION: 'dz'
   * }]
   */
  ADDITIONAL_SEQUENCES?: { HEBREW: string; TRANSLITERATION: string }[];
  /**
   * the full form of the divine name - יהוה
   * @example
   * 'yhwh'
   */
  DIVINE_NAME: string;
}

export interface map {
  [k: string]: keyof Schema;
}
