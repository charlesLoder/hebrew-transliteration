# CHANGELOG

## Version 2

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
