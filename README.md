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
// ʾĕlōhîm
```

## DOCS

### About

This is a JavaScript package for transliterating Hebrew.

It exports 3 [functions](#functions):

1. [`transliterate()`](#transliterate) — the main function which transliterates Hebrew
2. [`remove()`](#remove) — removes taamim and optionally removes certain niqqudim
3. [`sequence()`](#sequence) — sequences Hebrew characters according to the [SBL Hebrew Font Manual](https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf)

And it exports 2 [classes](#classes):

1. [`Text`](#text) — the [`Text`](https://charlesloder.github.io/havarot/classes/text.Text.html) class from the `havarotjs` package
2. [`Schema`](#schema) — a schema for transliterating Hebrew

### Functions

#### `transliterate()`

Takes a `string` or [`Text`](#text), and optionally a [`Schema`](#schema) or `Partial<Schema>`

```javascript
heb.transliterate("אֱלֹהִים");
// "ʾĕlōhîm";
```

If no [`Schema`](#schema) is passed, then the package defaults to SBL's academic style.

You can pass in a `Partial<Schema>` that will modify SBL's academic style:

```javascript
heb.transliterate("שָׁלוֹם", { SHIN: "sh" });
// shālôm
```

There are premade schemas as well.

```javascript
const brillAcademic = require("hebrew-transliteration/schemas").brillAcademic;

heb.transliterate("בְּבֵית", brillAcademic)
// bᵉḇêṯ
```
**Note**: schemas are not endorsed by publishers.

The available schemas are:

- brillAcademic
- brillSimple
- sblAcademicSpirantization
- sblSimple

If you need a fully customized transliteration, it is best to use the [`Schema`](#schema) constructor:

```javascript
const schema = new heb.Schema({
  ALEF: "'",
  BET: "B",
  ...
  QAMETS: "A",
  ...
}) // truncated for brevity

heb.transliterate("אָ֣ב", schema)
// 'AB
```

---

#### `remove()`

Takes `string` and options. The default only removes taamim (i.e., accent or cantillation) marks.

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

Takes a `string`. Returns a string of properly sequenced characters according to the [SBL Hebrew Font manual](https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf) following the pattern of: consonant - dagesh - vowel - ta'am

```javascript
heb.sequence("\u{5D1}\u{5B0}\u{5BC}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5B4}\u{5C1}\u{596}\u{5D9}\u{5EA}");
//           "\u{5D1}\u{5BC}\u{5B0}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5C1}\u{5B4}\u{596}\u{5D9}\u{5EA}"
```

### Classes

#### Text

The [`Text`](https://charlesloder.github.io/havarot/classes/text.Text.html) class from the [`havarotjs`](https://www.npmjs.com/package/havarotjs) package.

This class is used by [`transliterate()`](#transliterate) internally to syllabify Hebrew text, but it is exposed as well.

```javascript
const text = new heb.Text("הֲבָרֹות");
text.syllables;
// [
//    Syllable { original: "הֲ" },
//    Syllable { original: "בָ" },
//    Syllable { original: "רֹות" }
//  ]
```

If a `Text` is passed into [`transliterate()`](#transliterate) instead of a `string`, then the syllabification from the `Text` class is used.
If a `string` is passed in, then syllabification come from the options passed into the [`Schema`](#schema).
See more under [syllabification](#syllabification).

#### Schema

A `Schema` is used to define a schema for transliteration. See the [`Schema` source](src/schema.ts) for all available properties.

The `Schema` can be divided into a few categories.

##### 1) Syllabification

The options used for syllabifying Hebrew text can be found [here](https://charlesloder.github.io/havarot/interfaces/text.SylOpts.html)

###### Differences between `Text` and `Schema`

There are 5 options for syllabification that are the [same as the ones used by the `Text`](https://charlesloder.github.io/havarot/interfaces/text.SylOpts.html) class. The only `Text` syllabification option that `Schema` does not use is `schema` (yes, that's confusing):

```javascript
const text = new heb.Text("חׇכְמָ֣ה", { schema: "traditional" }); // this is okay
const schema = new heb.Schema({ schema: "traditional" }); // this does nothing
```

Read more about the syllabification options for the [`Text`](https://charlesloder.github.io/havarot/interfaces/text.SylOpts.html) and a [higher level overview](https://charlesloder.github.io/havarot/pages/Linguistic/syllabification.html)

###### Precedence of `Text` over `Schema`

The syllabification options set by `Schema` are used if a `string` is passed into [`transliterate()`](#transliterate). If a `Text` is passed into [`transliterate()`](#transliterate) instead of a `string`, then the syllabification from the `Text` class is used:

```javascript
// using default
heb.transliterate("חָכְמָ֣ה"); // ḥokmâ

// using Schema for syllabification
heb.transliterate("חָכְמָ֣ה", { qametsQatan: false }); // ḥākǝmâ

