const titForTat = require('../src/titForTat');

test('return a one to one correspondence from Heb to Eng', () => {
    // consonants from BMP
    expect(titForTat('אבגדהוזחטיכךלמםנןסעפףצץקרשׂשׁת')).toBe('ʾbgdhwzḥṭykklmmnnsʿppṣṣqrśšt');
})