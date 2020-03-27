const sequence = require("../src/sequence")
// Normalize Heb characters acc. to SBL Hebrew guidelines

test("just consonants, no vowels", () => {
  // kaf + yod
  expect(sequence("\u{5DB}\u{5D9}"))
    // kaf + yod
    .toBe("\u{5DB}\u{5D9}")
})

test("vowel precedes dagesh, no accent", () => {
  // kaf + hiriq + dagesh + yod
  expect(sequence("\u{5DB}\u{5B4}\u{5BC}\u{5D9}"))
    // kaf + dagesh + hiriq + yod
    .toBe("\u{5DB}\u{5BC}\u{5B4}\u{5D9}")
})

test("vowel precedes dagesh, with accent", () => {
  // kaf + hiriq + dagesh + munach + yod
  expect(sequence("\u{5DB}\u{5B4}\u{5BC}\u{5A3}\u{5D9}"))
    // kaf + dagesh + hiriq + munach + yod
    .toBe("\u{5DB}\u{5BC}\u{5B4}\u{5A3}\u{5D9}")
})

test("vowel and accent precede dagesh", () => {
  // kaf + hiriq + munach + dagesh + yod
  expect(sequence("\u{5DB}\u{5B4}\u{5A3}\u{5BC}\u{5D9}"))
    // kaf + dagesh + hiriq + munach + yod
    .toBe("\u{5DB}\u{5BC}\u{5B4}\u{5A3}\u{5D9}")
})
test("accent and vowel precede dagesh", () => {
  // kaf + munach + hiriq + dagesh + yod
  expect(sequence("\u{5DB}\u{5A3}\u{5B4}\u{5BC}\u{5D9}"))
    // kaf + dagesh + hiriq + munach + yod
    .toBe("\u{5DB}\u{5BC}\u{5B4}\u{5A3}\u{5D9}")
})

test("multiple words", () => {
  expect(sequence("\u{5D1}\u{5B0}\u{5BC}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5B4}\u{5C1}\u{596}\u{5D9}\u{5EA}")).toBe(
    "\u{5D1}\u{5BC}\u{5B0}\u{5E8}\u{5B5}\u{5D0}\u{5E9}\u{5C1}\u{5B4}\u{596}\u{5D9}\u{5EA}"
  )
})
