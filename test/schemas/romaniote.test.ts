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
  ${"shin char plus sin dot"}  | ${"אָרַשׂ"}  | ${"αρας"}
  ${"final sigmas"}            | ${"לָבֵשׁ"} | ${"λαβεσς"}
`("Sibiliants:", ({ hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${hebrew} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                 | hebrew                             | transliteration
  ${"no special features"}    | ${"לֶחֶם"}                         | ${"λεχεμ"}
  ${"gemination"}             | ${"רַנֵּן"}                        | ${"ρανεν"}
  ${"divine name"}            | ${"יְהוָ֣ה"}                       | ${"Αδωνάη"}
  ${"furtive patach, chet"}   | ${"שָׂמֵחַ"}                        | ${"σαμεαχ"}
  ${"furtive patach, ayin"}   | ${"שָׁמֵעַ"}                       | ${"σσαμεα"}
  ${"furtive patach, he"}     | ${"גָבֹהַּ"}                       | ${"γαβωα"}
  ${"3ms suffix"}             | ${"דְּבָרָ֖יו"}                    | ${"ντεβαράβ"}
  ${"mixed with latin chars"} | ${"רוּחַ, אֲבֹותֵינוּ (לְעֹולָם)"} | ${"ρουαχ, αβωθενου (λεωλαμ)"}
  ${"qamets qatan"}           | ${"כָּל הָעוֹלָם כָּל־הָעֵ֛ץ"}     | ${"κολ αωλαμ κολ-αέτς"}
`("General Rules:", ({ hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${hebrew} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                   | hebrew           | transliteration
  ${"1 syl, no accent"}         | ${"לָ֔ךְ"}       | ${"λαχ"}
  ${"2 syls, accent on first"}  | ${"לֶ֬חֶם"}      | ${"λέχεμ"}
  ${"2 syls, accent on last"}   | ${"דָּבָ֑ר"}     | ${"νταβάρ"}
  ${"3 syls, accent on last"}   | ${"אֲרַנֵּ֥ן"}   | ${"αρανέν"}
  ${"3 syls, accent on second"} | ${"הִגַּ֣דְתָּ"} | ${"ιγκάδτα"}
`("Accents:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description           | hebrew         | transliteration
  ${"vocal sheva"}      | ${"סְלִק"}     | ${"σελικ"}
  ${"silent sheva"}     | ${"סַלְכָה"}   | ${"σαλχα"}
  ${"final sheva"}      | ${"כָּךְ"}     | ${"καχ"}
  ${"two final shevas"} | ${"קָטַלְתְּ"} | ${"καταλτ"}
`("Shevas:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                              | hebrew       | transliteration
  ${"consonantal vav"}                     | ${"וָו"}     | ${"βαβ"}
  ${"vav haser (holem precedes vav)"}      | ${"שָׁלֹום"}  | ${"σσαλωμ"}
  ${"final holem vav"}                     | ${"כְּמוֹ"}  | ${"κεμω"}
  ${"shureq"}                              | ${"קוּם"}    | ${"κουμ"}
  ${"initial shureq"}                      | ${"וּלֶחֶם"} | ${"ουλεχεμ"}
  ${"Consonantal vav with holem as vowel"} | ${"עָוֹן"}   | ${"αβων"}
`("Vavs:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                              | hebrew         | transliteration
  ${"consonantal yod"}                     | ${"יָם"}       | ${"γιαμ"}
  ${"consonantal yod with hiriq as vowel"} | ${"יַיִן"}     | ${"γιαγιν"}
  ${"hiriq followed by consonantal yod"}   | ${"סִיֵּם"}    | ${"σιγιεμ"}
  ${"patach yod"}                          | ${"דְּרָכַי֙"} | ${"ντεραχάη"}
`("Consonantal Yod:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});
