const transliterate = require('../src/transliterate');

test('basic transliteration', () => {
    expect(transliterate('אֱלֹהִים')).toEqual('ʾĕlōhîm');
})

test('longer string of text', () => {
    expect(transliterate('וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֨הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְהֹ֑ום וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃'))
    .toEqual('wǝhāʾāreṣ hāyǝtâ tōhû wābōhû wǝḥōšek ʿal-pǝnê tǝhôm wǝrûaḥ ʾĕlōhîm mǝraḥepet ʿal-pǝnê hammāyim')
})

test('With qametsQatan false', () => {
    expect(transliterate('כָּל־הָעָם')).toEqual('kāl-hāʿām');
})

test('with qametsQatan true', () => {
    expect(transliterate('כָּל־הָעָם', {qametsQatan: true})).toEqual('kol-hāʿām');
})

test('with sequence true', () => {
    expect(transliterate('\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}')).
        toEqual('haššā');
})

test('with sequence false', () => {
    expect(transliterate('\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}', {isSequenced: false})).
        toEqual('hašā');
})