// using Text for syllabification
heb.transliterate(new heb.Text("חָכְמָ֣ה", { qametsQatan: false })); // ḥākǝmâ

// using Schema and Text — Text takes precedence
heb.transliterate(new heb.Text("חָכְמָ֣ה", { qametsQatan: true }), { qametsQatan: false }); // ḥokmâ
```

**Note**: `qametsQatan` only converts a regular _qamets_ character; if a [_qamets qatan_ character](https://www.compart.com/en/unicode/U+05C7) is used, it will always be a _qamets qatan_.

##### 2) Characters

Most `Schema` properties are for defining single Hebrew characters:

```javascript
heb.transliterate("אָ", { ALEF: "@", QAMETS: "A" });
// @A
```

##### 3) Orthographic Features

Some properties are for defining common Hebrew orthographies for:

###### _BeGaDKePhaT_

There are properties for the digraphs of _BeGaDKePhaT_ letters:

- `BET_DAGESH`
- `GIMEL_DAGESH`
- `DALET_DAGESH`
- `KAF_DAGESH`
- `PE_DAGESH`
- `TAV_DAGESH`

Each one is the consonant character followed by the _dagesh_ character (U+05BC).

These are helpful for distinguishing between spirantized forms.

```javascript
heb.transliterate("בְּבֵית", { BET: "b" });
// bǝbêt

heb.transliterate("בְּבֵית", { BET: "v", BET_DAGESH: "b" });
// bǝvêt
```

###### Matres Lectionis

The following properties are for _matres lectionis_:

- `HIRIQ_YOD`
- `TSERE_YOD`
- `SEGOL_YOD`
- `SHUREQ`
- `HOLAM_VAV`
- `QAMATS_HE`
- `SEGOL_HE`
- `TSERE_HE`

```javascript
heb.transliterate("פֶּה", { SEGOL_HE: "é" });
// pé
```

###### Others

There are other orthographic features:

- `MS_SUFX` — HEBREW LETTER QAMATS (U+05B8) and YOD (U+05D9) and VAV (U+05D5) יו◌ָ
- `DIVINE_NAME` — the full form of the divine name - יהוה
- `SYLLABLE_SEPARATOR` — a syllable separator, usually an empty string
- `DAGESH_CHAZAQ` — if true, repeats the consonant with the _dagesh_

```javascript
heb.transliterate("שַׁבָּת", { DAGESH_CHAZAQ: true });
// šabbāt

heb.transliterate("שַׁבָּת", { DAGESH_CHAZAQ: false });
// šabāt

heb.transliterate("הָאָֽרֶץ", { SYLLABLE_SEPARATOR: "-" });
// hā-ʾā-reṣ
```

##### 4) Others

###### Additional Features

The `ADDITIONAL_FEATURES` property is for defining non-typical Hebrew orthography, example:

```javascript
heb.transliterate("הַזֹּאת", {
  ADDITIONAL_FEATURES: [
    {
      FEATURE: "cluster",
      HEBREW: "זּ",
      TRANSLITERATION: "tz"
    }
  ]
});
// hatzōʾt
```

- The orthography `זּ` is most often a doubling of the `ZAYIN` (i.e. `'z'` with no _dagesh_, and `'zz'` with a _dagesh chazaq_)
- In the Romaniote reading tradition, however, the `ZAYIN` is usually transliterated with `'z'` (really `'ζ'`),
- but a `ZAYIN` followed by a _dagesh_ is transliterated as `'tz'` (really `'τζ'`)

Each additional feature consists of 3 parts:

1. `FEATURE` — has three options:
  - `"cluster"` — a `cluster` is any combination of a single character and optionally a *dagesh* and vowel.
  - `"syllable"` — a `syllable` is any combination of a multiple characters and a single vowel and optionally a *dagesh*
  - `"word"` — covers everything else
2. `HEBREW` — the Hebrew text to be transliterated
3. `TRANSLITERATION` — the text used to transliterate the Hebrew text

:warning: this is an experimental property; results may not always meet expectations

###### Stress Marker

The `STRESS_MARKER` property is an optional mark to indicate stress in transliteration.

```javascript
heb.transliterate("מֶ֣לֶךְ", { STRESS_MARKER: { location: "after-vowel", mark: "\u0301" } });
// mélek
```

The `location` has four options:

- `"before-syllable"`
- `"after-syllable"`
- `"before-vowel"`
- `"after-vowel"`

A combining mark (e.g. `"\u0301"`) placed `"after-vowel"` will print on top of the vowel, and placed after a digraph will print on the second vowel.

```javascript
heb.transliterate("בֵּ֣ית", {
  TSERE_YOD: "ei",
  STRESS_MARKER: { location: "after-vowel", mark: "\u0301" }
});
// beít
```

## Live

Use it live at [charlesLoder.github.io/hebrewTransliteration](https://charlesloder.github.io/hebrewTransliteration/index.html)

## Contributing

See [contributing](./CONTRIBUTING.md)
