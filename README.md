# hebrew-transliteration

A JavaScript package for transliterating Hebrew

## install

### npm

```bash
npm install hebrew-transliteration
```

### from source

You will need to have [node installed](https://nodejs.org/en/download/).

Download or clone this repository

```bash
cd hebrew-transliteration
npm install
npm run build
```

## quickstart

You can use ESM:

```javascript
import { transliterate } from "hebrew-transliteration";
transliterate("אֱלֹהִים");
// ʾĕlōhîm
```

Or CommonJS: 

```javascript
const heb = require("hebrew-transliteration");
const transliterate = heb.transliterate;
transliterate("אֱלֹהִים");
// ʾĕlōhîm
```

## DOCS

View the docs online at https://charlesloder.github.io/hebrew-transliteration/getting-started/quick-start

## Live

Use it live at [https://hebrewtransliteration.app](https://hebrewtransliteration.app)

## Contributing

See [contributing](./CONTRIBUTING.md)