# hebrew-transliteration

Transliterate Unicode Hebrew text according to SBL's guidelines

## install

### npm

`npm install --save hebrew-transliteration`

### local

Download or clone this repository.

```bash
cd hebrew-transliteration
npm install
npm run build
```

## example

```javascript
const heb = require("hebrew-transliteration");
const transliterate = heb.transliterate;

transliterate("אֱלֹהִים") >>> "ʾĕlōhîm";
```

## DOCS

### transliterate

```javascript
heb.transliterate(text, { isSequenced: true, qametsQatan: false, isSimple: false });
```

Takes `text` \<\<String\>\> and `[options]` \<\<Object\>\>.

```javascript
heb.transliterate("כָּל־הָעָם") >>> "kāl-hāʿām";

heb.transliterate("כָּל־הָעָם", { qametsQatan: true }) >>> "kol-hāʿām";

heb.transliterate("שָׁלֹום") >>> "šālôm";

heb.transliterate("שָׁלֹום", { isSimple: true }) >>> "shalom";
```

---

### remove

```javascript
heb.remove(text, { removeVowels: false });
```

Takes `text` \<\<String\>\> and `[options]` \<\<Object\>\>. With `{removeVowels: false}`, will only remove cantillation (i.e., accent) marks.

```javascript
heb.remove("כָּל־הָעָם", { removeVowels: true }) >>> "כל־העם";
```

---

### sequence

```javascript
heb.sequence(text);
```

Takes `text` \<\<String\>\>. Returns a string of properly sequenced characters according to the [SBL Hebrew Font manual](https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf).

```javascript
heb.sequence("\u{5D1}\u{5B0}\u{5BC}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5B4}\u{5C1}\u{596}\u{5D9}\u{5EA}") >>>
  "\u{5D1}\u{5BC}\u{5B0}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5C1}\u{5B4}\u{596}\u{5D9}\u{5EA}";
```

## License

MIT

## Live

Use it live at [charlesLoder.github.io/hebrewTransliteration](https://charlesloder.github.io/hebrewTransliteration/index.html)

## Changelong

- v1.1.0: in `transliterate()` the `options` was changed from the misspelled `isSeqeunced` to `isSequenced`.
- v1.2.0:
  - rewrote in in TypeScript
  - added `isSimple` option to `transliterate()` for SBL's General Purpose Style

## Contributing

Please feel free to Fork, create Pull Requests, or submit issues. This is my first npm package, so any feedback is appreciated!
