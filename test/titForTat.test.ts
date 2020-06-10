import { titForTat } from "../src/titForTat";

describe("using the default academic stlye", () => {
  test("return a one to one correspondence from Heb to Eng", () => {
    // consonants from BMP
    let cons = "אבגדהוזחטיכךלמםנןסעפףצץקרשת".normalize("NFKD");
    expect(titForTat(cons)).toBe("ʾbgdhwzḥṭykklmmnnsʿppṣṣqršt");
  });

  test("preserve non Hebrew characters", () => {
    expect(titForTat("v.1 בראשית")).toBe("v.1 brʾšyt");
  });
});
