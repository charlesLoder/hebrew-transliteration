const testEach = require("../src/testEach")
// using toEqual instead of toBe since testEach() returns a different object

test("check for shin-dot and remove", () => {
  expect(testEach(["š\u05C1in"])).toEqual(["šin"])
})

test("check for sin-dot and change combination to s with a grave", () => {
  expect(testEach(["š\u05C2in"])).toEqual(["śin"])
})

test("check for hiriq yod in various positions", () => {
  expect(testEach(["biy", "qātiyl", "šiyšiy", "yiyraš", "šāmayim"])).toEqual([
    "bî",
    "qātîl",
    "šîšî",
    "yîraš",
    "šāmayim"
  ])
})

test("check for tsere yod in various positions", () => {
  expect(testEach(["bēy", "bēyṣa", "yēyṣaʿ", "bēyat"])).toEqual(["bê", "bêṣa", "yêṣaʿ", "bēyat"])
})

test("check for seghol yod in various positions", () => {
  expect(testEach(["bey", "dǝbāreykā"])).toEqual(["bê", "dǝbārêkā"])
})

test("check for waw mater for holem, with holem preceding waw [preferred way]", () => {
  expect(testEach(["bōw", "lib\u05BCōw", "qǝṭōwl"])).toEqual(["bô", "libbô", "qǝṭôl"])
})

test("check for waw mater for holem, with waw preceding holem", () => {
  expect(testEach(["bwō", "b\u05BCwō", "lib\u05BCwō", "qǝṭwōl"])).toEqual(["bô", "bô", "libbô", "qǝṭôl"])
})

test("check for waw mater for shureq", () => {
  expect(testEach(["bw\u05BC", "w\u05BCmōšeh"])).toEqual(["bû", "ûmōšê"])
})

test("check for consonantal waw with any vowel but holem", () => {
  expect(testEach(["miṣǝwāh", "mǝṣaw\u05BCeh", "mōwet"])).toEqual(["miṣwâ", "mǝṣawwê", "mōwet"])
})

test("check consonantal waw with holem as vowel", () => {
  expect(testEach(["ʿāwōn", "miṣǝwōt"])).toEqual(["ʿāwōn", "miṣwōt"])
})

test("check consonantal waw, with a waw mater in the same word", () => {
  // first: (ayin + patach) + (waw + holem) + (nun + holem + waw)
  // second: (ayin + patach) + (waw + holem) + (nun + waw + holem)
  expect(testEach(["ʿăwōnōwteynw\u05BC", "ʿăwōnwōteynw\u05BC"])).toEqual(["ʿăwōnôtênû", "ʿăwōnôtênû"])
})

test("check for he mater", () => {
  expect(testEach(["bāh", "bēh", "beh"])).toEqual(["bâ", "bê", "bê"])
})

test("check for he with mappiq", () => {
  expect(testEach(["bāh\u05BC"])).toEqual(["bāh"])
})

test("check for furtive patach", () => {
  expect(testEach(["yārēḥa", "gāboh\u05BCa", "rōʿa"])).toEqual(["yārēaḥ", "gāboah", "rōaʿ"])
})

test("check for shewa at end of word", () => {
  expect(testEach(["qātaltǝ"])).toEqual(["qātalt"])
})

test("check for shewa preceded by short vowel", () => {
  expect(testEach(["yiqǝtǝlû", "qātǝlâ"])).toEqual(["yiqtǝlû", "qātǝlâ"])
})

test("check for shewa preceded by short vowel, but SQeNeM LeVY letters in wayyiqtol forms", () => {
  expect(testEach(["wayǝdab\u05BCēr"])).toEqual(["wayǝdabbēr"])
})

test("check for qamets qatan, but option is true", () => {
  expect(
    testEach(["kāl-hāʿam"], {
      qametsQatan: true
    })
  ).toEqual(["kol-hāʿam"])
})

test("check for qamets qatan, but option to false", () => {
  expect(testEach(["kāl-hāʿam"])).toEqual(["kāl-hāʿam"])
})

test("check for doubling dagesh", () => {
  expect(testEach(["ḥaṭ\u05BCaʿōt", "qātalǝt\u05BCǝ"])).toEqual(["ḥaṭṭaʿōt", "qātalt"])
})

test("check for divine name", () => {
  expect(testEach(["yǝhwâ", "yǝhwâ", "yhwâ"])).toEqual(["yhwh", "yhwh", "yhwh"])
})
