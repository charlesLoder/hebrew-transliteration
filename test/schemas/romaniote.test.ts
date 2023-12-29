import { transliterate } from "../../src/index";
import { romaniote } from "../../src/schemas/romaniote";

describe.each`
  description              | hebrew       | transliteration
  ${"spirantized bet"}     | ${"אָב"}     | ${"αβ"}
  ${"unspirantized bet"}   | ${"בָּם"}    | ${"μπαμ"}
  ${"spirantized gimel"}   | ${"חָג"}     | ${"χαγ"}
  ${"unspirantized gimel"} | ${"גָּדַל"}  | ${"γκαδάλ"}
  ${"spirantized dalet"}   | ${"סַד"}     | ${"σαδ"}
  ${"unspirantized dalet"} | ${"דָּם"}    | ${"νταμ"}
  ${"spirantized zayin"}   | ${"הַזֹּאת"} | ${"ατζώθ"}
  ${"unspirantized zayin"} | ${"זֵה"}     | ${"ζε"}
  ${"spirantized kaf"}     | ${"לֵךְ"}    | ${"λεχ"}
  ${"unspirantized kaf"}   | ${"כָּמָר"}  | ${"καμάρ"}
  ${"spirantized peh"}     | ${"אֶלֶף"}   | ${"ελέφ"}
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
  ${"shin char plus shin dot"} | ${"שֶׁלֶם"}  | ${"σσελέμ"}
  ${"shin char plus sin dot"}  | ${"אָרַשׂ"}  | ${"αράς"}
  ${"final sigmas"}            | ${"לָבֵשׁ"} | ${"λαβέσς"}
`("Sibiliants:", ({ hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${hebrew} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                 | hebrew                             | transliteration
  ${"no special features"}    | ${"אָמַ֣ר"}                        | ${"αμάρ"}
  ${"gemination"}             | ${"רַנֵּן"}                        | ${"ρανέν"}
  ${"divine name"}            | ${"יְהוָ֣ה"}                       | ${"Αδωνάη"}
  ${"furtive patach, chet"}   | ${"שָׂמֵחַ"}                        | ${"σαμεάχ"}
  ${"furtive patach, ayin"}   | ${"שָׁמֵעַ"}                       | ${"σσαμεά"}
  ${"furtive patach, he"}     | ${"גָבֹהַּ"}                       | ${"γαβωά"}
  ${"3ms suffix"}             | ${"דְּבָרָ֖יו"}                    | ${"ντεβαράβ"}
  ${"mixed with latin chars"} | ${"רוּחַ, אֲבֹותֵינוּ (לְעֹולָם)"} | ${"ρουαχ, αβωθενού (λεωλαμ)"}
  ${"qamets qatan"}           | ${"כָּל הָעוֹלָם כָּל־הָעֵ֛ץ"}     | ${"κολ αωλάμ κολ-αέτς"}
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
  ${"vocal sheva"}      | ${"סְלִק"}     | ${"σελίκ"}
  ${"silent sheva"}     | ${"סַלְכָה"}   | ${"σαλχά"}
  ${"final sheva"}      | ${"כָּךְ"}     | ${"καχ"}
  ${"two final shevas"} | ${"קָטַלְתְּ"} | ${"κατάλτ"}
`("Shevas:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                              | hebrew       | transliteration
  ${"consonantal vav"}                     | ${"וָו"}     | ${"βαβ"}
  ${"vav haser (holem precedes vav)"}      | ${"שָׁלֹום"}  | ${"σσαλώμ"}
  ${"final holem vav"}                     | ${"כְּמוֹ"}  | ${"κεμώ"}
  ${"shureq"}                              | ${"קוּם"}    | ${"κουμ"}
  ${"initial shureq"}                      | ${"וּלֶחֶם"} | ${"ουλεχέμ"}
  ${"Consonantal vav with holem as vowel"} | ${"עָוֹן"}   | ${"αβών"}
`("Vavs:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                              | hebrew         | transliteration
  ${"consonantal yod"}                     | ${"יָם"}       | ${"γιαμ"}
  ${"consonantal yod with hiriq as vowel"} | ${"יַיִן"}     | ${"γιαγίν"}
  ${"hiriq followed by consonantal yod"}   | ${"סִיֵּם"}    | ${"σιγίεμ"}
  ${"patach yod"}                          | ${"דְּרָכַי֙"} | ${"ντεραχάη"}
`("Consonantal Yod:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                       | hebrew             | transliteration
  ${"hiriq yod: medial"}            | ${"אִ֘ירָ֤א"}      | ${"ίρά"}
  ${"hiriq yod: final"}             | ${"אֲנִי"}         | ${"ανή"}
  ${"hiriq yod: plural marker"}     | ${"דְּבָרִים"}     | ${"ντεβαρείμ"}
  ${"hiriq yod: final with maqqef"} | ${"וַֽיְהִי־כֵֽן"} | ${"βαγιεή-χεν"}
`("Hiriq Yod:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description           | hebrew       | transliteration
  ${"medial tsere-yod"} | ${"אֵין"}    | ${"εν"}
  ${"final tsere-yod"}  | ${"רִגְעֵי"} | ${"ριγαί"}
`("Tsere Yod:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});

describe.each`
  description                       | hebrew         | transliteration
  ${"seghol-yod (2ms plural sufx)"} | ${"אֱלֹהֶיךָ"} | ${"ελωεχά"}
`("Seghol Yod:", ({ description, hebrew, transliteration }) => {
  const transliteratedHeb = transliterate(hebrew, romaniote);
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});
