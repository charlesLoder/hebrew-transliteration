const titForTat = require('../src/titForTat');

test('return a one to one correspondence from Heb to Eng', () => {
    // consonants from BMP
    expect(titForTat('אבגדהוזחטיכךלמםנןסעפףצץקרשׂשׁת')).toBe('ʾbgdhwzḥṭykklmmnnsʿppṣṣqrśšt');
})

test('preserve non Hebrew characters', () => {
    expect(titForTat('v.1 בראשׁית')).toBe('v.1 brʾšyt');
})