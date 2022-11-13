import { transliterate } from "../../src/index";
import { romaniote } from "../../src/schemas/romaniote";

describe.each`
  description              | hebrew       | transliteration
  ${"spirantized bet"}     | ${"אָב"}     | ${"αβ"}
  ${"unspirantized bet"}   | ${"בָּם"}    | ${"μπαμ"}
  ${"spirantized gimel"}   | ${"חָג"}     | ${"χαγ"}
  ${"unspirantized gimel"} | ${"גָּדַל"}  | ${"γκαδαλ"}
  ${"spirantized dalet"}   | ${"סַד"}     | ${"σαδ"}
  ${"unspirantized dalet"} | ${"דָּם"}    | ${"νταμ"}
  ${"spirantized zayin"}   | ${"הַזֹּאת"} | ${"ατζωθ"}
  ${"unspirantized zayin"} | ${"זֵה"}     | ${"ζε"}
  ${"spirantized kaf"}     | ${"לֵךְ"}    | ${"λεχ"}
  ${"unspirantized kaf"}   | ${"כָּמָר"}  | ${"καμαρ"}
  ${"spirantized peh"}     | ${"אֶלֶף"}   | ${"ελεφ"}
  ${"unspirantized peh"}   | ${"פֶּה"}    | ${"πε"}
  ${"spirantized tav"}     | ${"מַת"}     | ${"μαθ"}
  ${"unspirantized tav"}   | ${"תָּם"}    | ${"ταμ"}
`("Spirantization:", ({ hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${hebrew} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                  | hebrew      | transliteration
  ${"shin char plus shin dot"} | ${"שֶׁלֶם"}  | ${"σσελεμ"}
  ${"shin char plus sin dot"}  | ${"אָרַשׂ"}  | ${"αρασ"}
  ${"final sigmas"}            | ${"לָבֵשׁ"} | ${"λαβεσς"}
`("Sibiliants:", ({ hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${hebrew} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});
