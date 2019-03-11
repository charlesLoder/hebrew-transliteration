const {changeElementSplit, changeElementSubstr} = require('../src/changeElement');

test('tests that string is split and rejoined correctly', () => {
    expect(changeElementSplit('š7in', 'š7', 'ś')).toBe('śin');
})

test('tests that string is split and rejoined correctly', () => {
    expect(changeElementSubstr('wayǝhi', 3, '')).toBe('wayhi');
})