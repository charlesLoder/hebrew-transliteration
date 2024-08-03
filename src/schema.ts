import { Cluster } from "havarotjs/cluster";
import { Syllable } from "havarotjs/syllable";
import { SylOpts } from "havarotjs/text";
import { NameToCharMap } from "havarotjs/utils/vowelMap";
import { Word } from "havarotjs/word";

// export for documentation
export type { SylOpts };

export interface HebrewFeature {
  /**
   * The Hebrew text — use consonants and vowels; do not use taamim
   *
   * @remarks
   * The text is parsed as a Regex so special characters like `?` and `|` can be used
   *
   */
  HEBREW: string | RegExp;
}

export interface PassThrough {
  /**
   * If `true` passes the characters of the result of the `TRANSLITERATION` callback to the be mapped to the schema.
   * If `TRANSLITERATION` is a string, this does nothing.
   *
   * @default
   * true
   *
   * @example
   * ```js
   * // with PASS_THROUGH true or undefined; the rest of the characters are passed through
   * // to regular mapping on the schema
   * heb.transliterate("בְּרֵאשִׁ֖ית", {
   *   ADDITIONAL_FEATURES: [{
   *     HEBREW: "(?<![\u{05B1}-\u{05BB}\u{05C7}].*)\u{05B0}",
   *     FEATURE: "syllable",
   *     PASS_THROUGH: true,
   *     TRANSLITERATION: function (syllable, _hebrew, schema) {
   *       const next = syllable.next;
   *       const nextVowel = next.vowelName === "SHEVA" ? "VOCAL_SHEVA" : next.vowelName
   *
   *       if (next && nextVowel) {
   *         const vowel = schema[nextVowel] || "";
   *         return syllable.text.replacenew RegExp("\u{05B0}", "u"; vowel);
   *       }
   *
   *       return syllable.text;
   *     }
   *   }]
   * });
   * ```
   *
   * @example
   * ```js
   * // with PASS_THROUGH false, a custom mapping needs to be implemented,
   * // or Hebrew characters are returned for the rest of the `FEATURE`
   * heb.transliterate("בְּרֵאשִׁ֖ית", {
   *   ADDITIONAL_FEATURES: [{
   *     HEBREW: "(?<![\u{05B1}-\u{05BB}\u{05C7}].*)\u{05B0}",
   *     FEATURE: "syllable",
   *     PASS_THROUGH: false,
   *     TRANSLITERATION: function (syllable, _hebrew, schema) {
   *       const next = syllable.next;
   *       const nextVowel = next.vowelName === "SHEVA" ? "VOCAL_SHEVA" : next.vowelName
   *
   *       if (next && nextVowel) {
   *         const vowel = schema[nextVowel] || "";
   *         return syllable.text.replacenew RegExp("\u{05B0}", "u"; vowel);
   *       }
   *
   *       return syllable.text;
   *     }
   *   }]
   * });
   * // בּērēʾšît
   * ```
   *
   * @remarks
   * This is generally most useful when the callback does not transliterate the entire `FEATURE`
   */
  PASS_THROUGH?: boolean;
}

/**
 * @param word the `Word` object that matches the `HEBREW` property
 * @param hebrew the `HEBREW` property
 * @param schema the `Schema` being used
 */
export type WordCallback = (word: Word, hebrew: string | RegExp, schema: Schema) => string;

export interface WordFeature extends HebrewFeature, PassThrough {
  /**
   * Additional orthographic feature.
   *
   * - `"cluster"` is any combination of a single character and optionally a _dagesh_ and vowel.
   * - `"syllable"` is any combination of a multiple characters and a single vowel and optionally a _dagesh_
   * - `"word"` covers everything else
   */
  FEATURE: "word";
  /**
   * a string or callback. The callback takes three par
   *
   * Using a string
   * @example
   *
   * ```js
   * transliterate("וְאֵ֥ת הָאָֽרֶץ", {
   *  ADDITIONAL_FEATURES: [{
   *    FEATURE: "word",
   *    HEBREW: "הָאָרֶץ",
   *    TRANSLITERATION: "The Earth"
   *  }]
   * });
   *
   * // wǝʾēt The Earth
   * ```
   *
   * Using a callback
   * @example
   *
   * ```js
   * transliterate(heb, {
   *  ADDITIONAL_FEATURES: [{
   *    HEBREW: "שְׁתַּיִם",
   *    FEATURE: "word",
   *    TRANSLITERATION: function (_word, _hebrew, schema) {
   *      return (
   *        schema["SHIN"] +
   *       (schema["TAV_DAGESH"] ?? schema["TAV"]) +
   *        schema["PATAH"] +
   *        schema["YOD"] +
   *        schema["HIRIQ"] +
   *        schema["FINAL_MEM"]
   *      );
   *    }
   *  }]
   * });
   *
   * // štayim
   * ```
   */
  TRANSLITERATION: string | WordCallback;
}

/**
 * @param syllable the `Syllable` object that matches the `HEBREW` property
 * @param hebrew the `HEBREW` property
 * @param schema the `Schema` being used
 */
export type SyllableCallback = (syllable: Syllable, hebrew: string | RegExp, schema: Schema) => string;

export interface SyllableFeature extends HebrewFeature, PassThrough {
  /**
   * Additional orthographic feature:
   *
   * - `"cluster"` is any combination of a single character and optionally a _dagesh_ and vowel.
   * - `"syllable"` is any combination of a multiple characters and a single vowel and optionally a _dagesh_
   * - `"word"` covers everything else
   */
  FEATURE: "syllable";
  /**
   * A string or callback to customize output
   *
   * @example
   * Using a string
   * ```js
   * transliterate("מְחִיּיָאֵ֗ל", {
   *  ADDITIONAL_FEATURES: [{
   *    FEATURE: "syllable",
   *    HEBREW: /יּ(?![\u{05B4}-\u{05BB}])/u, // a yod with a dagesh, not followed by a vowel character
   *    TRANSLITERATION: "Y"
   *  }]
   * });
   *
   * mǝḥiYyāʾēl
   * ```
   *
   * @example
   * Using a callback
   * ```js
   * transliterate("נָעֳמִי֙", {
   *  ADDITIONAL_FEATURES: [{
   *    FEATURE: "syllable",
   *    HEBREW: /\u{05C7}/u,
   *    TRANSLITERATION: (syllable) => {
   *      // If the syllable contains a qamets qatan character (U+05C7), check the text of the next syllable
   *      const next = syllable?.next?.value?.text;
   *
   *      // If the next syllable includes a hateph qamets, then replace the qamets qatan with a regular qamets
   *      if (next && next.includes("\u05B3")) {
   *        return syllable.text.replace("\u{05C7}", "\u{05B8}");
   *      }
   *      return syllable.text;
   *    }
   *  }]
   * });
   *
   * // nāʿŏmî
   * ```
   */
  TRANSLITERATION: string | SyllableCallback;
}

/**
 * @param cluster the `Cluster` object that matches the `HEBREW` property
 * @param hebrew the `HEBREW` property
 * @param schema the `Schema` being used
 */
export type ClusterCallback = (cluster: Cluster, hebrew: string | RegExp, schema: Schema) => string;

