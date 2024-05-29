import { sequence } from "./sequence";

interface RemoveOptions {
  // accents //
  /**
   * ◌֑
   */
  ETNAHTA?: boolean;
  /**
   * ◌֒
   */
  SEGOLTA?: boolean;
  /**
   * ◌֓
   */
  SHALSHELET?: boolean;
  /**
   * ◌֔
   */
  ZAQEF_QATAN?: boolean;
  /**
   * ◌֕
   */
  ZAQEF_GADOL?: boolean;
  /**
   * ◌֖
   */
  TIPEHA?: boolean;
  /**
   * ◌֗
   */
  REVIA?: boolean;
  /**
   * ◌֘
   */
  ZARQA?: boolean;
  /**
   * ◌֙
   */
  PASHTA?: boolean;
  /**
   * ◌֚
   */
  YETIV?: boolean;
  /**
   * ◌֛
   */
  TEVIR?: boolean;
  /**
   * ◌֜
   */
  GERESH?: boolean;
  /**
   * ◌֝
   */
  GERESH_MUQDAM?: boolean;
  /**
   * ◌֞
   */
  GERSHAYIM?: boolean;
  /**
   * ◌֟
   */
  QARNEY_PARA?: boolean;
  /**
   * ◌֠
   */
  TELISHA_GEDOLA?: boolean;
  /**
   * ◌֡
   */
  PAZER?: boolean;
  /**
   * ◌֢
   */
  ATNAH_HAFUKH?: boolean;
  /**
   * ◌֣
   */
  MUNAH?: boolean;
  /**
   * ◌֤
   */
  MAHAPAKH?: boolean;
  /**
   * ◌֥
   */
  MERKHA?: boolean;
  /**
   * ◌֦
   */
  MERKHA_KEFULA?: boolean;
  /**
   * ◌֧
   */
  DARGA?: boolean;
  /**
   * ◌֨
   */
  QADMA?: boolean;
  /**
   * ◌֩
   */
  TELISHA_QETANA?: boolean;
  /**
   * ◌֪
   */
  YERAH_BEN_YOMO?: boolean;
  /**
   * ◌֫
   */
  OLE?: boolean;
  /**
   * ◌֬
   */
  ILUY?: boolean;
  /**
   * ◌֭
   */
  DEHI?: boolean;
  /**
   * ◌֮
   */
  ZINOR?: boolean;
  // points //
  /**
   * ◌ְ
   */
  SHEVA?: boolean;
  /**
   * ◌ֱ
   */
  HATAF_SEGOL?: boolean;
  /**
   * ◌ֲ
   */
  HATAF_PATAH?: boolean;
  /**
   * ◌ֳ
   */
  HATAF_QAMATS?: boolean;
  /**
   * ◌ִ
   */
  HIRIQ?: boolean;
  /**
   * ◌ֵ
   */
  TSERE?: boolean;
  /**
   * ◌ֶ
   */
  SEGOL?: boolean;
  /**
   * ◌ַ
   */
  PATAH?: boolean;
  /**
   * ◌ָ
   */
  QAMATS?: boolean;
  /**
   * ◌ֹ
   */
  HOLAM?: boolean;
  /**
   * ◌ֻ
   */
  QUBUTS?: boolean;
  /**
   * ◌ּ
   */
  DAGESH?: boolean;
  /**
   * ◌ֽ
   */
  METEG?: boolean;
  /**
   * ◌ֿ
   */
  RAFE?: boolean;
  /**
   * ◌ׁ
   */
  SHIN_DOT?: boolean;
  /**
   * ◌ׂ
   */
  SIN_DOT?: boolean;
  /**
   * ◌ׇ
   */
  QAMATS_QATAN?: boolean;
  // punctuation //
  /**
   * ־◌
   *
   * @description
   * Unlike other characters, this is replaced with a space instead of being removed.
   */
  MAQAF?: boolean;
  /**
   * ׀ ◌
   */
  PASEQ?: boolean;
  /**
   * ׃◌
   */
  SOF_PASUQ?: boolean;
  /**
   * ׆
   */
  NUN_HAFUKHA?: boolean;
  /**
   * ׳
   */
  PUNC_GERESH?: boolean;
  /**
   * ״
   */
  PUNC_GERSHAYIM?: boolean;
  // marks //
  /**
   * ◌֯
   */
  MASORA_CIRCLE?: boolean;
  /**
   * ◌ׄ
   */
  UPPER_DOT?: boolean;
  /**
   * ◌ׅ
   */
  LOWER_DOT?: boolean;
}

type OptionKey = keyof RemoveOptions;

type map = { [k in keyof RemoveOptions]: string };

