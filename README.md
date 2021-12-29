# hebrew-transliteration

A JavaScript package for transliterating Hebrew

## install

### npm

```bash
npm install hebrew-transliteration
```

### local

You will need to have [node installed](https://nodejs.org/en/download/).

Download or clone this repository

```bash
cd hebrew-transliteration
npm install
npm run build
```

## example

```javascript
const heb = require("hebrew-transliteration");
const transliterate = heb.transliterate;
transliterate("אֱלֹהִים");
// "ʾĕlōhîm";
```

## DOCS

### About

This is a JavaScript package for transliterating Hebrew.

It exports 3 [functions](#functions):

1. [`transliterate`](#transliterate) — the main function which transliterates Hebrew
2. [`remove`](#remove) — removes taamim and optionally removes certain niqqudim
3. [`sequence`](#sequence) — sequences Hebrew charactes according to the [SBL Hebrew Font Manual](https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf)

And it exports 2 [classes](#classes):

1. [`Text`](#text) — the [`Text`](https://charlesloder.github.io/havarot/classes/text.Text.html) class from the `havarotjs` package
2. [`Schema`](#schema) — a schema for transliterating Hebrew

### Functions

#### `transliterate()`

Takes a `string` or `Text`, and optionally a `Schema` or `Partial<Schema>`

```javascript
const heb = require("hebrew-transliteration");
const transliterate = heb.transliterate;
transliterate("אֱלֹהִים");
// "ʾĕlōhîm";
```

If no [Schema](#schema) is passed, then the package defaults to SBL's academic style.

You can pass in a `Partial<Schema>` that will modify SBL's academic style:

```javascript
transliterate("שָׁלוֹם", { SHIN: "sh" });
// shālôm
```

If you need a fully customized transliteration, it is best to use the [Schema](#schema) constructor:

```javascript
const heb = require("hebrew-transliteration");
const transliterate = heb.transliterate;
const Schema = heb.Schema;

const schema = new Schema({ ALEF: "'", BET: "B", ... QAMETS: "A", ... }) // truncated for brevity

transliterate("אָ֣ב", schema)
// 'AB
```

---

#### `remove()`

Takes a string and options

Takes string and options. With `{removeVowels: false}`, will only remove cantillation (i.e., accent) marks.

```javascript
heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔");
// "שָׂרַי אִשְׁתְּךָ";

heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true });
// "שׂרי אשׁתך";

heb.remove("שָׂרַ֣י אִשְׁתְּךָ֔", { removeVowels: true, removeShinDot: true, removeSinDot: true });
// "שרי אשתך";
```

---

#### `sequence()`

Takes string. Returns a string of properly sequenced characters according to the [SBL Hebrew Font manual](https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf) following the pattern of: consonant - dagesh - vowel - ta'am

```javascript
heb.sequence("\u{5D1}\u{5B0}\u{5BC}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5B4}\u{5C1}\u{596}\u{5D9}\u{5EA}");
// --------- "\u{5D1}\u{5BC}\u{5B0}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5C1}\u{5B4}\u{596}\u{5D9}\u{5EA}";
```

### Classes

#### Text

The [`Text`](https://charlesloder.github.io/havarot/classes/text.Text.html) class from the `havarotjs` package.

This is used to syllabify Hebrew text.

```javascript
const heb = require("hebrew-transliteration");
const text = new heb.Text("הֲבָרֹות");
text.syllables;
// [
//    Syllable { original: "הֲ" },
//    Syllable { original: "בָ" },
//    Syllable { original: "רֹות" }
//  ]
```

If a `Text` is passed into [`transliterate()`](#transliterate) instead of a `string`, then the syllabification from the `Text` class is used instead the [syllabification options from the `Schema` class](#syllabification)

#### Schema

A `Schema` is used to define a schema for transliteration.

````ts
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
}
````

- `SylOpts` are the syllabification options that are passed to the [`Text`](#text) class
- the `ADDITIONAL_FEATURES` property is for defining non-typical Hebrew orthography, example:
  - the orthography `זּ` is most often a doubling of the `ZAYIN` (i.e. 'z' with no dagesh, and 'zz' with a _dagesh chazaq_)
  - in the Romaniote reading tradition, the `ZAYIN` is usually transliterated with 'z' (really ζ),
  - but a `ZAYIN` followed by a _dagesh_ is transliterated as 'tz' (really τζ)
  - :warning: this is an experimental property; results may not always meet expectations

## Live

Use it live at [charlesLoder.github.io/hebrewTransliteration](https://charlesloder.github.io/hebrewTransliteration/index.html)

## Contributing

See [contributing](./CONTRIBUTING.md)
