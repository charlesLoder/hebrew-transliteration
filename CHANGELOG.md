# CHANGELOG

## Version 2

- v2.9.0

  - Adds new schema option `PATAH_HE` (PR #133)
  - Fixes final tav suffix being doubled (PR #131)
  - Fixes dagesh not doubling when 3ms suffix was present (PR #129)

- v2.8.4

  - Fix incorrect syllable separator with doubled vowels (PR #124)

- v2.8.3

  - Fix syllable separator bug not adding white space between words

- v2.8.2

  - Fix syllable separator not occuring between _dagesh chazaq_ (PR #122)

- v2.8.1

  - Update havarotjs with upstream fix

- v2.8.0

  - Fix Jerusalem rule in the Tiberian schema (PR #105)
  - Update schwa character (PR #107)
  - Update to `havarotjs` to `0.25.1` with refactors for changes in it and make segol he and tsere he optional (PR #110)
  - Add new rule to SBL for long/short hiriq and qubuts (PR #111)

- v2.7.0

  - Update `havarotjs` to `0.24.1` adding the `ketivQeres` to the [`Schema`](./src/schema.ts)

- v2.6.5

  - Update `remove` so that maqqef is replaced with a space instead of being completely removed (PR #84)

- v2.6.4

  - Incorporate updates from havarotjs which prevents errors

- v2.6.3

  - Fix tiberian output for Jerusalem (PR #80) and Issachar (PR #82)

- v2.6.2

  - Update build output to cjs and esm (PR #78)
  - ⚠️ screwed up versioning and skipped 2.6.1

- v2.6.0

  - Add tiberian schema (PR #77)

- v2.5.0

  - Fix issue with vocal shew (PR #71)
  - Add Journal of Semitic Studies schema (PR #74)

- v2.4.0

  - Add callback to `ADDITIONAL_FEATURES` (PR #48)
  - Add schema input for Divine Name pointed as 'elohiym (PR #49)
  - Add new prop to stress marker (PR #51)
  - Add string as option to `DAGESH_CHAZAQ` (PR #52)
  - Add `PASS_THROUGH` option to `ADDITIONAL_FEATURES` (PR #54)
  - Add romaniote schema (PR #56)
  - Fix maqqef before shureq bug (PR #65)
  - Fix furtive patach before sof pasuq (PR #69)

- v2.3.1

  - update packages
  - Fixes Issue [#39](https://github.com/charlesLoder/hebrew-transliteration/issues/39)

- v2.3.0

  - rewrite the `remove` function to allow for greater control of which character are removed

- v2.2.4

  - update packages for improved `strict` handling

- v2.2.3

  - update packages
  - update imports from havarotjs

- v2.2.2

  - fix export of package.json

- v2.2.1

  - fix broken exports and type

- v2.2.0

  - fix DN with Latin chars (Issue #26)
  - remove build scripts so no longer bundled as one file
  - add premade schemas (Issue #25)

- v2.1.2

  - update havarotjs and other packages

- v2.1.1

  - update havarotjs and other packages

- v2.1.0:

  - update havarotjs and other packages
  - new update improves how text w/o niqqud is handled
  - Schema now gets a new syllabification option

- v2.0.8:

  - update havarotjs and other packages

- v2.0.7:

  - still transliterates if word has taamim, but not niqqud (i.e. vowels)

- v2.0.6:

  - add check if word is not Hebrew

- v2.0.5:

  - update havarotjs and other packages
  - add check if word is not Hebrew

- v2.0.4: update havarotjs and other packages

- v2.0.3: update havarotjs and other packages

- v2.0.2: update havarotjs

- v2.0.1: reduce build size

- v2.0.0: complete rewrite
  - uses `havarotjs` for syllabification
  - use `Schema()` for defining custom transliteration schemas

## Version 1

- v1.3.2: fixed incorrect qamets qatan before qamets chatuph
- v1.3.1: fixed Divine Name not correct using simple transliteration
- v1.3.0: added `removeShinDot` and `removeSinDot` option to `remove()` for more granular control
- v1.2.0:
  - rewrote in in TypeScript
  - added `isSimple` option to `transliterate()` for SBL's General Purpose Style
- v1.1.0: in `transliterate()` the `options` was changed from the misspelled `isSeqeunced` to `isSequenced`.
