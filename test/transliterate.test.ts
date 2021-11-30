import { transliterate } from "../src/index";

/**
 * all tests (except the first) use taamim
 */

describe("using default options", () => {
  describe("basic tests", () => {
    test.concurrent.each`
      description                    | hebrew                           | transliteration
      ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"ʾbgdhwzḥṭykklmmnnsʿppṣṣqršt"}
      ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"raʿal"}
      ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. raʿal"}
      ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n raʿal"}
    `("$description", ({ hebrew, transliteration }) => {
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });
});
