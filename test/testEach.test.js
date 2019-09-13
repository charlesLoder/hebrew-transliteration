const testEach = require('../src/testEach');
// using toEqual instead of toBe since testEach() returns a different object

test('check for shin-dot and remove', () => {
    expect(testEach(['š8in'])).toEqual(['šin']);
})

test('check for sin-dot and change combination to s with a grave', () => {
    expect(testEach(['š7in'])).toEqual(['śin']);
})

test('check for hiriq yod in various positions', () => {
    expect(testEach(['biy', 'qātiyl', 'šiyšiy', 'yiyraš', 'šāmayim']))
        .toEqual(['bî', 'qātîl', 'šîšî', 'yîraš', 'šāmayim']);
})

test('check for tsere yod in various positions', () => {
    expect(testEach(['bēy', 'bēyṣa', 'yēyṣaʿ', 'bēyat']))
        .toEqual(['bê', 'bêṣa', 'yêṣaʿ', 'bēyat']);
})

test('check for seghol yod in various positions', () => {
    expect(testEach(['bey', 'dǝbāreykā']))
        .toEqual(['bê', 'dǝbārêkā']);
})

test('check for waw mater for holem, with holem preceding waw [preferred way]', () => {
    expect(testEach(['bōw', 'qǝṭōwl']))
        .toEqual(['bô', 'qǝṭôl']);
})

test('check for waw mater for holem, with waw preceding holem', () => {
    expect(testEach(['bwō', 'qǝṭwōl']))
        .toEqual(['bô', 'qǝṭôl']);
})

test('check for waw mater for shureq', () => {
    expect(testEach(['bw9', 'w9mōšeh']))
        .toEqual(['bû', 'ûmōšê']);
})

test('check for consonantal waw with any vowel but holem', () => {
    expect(testEach(['miṣǝwāh', 'mǝṣaw9eh', 'mōwet']))
        .toEqual(['miṣwâ', 'mǝṣawwê', 'mōwet'])
})

test('check consonantal waw with holem as vowel', () => {
    expect((testEach(['ʿāwōn', 'miṣǝwōt'])))
        .toEqual(['ʿāwōn', 'miṣwōt'])
})

test('check for he mater', () => {
    expect(testEach(['bāh', 'bēh', 'beh']))
        .toEqual(['bâ', 'bê', 'bê']);
})

test('check for he with mappiq', () => {
    expect(testEach(['bāh9']))
        .toEqual(['bāh']);
})

test('check for furtive patach', () => {
    expect(testEach(['yārēḥa', 'gāboh9a', 'rōʿa']))
        .toEqual(['yārēaḥ', 'gāboah', 'rōaʿ']);
})

test('check for shewa at end of word', () => {
    expect(testEach(['qātaltǝ']))
        .toEqual(['qātalt']);
})

test('check for shewa preceded by short vowel', () => {
    expect(testEach(['yiqǝtǝlû', 'qātǝlâ']))
        .toEqual(['yiqtǝlû', 'qātǝlâ']);
})

test('check for shewa preceded by short vowel, but SQeNeM LeVY letters in wayyiqtol forms', () => {
    expect(testEach(['wayǝdab9ēr']))
        .toEqual(['wayǝdabbēr']);
})

test('check for qamets qatan, but option is true', () => {
    expect(testEach(['kāl-hāʿam'], {
            'qametsQatan': true
        }))
        .toEqual(['kol-hāʿam']);
})

test('check for qamets qatan, but option to false', () => {
    expect(testEach(['kāl-hāʿam']))
        .toEqual(['kāl-hāʿam']);
})

test('check for doubling dagesh', () => {
    expect(testEach(['ḥaṭ9aʿōt', 'qātalt9ǝ']))
        .toEqual(['ḥaṭṭaʿōt', 'qātalt']);
})

test('check for divine name', () => {
    expect(testEach(['yǝhwâ', 'yǝhwâ', 'yhwâ']))
        .toEqual(['yhwh', 'yhwh', 'yhwh']);
})