export interface ClusterFeature extends HebrewFeature, PassThrough {
  /**
   * Additional orthographic feature.
   *
   * - `"cluster"` is any combination of a single character and optionally a _dagesh_ and vowel.
   * - `"syllable"` is any combination of a multiple characters and a single vowel and optionally a _dagesh_
   * - `"word"` covers everything else
   */
  FEATURE: "cluster";
  /**
   * A string or callback to customize the output
   *
   * @example
   * Using a string
   * ```js
   * transliterate("הַזֹּאת", {
   *   ADDITIONAL_FEATURES: [{
   *     FEATURE: "cluster",
   *     HEBREW: "זּ",
   *     TRANSLITERATION: "tz"
   *   }]
   * });
   *
   * // hatzōʾt
   * ```
   *
   * @example
   * Using a callback
   * ```js
   * transliterate("וַתֵּ֨שֶׁב", {
   *   TAV_DAGESH: "tʰ",,
   *   ADDITIONAL_FEATURES: [{
   *     FEATURE: 'cluster',
   *     HEBREW: /תּ(?!\u{05B0})/u,
   *     TRANSLITERATION: (cluster, _, schema) => {
   *       // if there is a dagesh, but it is the beginning of the word
   *       // we can return the text, as the character w/ the dagesh will not be doubled
   *       if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
   *         return cluster.text;
   *       }
   *
   *       // if there is a dagesh, it may be that it is a dagesh qal (i.e. lene)
   *       // if it is a dagesh lene, then like the beginning of the word,
   *       // the character w/ the dagesh will not be doubled
   *       const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
   *       if (!prevCoda?.includes("ת",)) {
   *         return cluster.text;
   *       }
   *
   *       // because the *_DAGESH value is a digraph, we need to replace the first character
   *       // or it will be doubled in rules.ts as "tʰtʰ"
   *       const noAspiration = schema['TAV_DAGESH']?.replace("ʰ",, '') ?? '';
   *       return cluster.text.replace("תּ",,`${noAspiration + schema['TAV_DAGESH']}`);
   *     },
   *   }]
   * });
   *
   * // wattʰēšeb
   * ```
   */
  TRANSLITERATION: string | ClusterCallback;
}

type SchemaVowels = Record<keyof NameToCharMap, string>;

/**
 * @categoryDescription Consonants
 * Hebrew characters being used as consonants
 *
 * @categoryDescription Vowels
 * Hebrew characters being used as vowels, including the vocal sheva and ligatures
 *
 * @categoryDescription Taamim
 * Hebrew characters that that are used as taamim (i.e. accents)
 *
 * @categoryDescription Marks
 * Hebrew characters that are not consonants, vowels, or taamim, serving some other purpose, such as the dagesh or the paseq
 *
 * @categoryDescription Orthographic Features
 * Multiple Hebrew characters that form a semantic group, like the 3MS Suffix or a consonant with a dagesh
 *
 * @categoryDescription Syllabification
 * Options from havarotjs for syllabifying words
 */

/**
 * Class for defining a schema for transliteration.
 *
 * @remarks
 * Examples are truncated for brevity.
 */