const removeMap: map = {
  // accents //
  ETNAHTA: "\u{0591}", // U+0591 HEBREW ACCENT ETNAHTA
  SEGOLTA: "\u{0592}", // U+0592 HEBREW ACCENT SEGOL
  SHALSHELET: "\u{0593}", // U+0593 HEBREW ACCENT SHALSHELET
  ZAQEF_QATAN: "\u{0594}", // U+0594 HEBREW ACCENT ZAQEF QATAN
  ZAQEF_GADOL: "\u{0595}", // U+0595 HEBREW ACCENT ZAQEF GADOL
  TIPEHA: "\u{0596}", // U+0596 HEBREW ACCENT TIPEHA
  REVIA: "\u{0597}", // U+0597 HEBREW ACCENT REVIA
  ZARQA: "\u{0598}", // U+0598 HEBREW ACCENT ZARQA
  PASHTA: "\u{0599}", // U+0599 HEBREW ACCENT PASHTA
  YETIV: "\u{059A}", // U+059A HEBREW ACCENT YETIV
  TEVIR: "\u{059B}", // U+059B HEBREW ACCENT TEVIR
  GERESH: "\u{059C}", // U+059C HEBREW ACCENT GERESH
  GERESH_MUQDAM: "\u{059D}", // U+059D HEBREW ACCENT GERESH MUQDAM
  GERSHAYIM: "\u{059E}", // U+059E HEBREW ACCENT GERSHAYIM
  QARNEY_PARA: "\u{059F}", // U+059F HEBREW ACCENT QARNEY PARA
  TELISHA_GEDOLA: "\u{05A0}", // U+05A0 HEBREW ACCENT TELISHA GEDOLA
  PAZER: "\u{05A1}", // U+05A1 HEBREW ACCENT PAZER
  ATNAH_HAFUKH: "\u{05A2}", // U+05A2 HEBREW ACCENT ATNAH HAFUKH
  MUNAH: "\u{05A3}", // U+05A3 HEBREW ACCENT MUNAH
  MAHAPAKH: "\u{05A4}", // U+05A4 HEBREW ACCENT MAHAPAKH
  MERKHA: "\u{05A5}", // U+05A5 HEBREW ACCENT MERKHA
  MERKHA_KEFULA: "\u{05A6}", // U+05A6 HEBREW ACCENT MERKHA KEFULA
  DARGA: "\u{05A7}", // U+05A7 HEBREW ACCENT DARGA
  QADMA: "\u{05A8}", // U+05A8 HEBREW ACCENT QADMA
  TELISHA_QETANA: "\u{05A9}", // U+05A9 HEBREW ACCENT TELISHA QETANA
  YERAH_BEN_YOMO: "\u{05AA}", // U+05AA HEBREW ACCENT YERAH BEN YOMO
  OLE: "\u{05AB}", // U+05AB HEBREW ACCENT OLE
  ILUY: "\u{05AC}", // U+05AC HEBREW ACCENT ILUY
  DEHI: "\u{05AD}", // U+05AD HEBREW ACCENT DEHI
  ZINOR: "\u{05AE}", // U+05AE HEBREW ACCENT ZINOR
  // points //
  SHEVA: "\u{05B0}", // HEBREW POINT SHEVA
  HATAF_SEGOL: "\u{05B1}", // HEBREW POINT HATAF SEGOL
  HATAF_PATAH: "\u{05B2}", // HEBREW POINT HATAF PATAH
  HATAF_QAMATS: "\u{05B3}", // HEBREW POINT HATAF QAMATS
  HIRIQ: "\u{05B4}", // HEBREW POINT HIRIQ
  TSERE: "\u{05B5}", // HEBREW POINT TSERE
  SEGOL: "\u{05B6}", // HEBREW POINT SEGOL
  PATAH: "\u{05B7}", // HEBREW POINT PATAH
  QAMATS: "\u{05B8}", // HEBREW POINT QAMATS
  HOLAM: "\u{05B9}", // HEBREW POINT HOLAM
  // below is not needed because sequnce() does not output this
  // HOLAM_HASER_FOR_VAV: "\u{05BA}", // HEBREW POINT HOLAM HASER FOR VAV
  QUBUTS: "\u{05BB}", // HEBREW POINT QUBUTS
  DAGESH: "\u{05BC}", // HEBREW POINT DAGESH OR MAPIQ
  METEG: "\u{05BD}", // HEBREW POINT METEG
  RAFE: "\u{05BF}", // HEBREW POINT RAFE
  SHIN_DOT: "\u{05C1}", // HEBREW POINT SHIN DOT
  SIN_DOT: "\u{05C2}", // HEBREW POINT SIN DOT
  QAMATS_QATAN: "\u{05C7}", // HEBREW POINT QAMATS QATAN
  MAQAF: "\u{05BE}", // HEBREW PUNCTUATION MAQAF
  PASEQ: "\u{05C0}", // HEBREW PUNCTUATION PASEQ
  SOF_PASUQ: "\u{05C3}", // HEBREW PUNCTUATION SOF_PASUQ
  NUN_HAFUKHA: "\u{05C6}", // HEBREW PUNCTUATION NUN_HAFUKHA
  // the punctuation geresh/gereshayim is different then the accent ones
  PUNC_GERESH: "\u{05F3}", // HEBREW PUNCTUATION GERESH
  PUNC_GERSHAYIM: "\u{05F4}", // HEBREW PUNCTUATION GERSHAYIM
  MASORA_CIRCLE: "\u{05AF}", // U+MASORA CIRCLE HEBREW MARK 05AF,
  UPPER_DOT: "\u{05C4}", // U+UPPER DOT HEBREW MARK 05C4,
  LOWER_DOT: "\u{05C5}" // U+LOWER DOT HEBREW MARK 05C5];
};

