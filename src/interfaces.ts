import { SylOpts } from "havarotjs/dist/text";

/**
 * Options for the `remove()` function
 */
export interface RemoveOptions {
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

/**
 * class for defining a schema for transliteration
 */
export class Schema implements SylOpts {
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
   * @description typically, this will be a blank string
   * @example
   * ''
   */
  DAGESH: string;
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
   * HEBREW PUNCTUATION PASEQ (U+05C0) ׀ ◌
   * @description if a blank string, two spaces will occur between words
   * @example
   * '|' or ''
   * @example
   * ```js
   * transliterate('כְּשֶׁ֣בֶת ׀ הַמֶּ֣לֶךְ', { PASEQ: '' });
   * // 'kǝšebet  hammelek'
   * ```
   */
  PASEQ: string;
  /**
   * HEBREW PUNCTUATION SOF PASUQ (U+05C3) ׃◌
   * @example
   * '' or '.'
   */
  SOF_PASUQ: string;
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
   * HEBREW POINT SEGOL (U+05B6) and HE (U+05D4) ה◌ֶ
   * @example
   * 'ê'
   */
  SEGOL_HE: string;
  /**
   * HEBREW POINT TSERE (U+05B5) and HE (U+05D4) ה◌ֵ
   * @example
   * 'ê'
   */
  TSERE_HE: string;
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
   *
   * ⚠️ there may be unpredictable results
   *
   * @example
   * [{
   *   FEATURE: 'cluster',
   *   HEBREW: 'זּ',
   *   TRANSLITERATION: 'tz'
   * }]
   */
  ADDITIONAL_FEATURES?: {
    /**
     * orthographic feature
     */
    FEATURE: "word" | "syllable" | "mater" | "cluster";
    HEBREW: string;
    TRANSLITERATION: string;
  }[];
  /**
   * the full form of the divine name - יהוה
   * @example
   * 'yhwh'
   */
  DIVINE_NAME: string;
  /**
   * a syllable separator, usually an empty string
   *  @example
   * '' or '-'
   * @example
   * ```js
   * transliterate('הָאָֽרֶץ', { SYLLABLE_SEPARATOR: '-' });
   * // 'hā-ʾā-reṣ'
   * ```
   */
  SYLLABLE_SEPARATOR?: string;
  longVowels: SylOpts["longVowels"];
  qametsQatan: SylOpts["qametsQatan"];
  sqnmlvy: SylOpts["sqnmlvy"];
  wawShureq: SylOpts["wawShureq"];
  article: SylOpts["article"];
  constructor(schema: Schema) {
    (this.VOCAL_SHEVA = schema.VOCAL_SHEVA),
      (this.HATAF_SEGOL = schema.HATAF_SEGOL),
      (this.HATAF_PATAH = schema.HATAF_PATAH),
      (this.HATAF_QAMATS = schema.HATAF_QAMATS),
      (this.HIRIQ = schema.HIRIQ),
      (this.TSERE = schema.TSERE),
      (this.SEGOL = schema.SEGOL),
      (this.PATAH = schema.PATAH),
      (this.QAMATS = schema.QAMATS),
      (this.HOLAM = schema.HOLAM),
      (this.QUBUTS = schema.QUBUTS),
      (this.DAGESH = schema.DAGESH),
      (this.DAGESH_CHAZAQ = schema.DAGESH_CHAZAQ),
      (this.MAQAF = schema.MAQAF),
      (this.PASEQ = schema.PASEQ),
      (this.SOF_PASUQ = schema.SOF_PASUQ),
      (this.QAMATS_QATAN = schema.QAMATS_QATAN),
      (this.FURTIVE_PATAH = schema.FURTIVE_PATAH),
      (this.HIRIQ_YOD = schema.HIRIQ_YOD),
      (this.TSERE_YOD = schema.TSERE_YOD),
      (this.SEGOL_YOD = schema.SEGOL_YOD),
      (this.SHUREQ = schema.SHUREQ),
      (this.HOLAM_VAV = schema.HOLAM_VAV),
      (this.QAMATS_HE = schema.QAMATS_HE),
      (this.SEGOL_HE = schema.SEGOL_HE),
      (this.TSERE_HE = schema.TSERE_HE),
      (this.MS_SUFX = schema.MS_SUFX),
      (this.ALEF = schema.ALEF),
      (this.BET_DAGESH = schema.BET_DAGESH),
      (this.BET = schema.BET),
      (this.GIMEL = schema.GIMEL),
      (this.GIMEL_DAGESH = schema.GIMEL_DAGESH),
      (this.DALET = schema.DALET),
      (this.DALET_DAGESH = schema.DALET_DAGESH),
      (this.HE = schema.HE),
      (this.VAV = schema.VAV),
      (this.ZAYIN = schema.ZAYIN),
      (this.HET = schema.HET),
      (this.TET = schema.TET),
      (this.YOD = schema.YOD),
      (this.FINAL_KAF = schema.FINAL_KAF),
      (this.KAF = schema.KAF),
      (this.KAF_DAGESH = schema.KAF_DAGESH),
      (this.LAMED = schema.LAMED),
      (this.FINAL_MEM = schema.FINAL_MEM),
      (this.MEM = schema.MEM),
      (this.FINAL_NUN = schema.FINAL_NUN),
      (this.NUN = schema.NUN),
      (this.SAMEKH = schema.SAMEKH),
      (this.AYIN = schema.AYIN),
      (this.FINAL_PE = schema.FINAL_PE),
      (this.PE = schema.PE),
      (this.PE_DAGESH = schema.PE_DAGESH),
      (this.FINAL_TSADI = schema.FINAL_TSADI),
      (this.TSADI = schema.TSADI),
      (this.QOF = schema.QOF),
      (this.RESH = schema.RESH),
      (this.SHIN = schema.SHIN),
      (this.SIN = schema.SIN),
      (this.TAV = schema.TAV),
      (this.TAV_DAGESH = schema.TAV_DAGESH),
      (this.DIVINE_NAME = schema.DIVINE_NAME),
      (this.SYLLABLE_SEPARATOR = schema.SYLLABLE_SEPARATOR),
      (this.ADDITIONAL_FEATURES = schema.ADDITIONAL_FEATURES),
      (this.longVowels = schema.longVowels),
      (this.qametsQatan = schema.qametsQatan),
      (this.sqnmlvy = schema.sqnmlvy),
      (this.wawShureq = schema.wawShureq),
      (this.article = schema.article);
  }
}

export class SBL extends Schema {
  constructor(schema: Partial<Schema>) {
    super({
      VOCAL_SHEVA: schema.VOCAL_SHEVA || "ǝ",
      HATAF_SEGOL: schema.HATAF_SEGOL || "ĕ",
      HATAF_PATAH: schema.HATAF_PATAH || "ă",
      HATAF_QAMATS: schema.HATAF_QAMATS || "ŏ",
      HIRIQ: schema.HIRIQ || "i",
      TSERE: schema.TSERE || "ē",
      SEGOL: schema.SEGOL || "e",
      PATAH: schema.PATAH || "a",
      QAMATS: schema.QAMATS || "ā",
      HOLAM: schema.HOLAM || "ō",
      QUBUTS: schema.QUBUTS || "ū",
      DAGESH: schema.DAGESH || "",
      DAGESH_CHAZAQ: schema.DAGESH_CHAZAQ ?? true,
      MAQAF: schema.MAQAF || "-",
      PASEQ: schema.PASEQ || "",
      SOF_PASUQ: schema.SOF_PASUQ || "",
      QAMATS_QATAN: schema.QAMATS_QATAN || "o",
      FURTIVE_PATAH: schema.FURTIVE_PATAH || "a",
      HIRIQ_YOD: schema.HIRIQ_YOD || "î",
      TSERE_YOD: schema.TSERE_YOD || "ê",
      SEGOL_YOD: schema.SEGOL_YOD || "ê",
      SHUREQ: schema.SHUREQ || "û",
      HOLAM_VAV: schema.HOLAM_VAV || "ô",
      QAMATS_HE: schema.QAMATS_HE || "â",
      SEGOL_HE: schema.SEGOL_HE || "ê",
      TSERE_HE: schema.TSERE_HE || "ê",
      MS_SUFX: schema.MS_SUFX || "āyw",
      ALEF: schema.ALEF || "ʾ",
      BET: schema.BET || "b",
      BET_DAGESH: schema.BET_DAGESH || undefined,
      GIMEL: schema.GIMEL || "g",
      GIMEL_DAGESH: schema.GIMEL_DAGESH || undefined,
      DALET: schema.DALET || "d",
      DALET_DAGESH: schema.DALET_DAGESH || undefined,
      HE: schema.HE || "h",
      VAV: schema.VAV || "w",
      ZAYIN: schema.ZAYIN || "z",
      HET: schema.HET || "ḥ",
      TET: schema.TET || "ṭ",
      YOD: schema.YOD || "y",
      FINAL_KAF: schema.FINAL_KAF || "k",
      KAF: schema.KAF || "k",
      KAF_DAGESH: schema.KAF_DAGESH || undefined,
      LAMED: schema.LAMED || "l",
      FINAL_MEM: schema.FINAL_MEM || "m",
      MEM: schema.MEM || "m",
      FINAL_NUN: schema.FINAL_NUN || "n",
      NUN: schema.NUN || "n",
      SAMEKH: schema.SAMEKH || "s",
      AYIN: schema.AYIN || "ʿ",
      FINAL_PE: schema.FINAL_PE || "p",
      PE: schema.PE || "p",
      PE_DAGESH: schema.PE_DAGESH || undefined,
      FINAL_TSADI: schema.FINAL_TSADI || "ṣ",
      TSADI: schema.TSADI || "ṣ",
      QOF: schema.QOF || "q",
      RESH: schema.RESH || "r",
      SHIN: schema.SHIN || "š",
      SIN: schema.SIN || "ś",
      TAV: schema.TAV || "t",
      TAV_DAGESH: schema.TAV_DAGESH || undefined,
      DIVINE_NAME: schema.DIVINE_NAME || "yhwh",
      SYLLABLE_SEPARATOR: schema.SYLLABLE_SEPARATOR || undefined,
      ADDITIONAL_FEATURES: schema.ADDITIONAL_FEATURES || undefined,
      longVowels: schema.longVowels ?? true,
      qametsQatan: schema.qametsQatan ?? true,
      sqnmlvy: schema.sqnmlvy ?? true,
      wawShureq: schema.wawShureq ?? true,
      article: schema.article ?? true
    });
  }
}

export interface map {
  [k: string]: keyof Schema;
}