export class Schema implements SylOpts, SchemaVowels {
  /**
   * HEBREW POINT SHEVA (U+05B0) ְ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   VOCAL_SHEVA: "ǝ",
   * });
   * transliterate("סְלִ֣ק", schema);
   * // sǝliq
   * ```
   */
  VOCAL_SHEVA: string;
  /**
   * HEBREW POINT HATAF SEGOL (U+05B1) ֱ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HATAF_SEGOL: "ĕ",
   * });
   * transliterate("אֱלֹהִ֑ים", schema);
   * // ʾĕlōhîm
   * ```
   */
  HATAF_SEGOL: string;
  /**
   * HEBREW POINT HATAF PATAH (U+05B2) ֲ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HATAF_PATAH: "ă",
   * });
   * transliterate("נַֽעֲשֶׂ֥ה", schema);
   * // naʿăśê
   * ```
   */
  HATAF_PATAH: string;
  /**
   * HEBREW POINT HATAF QAMATS (U+05B3) ֳ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HATAF_QAMATS: "ŏ",
   * });
   * transliterate("אֳרָנִים", schema);
   * // ʾŏrānîm
   * ```
   */
  HATAF_QAMATS: string;
  /**
   * HEBREW POINT HIRIQ (U+05B4) ִ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HIRIQ: "i",
   * });
   * transliterate("הִנֵּה֩", schema);
   * // hinnê
   * ```
   */
  HIRIQ: string;
  /**
   * HEBREW POINT TSERE (U+05B5) ֵ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TSERE: "ē",
   * });
   * transliterate("אֵשׁ", schema);
   * // ʾēš
   * ```
   */
  TSERE: string;
  /**
   * HEBREW POINT SEGOL (U+05B6) ֶ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SEGOL: "e",
   * });
   * transliterate("אֶל", schema);
   * // ʾel
   * ```
   */
  SEGOL: string;
  /**
   * HEBREW POINT PATAH (U+05B7) ַ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   PATAH: "a",
   * });
   * transliterate("נַ֗עַר", schema);
   * // naʿar
   * ```
   */
  PATAH: string;
  /**
   * HEBREW POINT QAMATS (U+05B8) ָ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   QAMATS: "ā",
   * });
   * transliterate("דָבָר֙", schema);
   * // dābār
   * ```
   */
  QAMATS: string;
  /**
   * HEBREW POINT HOLAM (U+05B9) ֹ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HOLAM: "ō",
   * });
   * transliterate("לֹא", schema);
   * // lōʾ
   * ```
   */
  HOLAM: string;
  /**
   * HEBREW POINT HOLAM HASER FOR VAV (U+05BA) ֹ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HOLAM_HASER: "ō",
   * });
   * transliterate("עָוֺן֙", schema);
   * // ʿāwōn
   * ```
   *
   * @remarks
   * See {@link holemHaser} for more about this character
   */
  HOLAM_HASER: string;
  /**
   * HEBREW POINT QUBUTS (U+05BB) ֻ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   QUBUTS: "u",
   * });
   * transliterate("קֻ֣ם", schema);
   * // qūm
   * ```
   */
  QUBUTS: string;
  /**
   * HEBREW POINT DAGESH OR MAPIQ (U+05BC) ּ◌
   *
   * @category Marks
   *
   * @example
   * A blank string
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DAGESH: "",
   * });
   * transliterate("כֵּ֑ן", schema);
   * // kēn
   * ```
   *
   * @example
   * A character
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DAGESH: ".",
   * });
   * transliterate("כֵּ֑ן", schema);
   * // k.ēn
   * ```
   *
   * @remarks
   * Typically, this should be a blank string.
   */
  DAGESH: string;
  /**
   * HEBREW POINT DAGESH OR MAPIQ (U+05BC) ּ◌
   *
   * A string or boolean, and if set to `true`, the consonant with the dagesh is repeated.
   *
   * @category Marks
   * @category Orthographic Features
   *
   * @example
   * As a string
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DAGESH_CHAZAQ: "\u0301",
   * });
   * transliterate("שַׁבָּת", schema);
   * // šab́āt
   * ```
   *
   * @example
   * As a boolean
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DAGESH_CHAZAQ: true,
   * });
   * transliterate("שַׁבָּת", schema);
   * // šabbāt
   * ```
   */
  DAGESH_CHAZAQ: boolean | string;
  /**
   * HEBREW PUNCTUATION MAQAF (U+05BE) ־◌
   *
   * @category Marks
   * @category Taamim
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   { MAQAF: "-" }
   * });
   * transliterate("אַל־", schema);
   * // ʾal-
   * ```
   */
  MAQAF: string;
  /**
   * HEBREW PUNCTUATION PASEQ (U+05C0) ׀ ◌
   *
   * @category Marks
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   PASEQ: "",
   })
   * transliterate("כְּשֶׁ֣בֶת ׀ הַמֶּ֣לֶךְ", schema);
   * // kǝšebet  hammelek
   * ```
   *
   * @remarks
   * If a blank string, two spaces will occur between words; see example.
   */
  PASEQ: string;
  /**
   * HEBREW PUNCTUATION SOF PASUQ (U+05C3) ׃◌
   *
   * @category Marks
   * @category Taamim
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SOF_PASUQ: ".",
   * });
   * transliterate("הָאָֽרֶץ׃", schema);
   * // hāʾāreṣ.
   * ```
   */
  SOF_PASUQ: string;
  /**
   * HEBREW POINT QAMATS QATAN (U+05C7) ׇ◌
   *
   * @category Vowels
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   QAMATS QATAN: "o",
   * });
   * transliterate("כָּל־הָעָ֖ם", schema);
   * // kol-hāʿām
   * ```
   *
   * @remarks
   * See {@link qametsQatan} for details about this character.
   */
  QAMATS_QATAN: string;
  /**
   * HEBREW POINT PATAH (U+05B7) ◌ַ  as a furtive patah
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   FURTIVE_PATAH: "a",
   * });
   * transliterate("נֹ֖חַ", schema);
   * // nōaḥ
   * ```
   */
  FURTIVE_PATAH: string;
  /**
   * HEBREW POINT HIRIQ (U+05B4) and YOD (U+05D9) י◌ִ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HIRIQ_YOD: "î",
   * });
   * transliterate("עִ֔יר", schema);
   * // ʿîr
   * ```
   */
  HIRIQ_YOD: string;
  /**
   * HEBREW POINT TSERE (U+05B5) and YOD (U+05D9) י◌ֵ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TSERE_YOD: "ê",
   * });
   * transliterate("אֵ֤ין", schema);
   * // ʾên
   * ```
   */
  TSERE_YOD: string;
  /**
   * HEBREW POINT SEGOL (U+05B6) and YOD (U+05D9) י◌ֶ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SEGOL_YOD: "ê",
   * });
   * transliterate("אֱלֹהֶ֑יךָ", schema);
   * // ʾĕlōhêkā
   * ```
   */
  SEGOL_YOD: string;
  /**
   * HEBREW LETTER VAV (U+05D5) and DAGESH (U+05BC) וּ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SHUREQ: "û",
   * });
   * transliterate("קוּם", schema);
   * // qûm
   * ```
   */
  SHUREQ: string;
  /**
   * HEBREW LETTER HOLAM (U+05B9) and VAV (U+05D5) ֹו◌
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HOLAM_VAV: "ô",
   * });
   * transliterate("ס֣וֹא", schema);
   * // sôʾ
   * ```
   */
  HOLAM_VAV: string;
  /**
   * HEBREW POINT QAMATS (U+05B8) and HE (U+05D4) ה◌ָ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   QAMATS_HE: "â",
   * });
   * transliterate("עֵצָ֖ה", schema);
   * // ʿēṣâ
   * ```
   */
  QAMATS_HE: string;
  /**
   * HEBREW POINT SEGOL (U+05B6) and HE (U+05D4) ה◌ֶ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SEGOL_HE: "ê",
   * });
   * transliterate("יִקְרֶ֥ה", schema);
   * // yiqrê
   * ```
   */
  SEGOL_HE: string;
  /**
   * HEBREW POINT TSERE (U+05B5) and HE (U+05D4) ה◌ֵ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TSERE_HE: "ê",
   * });
   * transliterate("הָאַרְיֵ֔ה", schema);
   * // hāʾaryê
   * ```
   */
  TSERE_HE: string;
  /**
   * HEBREW LETTER QAMATS (U+05B8) and YOD (U+05D9) and VAV (U+05D5) יו◌ָ
   *
   * @category Vowels
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   MS_SUFX: ”āyw”,
   * });
   * transliterate("יָדָ֛יו", schema);
   * // yādāyw
   * ```
   */
  MS_SUFX: string;
  /**
   * HEBREW LETTER ALEF (U+05D0) א
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   ALEF: "ʾ",
   * });
   * transliterate("אָב", schema);
   * // ʾāb
   * ```
   */
  ALEF: string;
  /**
   * HEBREW LETTER BET (U+05D1) ב
   *
   * @category Consonants
   *
   * @example
   *  ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   BET: "b",
   * });
   * transliterate("בְּבֵית", schema);
   * // bǝbêt
   * ```
   */
  BET: string;
  /**
   * HEBREW LETTER BET (U+05D1) and DAGESH (U+05BC) ּב
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * With only `BET` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   BET: "b",
   * });
   * transliterate("בְּבֵית", schema);
   * // bǝbêt
   *```
   *
   * @example
   * With `BET` and `BET_DAGESH` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   BET: "v",
   *   BET_DAGESH: "b",
   * });
   * transliterate("בְּבֵית", schema);
   * // bǝvêt
   * ```
   *
   * @remarks
   * The letter bet with a dagesh kal.
   * Use when need to distinguish between spirantized forms
   */
  BET_DAGESH?: string;
  /**
   * HEBREW LETTER GIMEL (U+05D2) ג
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   GIMEL: "g",
   * });
   * transliterate("גַּ֣גּ", schema);
   * // gag
   * ```
   */
  GIMEL: string;
  /**
   * HEBREW LETTER GIMEL (U+05D2) and DAGESH (U+05BC) גּ
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * With only `GIMEL` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   GIMEL: "g"
   * });
   * transliterate("גַּ֣ג", schema);
   * // gag
   * ```
   *
   * @example
   * With `GIMEL` and `GIMEL_DAGESH` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   GIMEL: "gh",
   *   GIMEL_DAGESH: "g",
   * });
   * transliterate("גַּ֣ג", schema);
   * // gagh
   * ```
   *
   * @remarks
   * The letter gimel with a dagesh kal.
   * Use when need to distinguish between spirantized forms
   */
  GIMEL_DAGESH?: string;
  /**
   * HEBREW LETTER DALET (U+05D3) ד
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DALET: "d",
   * });
   * transliterate("דֹּ֣ד", schema);
   * // dōd
   * ```
   */
  DALET: string;
  /**
   * HEBREW LETTER DALET (U+05D3) and DAGESH (U+05BC) דּ
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * With only `DALET` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DALET: "d",
   * });
   * transliterate("דֹּ֣ד", schema);
   * // dōd
   * ```
   *
   * @example
   * With `DALET` and `DALET_DAGESH` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DALET: "dh",
   *   DALET_DAGESH: "d",
   * });
   * transliterate("דֹּ֣ד", schema);
   * // dōdh
   * ```
   *
   * @remarks
   * The letter dalet with a dagesh kal.
   * Ue when need to distinguish between spirantized forms
   */
  DALET_DAGESH?: string;
  /**
   * HEBREW LETTER HE (U+05D4) ה
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HE: "h",
   * });
   * transliterate("הֵ֗ם", schema);
   * // hēm
   * ```
   */
  HE: string;
  /**
   * HEBREW LETTER VAV (U+05D5) ו
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   VAV: "w",
   * });
   * transliterate("וָוִ֖ים", schema);
   * // wāwîm
   * ```
   */
  VAV: string;
  /**
   * HEBREW LETTER ZAYIN (U+05D6) ז
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   ZAYIN: "z",
   * });
   * transliterate("זֵ֣ד", schema);
   * // zēd
   * ```
   */
  ZAYIN: string;
  /**
   * HEBREW LETTER HET (U+05D7) ח
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   HET: "ḥ"
   * });
   * transliterate("חַ֣ג", schema);
   * // ḥag
   * ```
   */
  HET: string;
  /**
   * HEBREW LETTER TET (U+05D8) ט
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TET: "ṭ",
   * });
   * transliterate("טִֽיט", schema);
   * // ṭîṭ
   * ```
   */
  TET: string;
  /**
   * HEBREW LETTER YOD (U+05D9) י
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   YOD: "y",
   * });
   * transliterate("יָ֗ד", schema);
   * // yād
   * ```
   */
  YOD: string;
  /**
   * HEBREW LETTER FINAL KAF (U+05DA) ך
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   FINAL KAF: "k",
   * });
   * transliterate("לֶךְ", schema);
   * // lek
   * ```
   */
  FINAL_KAF: string;
  /**
   * HEBREW LETTER KAF (U+05DB) כ
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   KAF: "k",
   * });
   * transliterate("כָּ֚כָה", schema);
   * // kākâ
   * ```
   */
  KAF: string;
  /**
   * HEBREW LETTER KAF (U+05DB) and DAGESH (U+05BC) כּ
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * With only `KAF` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   KAF: "k",
   * });
   * transliterate("כָּ֚כָה", schema);
   * // kākâ
   * ```
   *
   * @example
   * With `KAF` set and `KAF_DAGESH` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   KAF: "kh",
   *   KAF_DAGESH: "k",
   * });
   * transliterate("כָּ֚כָה", schema);
   * // kākhâ
   * ```
   *
   * @remarks
   * The letter kaf with a dagesh kal.
   * Use when need to distinguish between spirantized forms
   */
  KAF_DAGESH?: string;
  /**
   * HEBREW LETTER LAMED (U+05DC) ל
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   LAMED: "l",
   * });
   * transliterate("עַל", schema);
   * // ʿal
   * ```
   */
  LAMED: string;
  /**
   * HEBREW LETTER FINAL MEM (U+05DD) ם
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   FINAL MEM: "m",
   * });
   * transliterate("מַ֖יִם", schema);
   * // mayim
   * ```
   */
  FINAL_MEM: string;
  /**
   * HEBREW LETTER MEM (U+05DE) מ
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   MEM: "m",
   * });
   * transliterate("מַ֖יִם", schema);
   * // mayim
   * ```
   */
  MEM: string;
  /**
   * HEBREW LETTER FINAL NUN (U+05DF) ן
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   FINAL NUN: "n",
   * });
   * transliterate("נ֔וּן", schema);
   * // nûn
   * ```
   */
  FINAL_NUN: string;
  /**
   * HEBREW LETTER NUN (U+05E0) נ
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   NUN: "n",
   * });
   * transliterate("נ֔וּן", schema);
   * // nûn
   * ```
   */
  NUN: string;
  /**
   * HEBREW LETTER SAMEKH (U+05E1) ס
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SAMEKH: "s",
   * });
   * transliterate("ס֥וּס", schema);
   * // sûs
   * ```
   */
  SAMEKH: string;
  /**
   * HEBREW LETTER AYIN (U+05E2) ע
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   AYIN: "ʿ",
   * });
   * transliterate("עָ֑יִן", schema);
   * // ʿāyin
   * ```
   */
  AYIN: string;
  /**
   * HEBREW LETTER FINAL PE (U+05E3) ף
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   FINAL PE: "p",
   * });
   * transliterate("כַּ֣ף", schema);
   * // kap
   * ```
   */
  FINAL_PE: string;
  /**
   * HEBREW LETTER PE (U+05E4) פ
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   PE: "p",
   * });
   * transliterate("פֶּ֣רֶא חָפְשִׁ֑י", schema);
   * // pereʾ ḥopšî
   * ```
   */
  PE: string;
  /**
   * HEBREW LETTER  PE (U+05E4) and DAGESH (U+05BC) פּ
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * With only `PE` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   PE_DAGESH: "p",
   * });
   * transliterate("פֶּ֣רֶא חָפְשִׁ֑י", schema);
   * // pereʾ ḥopšî
   * ```
   *
   * @example
   * With `PE` and `PE_DAGESH` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   PE: "f",
   *   PE_DAGESH: "p",
   * });
   * transliterate("פֶּ֣רֶא חָפְשִׁ֑י", schema);
   * // pereʾ ḥofšî
   * ```
   *
   * @remarks
   * The letter pe with a dagesh kal
   * Use when need to distinguish between spirantized forms
   */
  PE_DAGESH?: string;
  /**
   * HEBREW LETTER FINAL TSADI (U+05E5) ץ
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   FINAL TSADI: "ṣ",
   * });
   * transliterate("צָ֚ץ", schema);
   * // ṣāṣ
   * ```
   */
  FINAL_TSADI: string;
  /**
   * HEBREW LETTER TSADI (U+05E6) צ
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TSADI: "ṣ",
   * });
   * transliterate("צָ֚ץ", schema);
   * // ṣāṣ
   * ```
   */
  TSADI: string;
  /**
   * HEBREW LETTER QOF (U+05E7) ק
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   QOF: "q",
   * });
   * transliterate("רַ֥ק", schema);
   * // raq
   * ```
   */
  QOF: string;
  /**
   * HEBREW LETTER RESH (U+05E8) ר
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   RESH: "r",
   * });
   * transliterate("רַ֥ק", schema);
   * // raq
   * ```
   */
  RESH: string;
  /**
   * HEBREW LETTER SHIN (U+05E9) and SHIN DOT (U+05C1) שׁ
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SHIN: "š",
   * });
   * transliterate("שֵׁ֖ן", schema);
   * // šēn
   * ```
   */
  SHIN: string;
  /**
   * HEBREW LETTER SHIN (U+05E9) and SIN DOT (U+05C2) שׁ
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SIN: "ś",
   * });
   * transliterate("כַּשְׂדִּ֔ים", schema);
   * // kaśdîm
   * ```
   */
  SIN: string;
  /**
   * HEBREW LETTER TAV (U+05EA) ת
   *
   * @category Consonants
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TAV: "t",
   * });
   * transliterate("תֵּ֛ת", schema);
   * // tēt
   * ```
   */
  TAV: string;
  /**
   * HEBREW LETTER TAV (U+05EA) and DAGESH (U+05BC) תּ
   *
   * @category Consonants
   * @category Orthographic Features
   *
   * @example
   * With only `TAV` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TAV: "t",
   * });
   * transliterate("תֵּ֛ת", schema);
   * // tēt
   * ```
   *
   * @example
   * With `TAV` and `TAV_DAGESH` set
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TAV: "th",
   *   TAV_DAGESH: "t",
   * });
   * transliterate("תֵּ֛ת", schema);
   * // tēth
   * ```
   *
   * @remarks
   * The letter tav with a dagesh kal.
   * Use when need to distinguish between spirantized forms
   */
  TAV_DAGESH?: string;
  /**
   * Rules for customized output
   *
   * This property is an array of objects with the following properties each:
   * - `FEATURE`: the type of feature that the rule is checking — "word", "syllable", or "cluster"
   * - `HEBREW`: the Hebrew text that the rule matches, given as a string or Regex
   * - `PASS_THROUGH?`: An optional property; `true` if the rule should pass the characters of the result of the `TRANSLITERATION` callback to the be mapped to the schema
   * - `TRANSLITERATION`: the output of the rule, either a string or a callback whose properties differ based on the `FEATURE`
   *
   * The examples give the best indication of how to use these features, though see the particular types for more details
   *
   * @category Orthographic Features
   *
   * @example
   * `FEATURE` is `"word"` and `TRANSLITERATION` is a string
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   ADDITIONAL_FEATURES: [{
   *     FEATURE: "word",
   *     HEBREW: "הָאָרֶץ",
   *     TRANSLITERATION: "The Earth"
   *   }]
   })
   * transliterate("וְאֵ֥ת הָאָֽרֶץ", schema);
   * // wǝʾēt The Earth
   * ```
   *
   * @example
   * `FEATURE` is `"word"` and `TRANSLITERATION` is a callback
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   ADDITIONAL_FEATURES: [{
   *     HEBREW: "שְׁתַּיִם",
   *     FEATURE: "word",
   *     TRANSLITERATION: function (_word, _hebrew, schema) {
   *       return (
   *         schema["SHIN"] +
   *         (schema["TAV_DAGESH"] ?? schema["TAV"]) +
   *         schema["PATAH"] +
   *         schema["YOD"] +
   *         schema["HIRIQ"] +
   *         schema["FINAL_MEM"]
   *       );
   *     }
   *   }]
   * });
   * transliterate("שְׁתַּיִם", schema);
   * // štayim
   * ```
   * @example
   * `FEATURE` is `"syllable"` and `TRANSLITERATION` is a string
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   ADDITIONAL_FEATURES: [{
   *     FEATURE: "syllable",
   *     HEBREW: /יּ(?![\u{05B4}-\u{05BB}])/u, // a yod with a dagesh, not followed by a vowel character
   *     TRANSLITERATION: "Y"
   *   }]
   * });
   * transliterate("מְחִיּיָאֵ֗ל", schema);
   * // mǝḥiYyāʾēl
   * ```
   *
   * @example
   * `FEATURE` is `"syllable"` and `TRANSLITERATION` is a callback
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   ADDITIONAL_FEATURES: [{
   *     FEATURE: "syllable",
   *     HEBREW: /\u{05C7}/u,
   *     TRANSLITERATION: (syllable) => {
   *       // If the syllable contains a qamets qatan character (U+05C7), check the text of the next syllable
   *       const next = syllable?.next?.value?.text;
   *
   *       // If the next syllable includes a hateph qamets, then replace the qamets qatan with a regular qamets
   *       if (next && next.includes("\u05B3")) {
   *         return syllable.text.replace("\u{05C7}", "\u{05B8}");
   *       }
   *       return syllable.text;
   *     }
   *   }]
   * });
   * transliterate("נָעֳמִי֙", schema);
   * // nāʿŏmî
   * ```
   *
   * @example
   * `FEATURE` is `"cluster"` and `TRANSLITERATION` is a string
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   ADDITIONAL_FEATURES: [{
   *     FEATURE: "cluster",
   *     HEBREW: "זּ",
   *     TRANSLITERATION: "tz"
   *   }]
   * });;
   * transliterate("הַזֹּאת", schema);
   * // hatzōʾt
   * ```
   *
   * @example
   * `FEATURE` is "cluster" and `TRANSLITERATION` is a callback
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   TAV_DAGESH: "tʰ",,
   *   ADDITIONAL_FEATURES: [{
   *     FEATURE: 'cluster',
   *     HEBREW: /תּ(?!\u{05B0})/u,
   *     TRANSLITERATION: (cluster, _, schema) => {
   *       // Because the *_DAGESH value is a digraph, we need to replace the first character
   *       // or it will be doubled in rules.ts as "tʰtʰ"
   *
   *
   *       // If there is a dagesh, but it is the beginning of the word
   *       // we can return the text, as the character w/ the dagesh will not be doubled
   *       if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
   *         return cluster.text;
   *       }
   *
   *       // If there is a dagesh, it may be that it is a dagesh qal (i.e. lene)
   *       // If it is a dagesh lene, then like the beginning of the word,
   *       // the character w/ the dagesh will not be doubled
   *       const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
   *       if (!prevCoda?.includes("ת",)) {
   *         return cluster.text;
   *       }
   *
   *       // convert "tʰtʰ" to "ttʰ"
   *       const noAspiration = schema['TAV_DAGESH']?.replace("ʰ",, '') ?? '';
   *       return cluster.text.replace("תּ",,`${noAspiration + schema['TAV_DAGESH']}`);
   *     },
   *   }]
   * });
   * transliterate("וַתֵּ֨שֶׁב", schema);
   * // wattʰēšeb
   * ```
   *
   */
  ADDITIONAL_FEATURES?: (WordFeature | SyllableFeature | ClusterFeature)[];
  /**
   * The full form of the divine name - יהוה
   *
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DIVINE_NAME: "yhwh",
   * });
   * transliterate("יְהֹוָ֗ה", schema);
   * // yhwh
   * ```
   */
  DIVINE_NAME: string;
  /**
   * The full form of the divine name pointed as 'elohim
   *
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   DIVINE_NAME_ELOHIM: "ʾĕlōhîm",
   * });
   * transliterate("יֱהֹוִה", schema);
   * // ʾĕlōhîm
   * ```
   *
   * @remarks
   * Matches on the forms:
   * - יֱהֹוִה
   * - יֱהוִה
   * - יְהֹוִה
   * - יְהוִה
   * If `undefined`, defaults to value of {@link DIVINE_NAME}
   */
  DIVINE_NAME_ELOHIM?: string;
  /**
   * A syllable separator, usually an empty string
   *
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   SYLLABLE_SEPARATOR: "-",
   * });
   * transliterate('הָאָֽרֶץ', schema);
   * // hā-ʾā-reṣ
   * ```
   */
  SYLLABLE_SEPARATOR?: string;
  /**
   * A mark for indentifying the stressed syllable
   *
   * @category Orthographic Features
   *
   * @example
   * ```js
   * const schema = new Schema({
   *   // truncated for brevity
   *   STRESS_MARKER: {
   *     location: "after-vowel",
   *     mark: "\u0301",
   *    },
   * });
   * transliterate("מֶ֣לֶךְ", schema);
   * // mélek
   * ```
   *
   * @remarks
   * Taamim are needed in the Hebrew text to correctly identify stress.
   */
  STRESS_MARKER?: {
    /**
     * The location of the mark
     */
    location: "before-syllable" | "after-syllable" | "before-vowel" | "after-vowel";
    /**
     * A string to use as the marker
     */
    mark: string;
    /**
     * Whether to exclude the mark on certain syllables
     *
     * @default
     * "never"
     *
     * @example
     * `undefined` and `"never"` are the same
     * ```js
     * const schema = new Schema({
     *   STRESS_MARKER: {
     *     location: "after-vowel",
     *     mark: "\u0301",
     *    },
     * });
     * transliterate("בֹּ֖קֶר י֥וֹם אֶחָֽד׃ ", schema);
     * // bṓqer yốm ʾeḥā́d
     * ```
     *
     * @example
     * Exclude only single syllable words using `"single"`
     * ```js
     * const schema = new Schema({
     *   STRESS_MARKER: {
     *     location: "after-vowel",
     *     mark: "\u0301",
     *     exclude: "single",
     *    },
     * });
     * transliterate("בֹּ֖קֶר י֥וֹם אֶחָֽד׃ ", schema);
     * // bṓqer yôm ʾeḥā́d
     * ```
     *
     * @example
     * Exclude when accent is on the final syllable, implicitly excluding single syllable words using `"final"`
     * ```js
     * const schema = new Schema({
     *   STRESS_MARKER: {
     *     location: "after-vowel",
     *     mark: "\u0301",
     *     exclude: "final",
     *    },
     * });
     * transliterate("בֹּ֖קֶר י֥וֹם אֶחָֽד׃ ", schema);
     * // bṓqer yôm ʾeḥād
     * ```
     */
    exclude?: "never" | "final" | "single";
  };
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  allowNoNiqqud: SylOpts["allowNoNiqqud"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  article: SylOpts["article"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  holemHaser: SylOpts["holemHaser"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  longVowels: SylOpts["longVowels"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  qametsQatan: SylOpts["qametsQatan"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  shevaAfterMeteg: SylOpts["shevaAfterMeteg"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  shevaWithMeteg?: SylOpts["shevaWithMeteg"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  sqnmlvy: SylOpts["sqnmlvy"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  strict: SylOpts["strict"];
  /**
   * @category Syllabification
   *
   * @remarks
   * See implementation for more details
   */
  wawShureq: SylOpts["wawShureq"];
  /**@category Constructors */
  constructor(schema: Schema) {
    this.VOCAL_SHEVA = schema.VOCAL_SHEVA;
    this.HATAF_SEGOL = schema.HATAF_SEGOL;
    this.HATAF_PATAH = schema.HATAF_PATAH;
    this.HATAF_QAMATS = schema.HATAF_QAMATS;
    this.HIRIQ = schema.HIRIQ;
    this.TSERE = schema.TSERE;
    this.SEGOL = schema.SEGOL;
    this.PATAH = schema.PATAH;
    this.QAMATS = schema.QAMATS;
    this.HOLAM = schema.HOLAM;
    this.HOLAM_HASER = schema.HOLAM_HASER;
    this.QUBUTS = schema.QUBUTS;
    this.DAGESH = schema.DAGESH;
    this.DAGESH_CHAZAQ = schema.DAGESH_CHAZAQ;
    this.MAQAF = schema.MAQAF;
    this.PASEQ = schema.PASEQ;
    this.SOF_PASUQ = schema.SOF_PASUQ;
    this.QAMATS_QATAN = schema.QAMATS_QATAN;
    this.FURTIVE_PATAH = schema.FURTIVE_PATAH;
    this.HIRIQ_YOD = schema.HIRIQ_YOD;
    this.TSERE_YOD = schema.TSERE_YOD;
    this.SEGOL_YOD = schema.SEGOL_YOD;
    this.SHUREQ = schema.SHUREQ;
    this.HOLAM_VAV = schema.HOLAM_VAV;
    this.QAMATS_HE = schema.QAMATS_HE;
    this.SEGOL_HE = schema.SEGOL_HE;
    this.TSERE_HE = schema.TSERE_HE;
    this.MS_SUFX = schema.MS_SUFX;
    this.ALEF = schema.ALEF;
    this.BET_DAGESH = schema.BET_DAGESH;
    this.BET = schema.BET;
    this.GIMEL = schema.GIMEL;
    this.GIMEL_DAGESH = schema.GIMEL_DAGESH;
    this.DALET = schema.DALET;
    this.DALET_DAGESH = schema.DALET_DAGESH;
    this.HE = schema.HE;
    this.VAV = schema.VAV;
    this.ZAYIN = schema.ZAYIN;
    this.HET = schema.HET;
    this.TET = schema.TET;
    this.YOD = schema.YOD;
    this.FINAL_KAF = schema.FINAL_KAF;
    this.KAF = schema.KAF;
    this.KAF_DAGESH = schema.KAF_DAGESH;
    this.LAMED = schema.LAMED;
    this.FINAL_MEM = schema.FINAL_MEM;
    this.MEM = schema.MEM;
    this.FINAL_NUN = schema.FINAL_NUN;
    this.NUN = schema.NUN;
    this.SAMEKH = schema.SAMEKH;
    this.AYIN = schema.AYIN;
    this.FINAL_PE = schema.FINAL_PE;
    this.PE = schema.PE;
    this.PE_DAGESH = schema.PE_DAGESH;
    this.FINAL_TSADI = schema.FINAL_TSADI;
    this.TSADI = schema.TSADI;
    this.QOF = schema.QOF;
    this.RESH = schema.RESH;
    this.SHIN = schema.SHIN;
    this.SIN = schema.SIN;
    this.TAV = schema.TAV;
    this.TAV_DAGESH = schema.TAV_DAGESH;
    this.DIVINE_NAME = schema.DIVINE_NAME;
    this.DIVINE_NAME_ELOHIM = schema.DIVINE_NAME_ELOHIM;
    this.SYLLABLE_SEPARATOR = schema.SYLLABLE_SEPARATOR;
    this.ADDITIONAL_FEATURES = schema.ADDITIONAL_FEATURES;
    this.STRESS_MARKER = schema.STRESS_MARKER;
    this.longVowels = schema.longVowels;
    this.qametsQatan = schema.qametsQatan;
    this.sqnmlvy = schema.sqnmlvy;
    this.shevaAfterMeteg = schema.shevaAfterMeteg;
    this.shevaWithMeteg = schema.shevaWithMeteg;
    this.wawShureq = schema.wawShureq;
    this.article = schema.article;
    this.allowNoNiqqud = schema.allowNoNiqqud;
    this.strict = schema.strict;
    this.holemHaser = schema.holemHaser;
  }
}

/**
 * The default schema according to SBL's academic style guide.
 *
 * Whereas a new {@link Schema} must have all required properties when constructed,
 * this schema is meant to be used as a default so particular properties can be overidden (see example).
 *
 * If the property is not set, the default value will be used. Each property is documented below with their default values.
 *
 * Click into each property's "Overrides" for more information about that property.
 *
 * @param schema a {@link Schema | Partial\<Schema\>}
 *
 * @example
 * Extend the default schema
 * ```js
 *  transliterate("שָׁלוֹם", { SHIN: "sh" });
 * // shālôm
 * ```
 *
 * @privateRemarks
 * In order for documentation output to be the way I wanted, the properties are all redefined with their type from the Schema.
 * This is not necessary for the implementation, just the docs.
 */
export class SBL extends Schema {
  /** @category Vowels @default "ǝ" */
  declare VOCAL_SHEVA: Schema["VOCAL_SHEVA"];
  /** @category Vowels @default "ĕ" */
  declare HATAF_SEGOL: Schema["HATAF_SEGOL"];
  /** @category Vowels @default "ă" */
  declare HATAF_PATAH: Schema["HATAF_PATAH"];
  /** @category Vowels @default "ŏ" */
  declare HATAF_QAMATS: Schema["HATAF_QAMATS"];
  /** @category Vowels @default "i" */
  declare HIRIQ: Schema["HIRIQ"];
  /** @category Vowels @default "ē" */
  declare TSERE: Schema["TSERE"];
  /** @category Vowels @default "e" */
  declare SEGOL: Schema["SEGOL"];
  /** @category Vowels @default "a" */
  declare PATAH: Schema["PATAH"];
  /** @category Vowels @default "ā" */
  declare QAMATS: Schema["QAMATS"];
  /** @category Vowels @default "ō" */
  declare HOLAM: Schema["HOLAM"];
  /** @category Vowels @default "ō" */
  declare HOLAM_HASER: Schema["HOLAM_HASER"];
  /** @category Vowels @default "ū" */
  declare QUBUTS: Schema["QUBUTS"];
  /** @category Marks @default "" */
  declare DAGESH: Schema["DAGESH"];
  /** @category Marks @category Orthographic Features @default true */
  declare DAGESH_CHAZAQ: Schema["DAGESH_CHAZAQ"];
  /** @category Marks @category Taamim @default "-" */
  declare MAQAF: Schema["MAQAF"];
  /** @category Marks @default "" */
  declare PASEQ: Schema["PASEQ"];
  /** @category Marks @category Taamim @default "" */
  declare SOF_PASUQ: Schema["SOF_PASUQ"];
  /** @category Vowels @default "o" */
  declare QAMATS_QATAN: Schema["QAMATS_QATAN"];
  /** @category Vowels @category Orthographic Features @default "a" */
  declare FURTIVE_PATAH: Schema["FURTIVE_PATAH"];
  /** @category Vowels @category Orthographic Features @default "î" */
  declare HIRIQ_YOD: Schema["HIRIQ_YOD"];
  /** @category Vowels @category Orthographic Features @default "ê" */
  declare TSERE_YOD: Schema["TSERE_YOD"];
  /** @category Vowels @category Orthographic Features @default "ê" */
  declare SEGOL_YOD: Schema["SEGOL_YOD"];
  /** @category Vowels @category Orthographic Features @default "û" */
  declare SHUREQ: Schema["SHUREQ"];
  /** @category Vowels @category Orthographic Features @default "ô" */
  declare HOLAM_VAV: Schema["HOLAM_VAV"];
  /** @category Vowels @category Orthographic Features @default "â" */
  declare QAMATS_HE: Schema["QAMATS_HE"];
  /** @category Vowels @category Orthographic Features @default "ê" */
  declare SEGOL_HE: Schema["SEGOL_HE"];
  /** @category Vowels @category Orthographic Features @default "ê" */
  declare TSERE_HE: Schema["TSERE_HE"];
  /** @category Vowel @category Orthographic Features @default "āyw" */
  declare MS_SUFX: Schema["MS_SUFX"];
  /** @category Consonants @default "ʾ" */
  declare ALEF: Schema["ALEF"];
  /** @category Consonants @default "b" */
  declare BET: Schema["BET"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare BET_DAGESH: Schema["BET_DAGESH"];
  /** @category Consonants @default "g" */
  declare GIMEL: Schema["GIMEL"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare GIMEL_DAGESH: Schema["GIMEL_DAGESH"];
  /** @category Consonants @default "d" */
  declare DALET: Schema["DALET"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare DALET_DAGESH: Schema["DALET_DAGESH"];
  /** @category Consonants @default "h" */
  declare HE: Schema["HE"];
  /** @category Consonants @default "w" */
  declare VAV: Schema["VAV"];
  /** @category Consonants @default "z" */
  declare ZAYIN: Schema["ZAYIN"];
  /** @category Consonants @default "ḥ" */
  declare HET: Schema["HET"];
  /** @category Consonants @default "ṭ" */
  declare TET: Schema["TET"];
  /** @category Consonants @default "y" */
  declare YOD: Schema["YOD"];
  /** @category Consonants @default "k" */
  declare FINAL_KAF: Schema["FINAL_KAF"];
  /** @category Consonants @default "k" */
  declare KAF: Schema["KAF"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare KAF_DAGESH: Schema["KAF_DAGESH"];
  /** @category Consonants @default "l" */
  declare LAMED: Schema["LAMED"];
  /** @category Consonants @default "m" */
  declare FINAL_MEM: Schema["FINAL_MEM"];
  /** @category Consonants @default "m" */
  declare MEM: Schema["MEM"];
  /** @category Consonants @default "n" */
  declare FINAL_NUN: Schema["FINAL_NUN"];
  /** @category Consonants @default "n" */
  declare NUN: Schema["NUN"];
  /** @category Consonants @default "s" */
  declare SAMEKH: Schema["SAMEKH"];
  /** @category Consonants @default "ʿ" */
  declare AYIN: Schema["AYIN"];
  /** @category Consonants @default "p" */
  declare FINAL_PE: Schema["FINAL_PE"];
  /** @category Consonants @default "p" */
  declare PE: Schema["PE"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare PE_DAGESH: Schema["PE_DAGESH"];
  /** @category Consonants @default "ṣ" */
  declare FINAL_TSADI: Schema["FINAL_TSADI"];
  /** @category Consonants @default "ṣ" */
  declare TSADI: Schema["TSADI"];
  /** @category Consonants @default "q" */
  declare QOF: Schema["QOF"];
  /** @category Consonants @default "r" */
  declare RESH: Schema["RESH"];
  /** @category Consonants @category Orthographic Features @default "š" */
  declare SHIN: Schema["SHIN"];
  /** @category Consonants @category Orthographic Features @default "ś" */
  declare SIN: Schema["SIN"];
  /** @category Consonants @default "t" */
  declare TAV: Schema["TAV"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare TAV_DAGESH: Schema["TAV_DAGESH"];
  /** @category Orthographic Features @default "yhwh" */
  declare DIVINE_NAME: Schema["DIVINE_NAME"];
  /** @category Orthographic Features @default undefined */
  declare DIVINE_NAME_ELOHIM: Schema["DIVINE_NAME_ELOHIM"];
  /** @category Orthographic Features @default undefined */
  declare SYLLABLE_SEPARATOR: Schema["SYLLABLE_SEPARATOR"];
  /** @category Orthographic Features @default undefined  */
  declare ADDITIONAL_FEATURES: Schema["ADDITIONAL_FEATURES"];
  /** @category Orthographic Features @default undefined */
  declare STRESS_MARKER: Schema["STRESS_MARKER"];
  /** @category Syllabification @default true */
  declare longVowels: Schema["longVowels"];
  /** @category Syllabification @default true */
  declare qametsQatan: Schema["qametsQatan"];
  /** @category Syllabification @default true */
  declare shevaAfterMeteg: Schema["shevaAfterMeteg"];
  /** @category Syllabification @default false */
  declare shevaWithMeteg: Schema["shevaWithMeteg"];
  /** @category Syllabification @default true */
  declare sqnmlvy: Schema["sqnmlvy"];
  /** @category Syllabification @default true */
  declare wawShureq: Schema["wawShureq"];
  /** @category Syllabification @default true */
  declare article: Schema["article"];
  /** @category Syllabification @default true */
  declare allowNoNiqqud: Schema["allowNoNiqqud"];
  /** @category Syllabification @default false */
  declare strict: Schema["strict"];
  /** @category Syllabification @default "remove" */
  declare holemHaser: Schema["holemHaser"];
  constructor(schema: Partial<Schema>) {
    super({
      VOCAL_SHEVA: schema.VOCAL_SHEVA ?? "ǝ",
      HATAF_SEGOL: schema.HATAF_SEGOL ?? "ĕ",
      HATAF_PATAH: schema.HATAF_PATAH ?? "ă",
      HATAF_QAMATS: schema.HATAF_QAMATS ?? "ŏ",
      HIRIQ: schema.HIRIQ ?? "i",
      TSERE: schema.TSERE ?? "ē",
      SEGOL: schema.SEGOL ?? "e",
      PATAH: schema.PATAH ?? "a",
      QAMATS: schema.QAMATS ?? "ā",
      HOLAM: schema.HOLAM ?? "ō",
      HOLAM_HASER: schema.HOLAM_HASER ?? "ō",
      QUBUTS: schema.QUBUTS ?? "ū",
      DAGESH: schema.DAGESH ?? "",
      DAGESH_CHAZAQ: schema.DAGESH_CHAZAQ ?? true,
      MAQAF: schema.MAQAF ?? "-",
      PASEQ: schema.PASEQ ?? "",
      SOF_PASUQ: schema.SOF_PASUQ ?? "",
      QAMATS_QATAN: schema.QAMATS_QATAN ?? "o",
      FURTIVE_PATAH: schema.FURTIVE_PATAH ?? "a",
      HIRIQ_YOD: schema.HIRIQ_YOD ?? "î",
      TSERE_YOD: schema.TSERE_YOD ?? "ê",
      SEGOL_YOD: schema.SEGOL_YOD ?? "ê",
      SHUREQ: schema.SHUREQ ?? "û",
      HOLAM_VAV: schema.HOLAM_VAV ?? "ô",
      QAMATS_HE: schema.QAMATS_HE ?? "â",
      SEGOL_HE: schema.SEGOL_HE ?? "ê",
      TSERE_HE: schema.TSERE_HE ?? "ê",
      MS_SUFX: schema.MS_SUFX ?? "āyw",
      ALEF: schema.ALEF ?? "ʾ",
      BET: schema.BET ?? "b",
      BET_DAGESH: schema.BET_DAGESH ?? undefined,
      GIMEL: schema.GIMEL ?? "g",
      GIMEL_DAGESH: schema.GIMEL_DAGESH ?? undefined,
      DALET: schema.DALET ?? "d",
      DALET_DAGESH: schema.DALET_DAGESH ?? undefined,
      HE: schema.HE ?? "h",
      VAV: schema.VAV ?? "w",
      ZAYIN: schema.ZAYIN ?? "z",
      HET: schema.HET ?? "ḥ",
      TET: schema.TET ?? "ṭ",
      YOD: schema.YOD ?? "y",
      FINAL_KAF: schema.FINAL_KAF ?? "k",
      KAF: schema.KAF ?? "k",
      KAF_DAGESH: schema.KAF_DAGESH ?? undefined,
      LAMED: schema.LAMED ?? "l",
      FINAL_MEM: schema.FINAL_MEM ?? "m",
      MEM: schema.MEM ?? "m",
      FINAL_NUN: schema.FINAL_NUN ?? "n",
      NUN: schema.NUN ?? "n",
      SAMEKH: schema.SAMEKH ?? "s",
      AYIN: schema.AYIN ?? "ʿ",
      FINAL_PE: schema.FINAL_PE ?? "p",
      PE: schema.PE ?? "p",
      PE_DAGESH: schema.PE_DAGESH ?? undefined,
      FINAL_TSADI: schema.FINAL_TSADI ?? "ṣ",
      TSADI: schema.TSADI ?? "ṣ",
      QOF: schema.QOF ?? "q",
      RESH: schema.RESH ?? "r",
      SHIN: schema.SHIN ?? "š",
      SIN: schema.SIN ?? "ś",
      TAV: schema.TAV ?? "t",
      TAV_DAGESH: schema.TAV_DAGESH ?? undefined,
      DIVINE_NAME: schema.DIVINE_NAME ?? "yhwh",
      DIVINE_NAME_ELOHIM: schema.DIVINE_NAME_ELOHIM ?? undefined,
      SYLLABLE_SEPARATOR: schema.SYLLABLE_SEPARATOR ?? undefined,
      ADDITIONAL_FEATURES: schema.ADDITIONAL_FEATURES ?? undefined,
      STRESS_MARKER: schema.STRESS_MARKER ?? undefined,
      longVowels: schema.longVowels ?? true,
      qametsQatan: schema.qametsQatan ?? true,
      shevaAfterMeteg: schema.shevaAfterMeteg ?? true,
      shevaWithMeteg: schema.shevaWithMeteg ?? false,
      sqnmlvy: schema.sqnmlvy ?? true,
      wawShureq: schema.wawShureq ?? true,
      article: schema.article ?? true,
      allowNoNiqqud: schema.allowNoNiqqud ?? true,
      strict: schema.strict ?? false,
      holemHaser: schema.holemHaser || "remove"
    });

    this.VOCAL_SHEVA = schema.VOCAL_SHEVA ?? "ǝ";
    this.HATAF_SEGOL = schema.HATAF_SEGOL ?? "ĕ";
    this.HATAF_PATAH = schema.HATAF_PATAH ?? "ă";
    this.HATAF_QAMATS = schema.HATAF_QAMATS ?? "ŏ";
    this.HIRIQ = schema.HIRIQ ?? "i";
    this.TSERE = schema.TSERE ?? "ē";
    this.SEGOL = schema.SEGOL ?? "e";
    this.PATAH = schema.PATAH ?? "a";
    this.QAMATS = schema.QAMATS ?? "ā";
    this.HOLAM = schema.HOLAM ?? "ō";
    this.HOLAM_HASER = schema.HOLAM_HASER ?? "ō";
    this.QUBUTS = schema.QUBUTS ?? "ū";
    this.DAGESH = schema.DAGESH ?? "";
    this.DAGESH_CHAZAQ = schema.DAGESH_CHAZAQ ?? true;
    this.MAQAF = schema.MAQAF ?? "-";
    this.PASEQ = schema.PASEQ ?? "";
    this.SOF_PASUQ = schema.SOF_PASUQ ?? "";
    this.QAMATS_QATAN = schema.QAMATS_QATAN ?? "o";
    this.FURTIVE_PATAH = schema.FURTIVE_PATAH ?? "a";
    this.HIRIQ_YOD = schema.HIRIQ_YOD ?? "î";
    this.TSERE_YOD = schema.TSERE_YOD ?? "ê";
    this.SEGOL_YOD = schema.SEGOL_YOD ?? "ê";
    this.SHUREQ = schema.SHUREQ ?? "û";
    this.HOLAM_VAV = schema.HOLAM_VAV ?? "ô";
    this.QAMATS_HE = schema.QAMATS_HE ?? "â";
    this.SEGOL_HE = schema.SEGOL_HE ?? "ê";
    this.TSERE_HE = schema.TSERE_HE ?? "ê";
    this.MS_SUFX = schema.MS_SUFX ?? "āyw";
    this.ALEF = schema.ALEF ?? "ʾ";
    this.BET = schema.BET ?? "b";
    this.BET_DAGESH = schema.BET_DAGESH ?? undefined;
    this.GIMEL = schema.GIMEL ?? "g";
    this.GIMEL_DAGESH = schema.GIMEL_DAGESH ?? undefined;
    this.DALET = schema.DALET ?? "d";
    this.DALET_DAGESH = schema.DALET_DAGESH ?? undefined;
    this.HE = schema.HE ?? "h";
    this.VAV = schema.VAV ?? "w";
    this.ZAYIN = schema.ZAYIN ?? "z";
    this.HET = schema.HET ?? "ḥ";
    this.TET = schema.TET ?? "ṭ";
    this.YOD = schema.YOD ?? "y";
    this.FINAL_KAF = schema.FINAL_KAF ?? "k";
    this.KAF = schema.KAF ?? "k";
    this.KAF_DAGESH = schema.KAF_DAGESH ?? undefined;
    this.LAMED = schema.LAMED ?? "l";
    this.FINAL_MEM = schema.FINAL_MEM ?? "m";
    this.MEM = schema.MEM ?? "m";
    this.FINAL_NUN = schema.FINAL_NUN ?? "n";
    this.NUN = schema.NUN ?? "n";
    this.SAMEKH = schema.SAMEKH ?? "s";
    this.AYIN = schema.AYIN ?? "ʿ";
    this.FINAL_PE = schema.FINAL_PE ?? "p";
    this.PE = schema.PE ?? "p";
    this.PE_DAGESH = schema.PE_DAGESH ?? undefined;
    this.FINAL_TSADI = schema.FINAL_TSADI ?? "ṣ";
    this.TSADI = schema.TSADI ?? "ṣ";
    this.QOF = schema.QOF ?? "q";
    this.RESH = schema.RESH ?? "r";
    this.SHIN = schema.SHIN ?? "š";
    this.SIN = schema.SIN ?? "ś";
    this.TAV = schema.TAV ?? "t";
    this.TAV_DAGESH = schema.TAV_DAGESH ?? undefined;
    this.DIVINE_NAME = schema.DIVINE_NAME ?? "yhwh";
    this.DIVINE_NAME_ELOHIM = schema.DIVINE_NAME_ELOHIM ?? undefined;
    this.SYLLABLE_SEPARATOR = schema.SYLLABLE_SEPARATOR ?? undefined;
    this.ADDITIONAL_FEATURES = schema.ADDITIONAL_FEATURES ?? undefined;
    this.STRESS_MARKER = schema.STRESS_MARKER ?? undefined;
    this.longVowels = schema.longVowels ?? true;
    this.qametsQatan = schema.qametsQatan ?? true;
    this.shevaAfterMeteg = schema.shevaAfterMeteg ?? true;
    this.shevaWithMeteg = schema.shevaWithMeteg ?? false;
    this.sqnmlvy = schema.sqnmlvy ?? true;
    this.wawShureq = schema.wawShureq ?? true;
    this.article = schema.article ?? true;
    this.allowNoNiqqud = schema.allowNoNiqqud ?? true;
    this.strict = schema.strict ?? false;
    this.holemHaser = schema.holemHaser ?? "remove";
  }
}
