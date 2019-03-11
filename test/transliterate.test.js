const transliterate = require('../src/transliterate');

test('basic transliteration', () =>{
    expect(transliterate('אֱלֹהִים')).toEqual('ʾĕlōhîm');
})

test('With qametsQatan false', () => {
    expect(transliterate('כָּל־הָעָם')).toEqual('kāl-hāʿām');
})

test('with qametsQatan true', () => {
    expect(transliterate('כָּל־הָעָם', {'qametsQatan': true})).toEqual('kol-hāʿām');
})

test('with sequence true', () => {
    expect(transliterate('\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}')).
        toEqual('haššā');
})

test('with sequence false', () => {
    expect(transliterate('\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}', {'isSeqeunced': false})).
        toEqual('hašā');
})
