import { transliterate } from "../src/index";

/**
 * all tests (except the first) use taamim
 */
describe("using standard options", () => {
  test("return a one to one correspondence from Heb to Eng", () => {
    // consonants from BMP
    const cons = "אבגדהוזחטיכךלמםנןסעפףצץקרשת".normalize("NFKD");
    expect(transliterate(cons)).toBe("ʾbgdhwzḥṭykklmmnnsʿppṣṣqršt");
  });

  test("word with no special cases", () => {
    expect(transliterate("רַ֛עַל")).toBe("raʿal");
  });

  test("preserve non-Hebrew chars", () => {
    expect(transliterate("v1. רַ֛עַל")).toBe("v1. raʿal");
  });

  test("preserve line breaks", () => {
    // note the space char on second line
    expect(
      transliterate(`v1.
     רַ֛עַל`)
    ).toEqual(`v1.
     raʿal`);
  });
});
