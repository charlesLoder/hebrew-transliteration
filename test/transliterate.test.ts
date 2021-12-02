import { transliterate } from "../src/index";

/**
 * all tests (except the first) use taamim
 */

describe("using default options", () => {
  describe("basic tests", () => {
    test.each`
      description                    | hebrew                           | transliteration
      ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"ʾbgdhwzḥṭykklmmnnsʿppṣṣqršt"}
      ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"raʿal"}
      ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. raʿal"}
      ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n raʿal"}
    `("$description", ({ hebrew, transliteration }) => {
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });

  describe("dagesh tests", () => {
    test.each`
      description                          | hebrew         | transliteration
      ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}   | ${"bōser"}
      ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"} | ${"masgēr"}
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"} | ${"minnǝzār"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}   | ${"maggāl"}
      ${"mappiq he"}                       | ${"וְלַ֨הּ"}   | ${"wǝlah"}
    `("$description", ({ hebrew, transliteration }) => {
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });

  describe("mater tests", () => {
    test.each`
      description     | hebrew          | transliteration
      ${"hiriq yod"}  | ${"עִ֔יר"}      | ${"ʿîr"}
      ${"tsere yod"}  | ${"אֵ֤ין"}      | ${"ʾên"}
      ${"seghol yod"} | ${"אֱלֹהֶ֑יךָ"} | ${"ʾĕlōhêkā"}
      ${"holem vav"}  | ${"ס֣וֹא"}      | ${"sôʾ"}
      ${"qamets he"}  | ${"עֵצָ֖ה"}     | ${"ʿēṣâ"}
    `("$description", ({ hebrew, transliteration }) => {
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });
});
