import { transliterate } from "../src/transliterate";

describe("using default academic style", () => {
  test("basic transliteration", () => {
    expect(transliterate("אֱלֹהִים")).toEqual("ʾĕlōhîm");
  });

  test("longer string of text", () => {
    expect(
      transliterate(
        "וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֨הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְהֹ֑ום וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃"
      )
    ).toEqual("wǝhāʾāreṣ hāyǝtâ tōhû wābōhû wǝḥōšek ʿal-pǝnê tǝhôm wǝrûaḥ ʾĕlōhîm mǝraḥepet ʿal-pǝnê hammāyim");
  });

  test("with verse numbers", () => {
    expect(
      transliterate(`
    v.1 וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֨הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְהֹ֑ום וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃
    `)
    ).toEqual(`
    v.1 wǝhāʾāreṣ hāyǝtâ tōhû wābōhû wǝḥōšek ʿal-pǝnê tǝhôm wǝrûaḥ ʾĕlōhîm mǝraḥepet ʿal-pǝnê hammāyim
    `);
  });

  test("with line breaks", () => {
    expect(
      transliterate(`
    אֱלֹהִים
    תֹורָה
    אִ֛ישׁ
    מַלְכֵי
    `)
    ).toEqual(`
    ʾĕlōhîm
    tôrâ
    ʾîš
    malkê
    `);
  });

  test("with qametsQatan false", () => {
    expect(transliterate("כָּל־הָעָם")).toEqual("kāl-hāʿām");
  });

  test("with qametsQatan true", () => {
    expect(transliterate("כָּל־הָעָם", { qametsQatan: true })).toEqual("kol-hāʿām");
  });

  test("with sequence true", () => {
    expect(transliterate("\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}")).toEqual("haššā");
  });

  test("with sequence false", () => {
    expect(transliterate("\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}", { isSequenced: false })).toEqual("hašā");
  });
});

describe("using simple style", () => {
  test("basic transliteration", () => {
    expect(transliterate("בְּרֵאשִׁית בָּרָא אֱלֹהִים", { isSimple: true })).toEqual("bereshit bara elohim");
  });

  test("common words", () => {
    expect(transliterate("שָׁלֹום, דָּוִיד, אַבְרָם, סֶפֶר", { isSimple: true })).toEqual("shalom, david, avram, sefer");
  });

  test("with line breaks", () => {
    expect(
      transliterate(
        `
    אֱלֹהִים
    תֹורָה
    אִ֛ישׁ
    מַלְכֵי
    `,
        { isSimple: true }
      )
    ).toEqual(`
    elohim
    torah
    ish
    malke
    `);
  });

  test("doubling", () => {
    expect(transliterate("הִנֵּה מַשָּׁא", { isSimple: true })).toEqual("hinneh masha");
  });

  test("with qametsQatan false", () => {
    expect(transliterate("כָּל־הָעָם", { isSimple: true })).toEqual("kal-haam");
  });

  test("with qametsQatan true", () => {
    expect(transliterate("כָּל־הָעָם", { qametsQatan: true, isSimple: true })).toEqual("kol-haam");
  });
});
