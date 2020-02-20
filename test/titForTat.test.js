const titForTat = require('../src/titForTat');

test('return a one to one correspondence from Heb to Eng', () => {
    // consonants from BMP
    expect(titForTat('אבגדהוזחטיכךלמםנןסעפףצץקרשׂשׁת')).toBe('ʾbgdhwzḥṭykklmmnnsʿppṣṣqrśšt');
})

test('preserve non Hebrew characters', () => {
    expect(titForTat('v.1 בראשׁית')).toBe('v.1 brʾšyt');
})

test('alphabetic presentation block with dageshes', () => {
    expect(titForTat('אּבּגּדּהּוּזּטּיּךּכּלּמּנּסּףּפּצּקּרּשּתּֿ'))
    .toBe('ʾ\u{05BC}b\u{05BC}g\u{05BC}d\u{05BC}h\u{05BC}w\u{05BC}z\u{05BC}ṭ\u{05BC}y\u{05BC}k\u{05BC}k\u{05BC}l\u{05BC}m\u{05BC}n\u{05BC}s\u{05BC}p\u{05BC}p\u{05BC}ṣ\u{05BC}q\u{05BC}r\u{05BC}š\u{05BC}t\u{05BC}')
})

test('alphabetic presentation block, no shin/sin', () => {
    expect(titForTat('ﬠﬡﬢﬣﬤﬥﬦﬧﬨאַאָוֹבֿכֿפֿ')).toBe('ʿʾdhklmrtʾaʾāwōbkp')
})

test('alpabetic presentation block, shins and sins', () => {
    expect(titForTat('\u{0FB2A}\u{0FB2B}\u{0FB2C}\u{0FB2D}')).toBe('šśš\u{05BC}ś\u{05BC}')
})