/**
 * removes all chars called HEBREW ACCENT (U+0591-05AF)
 */
export const accents: RemoveOptions = {
  ETNAHTA: true,
  SEGOLTA: true,
  SHALSHELET: true,
  ZAQEF_QATAN: true,
  ZAQEF_GADOL: true,
  TIPEHA: true,
  REVIA: true,
  ZARQA: true,
  PASHTA: true,
  YETIV: true,
  TEVIR: true,
  GERESH: true,
  GERESH_MUQDAM: true,
  GERSHAYIM: true,
  QARNEY_PARA: true,
  TELISHA_GEDOLA: true,
  PAZER: true,
  ATNAH_HAFUKH: true,
  MUNAH: true,
  MAHAPAKH: true,
  MERKHA: true,
  MERKHA_KEFULA: true,
  DARGA: true,
  QADMA: true,
  TELISHA_QETANA: true,
  YERAH_BEN_YOMO: true,
  OLE: true,
  ILUY: true,
  DEHI: true,
  ZINOR: true
};

/**
 * removes all chars called HEBREW POINT (U+05B0-05BD, U+05BF, U+05C1-05C2 and U+05C7)
 */
export const points: RemoveOptions = {
  SHEVA: true,
  HATAF_SEGOL: true,
  HATAF_PATAH: true,
  HATAF_QAMATS: true,
  HIRIQ: true,
  TSERE: true,
  SEGOL: true,
  PATAH: true,
  QAMATS: true,
  HOLAM: true,
  QUBUTS: true,
  DAGESH: true,
  SHIN_DOT: true,
  SIN_DOT: true,
  METEG: true,
  RAFE: true,
  QAMATS_QATAN: true
};

/**
 * removes chars called HEBREW POINT (U+05B0-05BC and U+05C7) except for:
 * - SHIN_DOT
 * - SIN_DOT
 * - METEG
 * - RAFE
 */
export const vowels: RemoveOptions = {
  SHEVA: true,
  HATAF_SEGOL: true,
  HATAF_PATAH: true,
  HATAF_QAMATS: true,
  HIRIQ: true,
  TSERE: true,
  SEGOL: true,
  PATAH: true,
  QAMATS: true,
  HOLAM: true,
  QUBUTS: true,
  DAGESH: true,
  QAMATS_QATAN: true
};

/**
 * removes all chars called HEBREW PUNCTUATION (U+05BE, U+05C0, U+05C3, and U+05C6)
 */
export const punctuation: RemoveOptions = {
  MAQAF: true,
  PASEQ: true,
  SOF_PASUQ: true,
  NUN_HAFUKHA: true,
  PUNC_GERESH: true,
  PUNC_GERSHAYIM: true
};

/**
 * removes all chars called HEBREW MARK (U+05AF, U+05C4, and U+05C5)
 */
export const marks: RemoveOptions = {
  MASORA_CIRCLE: true,
  UPPER_DOT: true,
  LOWER_DOT: true
};

export const all: RemoveOptions = {
  ...accents,
  ...points,
  ...punctuation,
  ...marks
};

/**
 * removes niqqud from Hebrew text
 *
 * @param text - a string of Hebrew characters
 * @param options
 * @returns Hebrew characters with accents and niqqud optionally removed
 *
 * @example Default
 *
 * ```ts
 * // by default removes all accents and metheg and rafe
 * remove("שָׂרַ֣י אִשְׁתְּךָ֔, וַֽיִּמְצְא֗וּ");
 * // שָׂרַי אִשְׁתְּךָ, וַיִּמְצְאוּ
 * ```
 *
 * @example Remove accents and vowels, but not shin/sin dots
 *
 * ```ts
 * import { accents, vowelsl } from "hebrew-transliteration/removeOptions";
 *
 * remove("שָׂרַ֣י אִשְׁתְּךָ֔, וַֽיִּמְצְא֗וּ", { ...accents, ...vowels, METEG: true });
 * // שׂרי אשׁתך, וימצאו
 * ```
 *
 * @example Remove all
 *
 * ```ts
 * import { all } from "hebrew-transliteration/removeOptions";
 *
 * remove("שָׂרַ֣י אִשְׁתְּךָ֔, וַֽיִּמְצְא֗וּ", all);
 * // שרי אשתך, וימצאו
 * ```
 */
export const remove = (text: string, options: RemoveOptions = { ...accents, METEG: true, RAFE: true }): string => {
  /** all the keys of options that are to be removed */
  const keys = Object.keys(options).filter((k) => (k in options ? options[k as OptionKey] : false));
  const sequenced = sequence(text);
  return keys.reduce((a, c) => {
    const key = removeMap[c as OptionKey] ?? null;
    if (key) {
      // if it is a MAQAF, replace it with a space
      const replacement = key === "\u{05BE}" ? " " : "";
      return a.replace(new RegExp(key, "gu"), replacement);
    }
    return a;
  }, sequenced);
};
