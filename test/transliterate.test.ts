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
      ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"}             | ${"raʿal  raʿal"}
    `("$description", ({ hebrew, transliteration }) => {
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });

  describe("consonant features", () => {
    describe("spirantization and ligature tests", () => {
      test.each`
        description              | hebrew       | transliteration
        ${"unspirantized bet"}   | ${"בָּ֣ם"}   | ${"bām"}
        ${"spirantized bet"}     | ${"אָ֣ב"}    | ${"ʾāb"}
        ${"unspirantized gimel"} | ${"גָּדַ֣ל"} | ${"gādal"}
        ${"spirantized gimel"}   | ${"חָ֣ג"}    | ${"ḥāg"}
        ${"unspirantized dalet"} | ${"דָּ֣ם"}   | ${"dām"}
        ${"spirantized dalet"}   | ${"סַ֣ד"}    | ${"sad"}
        ${"unspirantized kaf"}   | ${"כָּמָ֣ר"} | ${"kāmār"}
        ${"spirantized kaf"}     | ${"לֵ֣ךְ"}   | ${"lēk"}
        ${"unspirantized peh"}   | ${"פֹּ֣ה"}   | ${"pōh"}
        ${"spirantized peh"}     | ${"אֶ֣לֶף"}  | ${"ʾelep"}
        ${"unspirantized tav"}   | ${"תָּ֣ם"}   | ${"tām"}
        ${"spirantized tav"}     | ${"מַ֣ת"}    | ${"mat"}
        ${"shin"}                | ${"שֶׁ֣לֶם"}  | ${"šelem"}
        ${"sin"}                 | ${"אָ֣רַשׂ"}  | ${"ʾāraś"}
      `("$description", ({ hebrew, transliteration }) => {
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });

    describe("furtive", () => {
      test.each`
        description               | hebrew         | transliteration
        ${"furtive patach, chet"} | ${"נֹ֖חַ"}     | ${"nōaḥ"}
        ${"furtive patach, ayin"} | ${"רָקִ֖יעַ"}  | ${"rāqîaʿ"}
        ${"furtive patach, he"}   | ${"גָּבֹ֗הַּ"} | ${"gābōah"}
      `("$description", ({ hebrew, transliteration }) => {
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });

    describe("dagesh", () => {
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

    describe("shewa", () => {
      test.each`
        description           | hebrew          | transliteration
        ${"vocal shewa"}      | ${"סְלִ֣ק"}     | ${"sǝliq"}
        ${"silent shewa"}     | ${"סַלְכָ֣ה"}   | ${"salkâ"}
        ${"final shewa"}      | ${"כָּ֣ךְ"}     | ${"kāk"}
        ${"two final shewas"} | ${"קָטַ֣לְתְּ"} | ${"qāṭalt"}
      `("$description", ({ hebrew, transliteration }) => {
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });
  });

  describe("mater features", () => {
    describe("typical", () => {
      test.each`
        description     | hebrew          | transliteration
        ${"hiriq yod"}  | ${"עִ֔יר"}      | ${"ʿîr"}
        ${"tsere yod"}  | ${"אֵ֤ין"}      | ${"ʾên"}
        ${"seghol yod"} | ${"אֱלֹהֶ֑יךָ"} | ${"ʾĕlōhêkā"}
        ${"holem vav"}  | ${"ס֣וֹא"}      | ${"sôʾ"}
        ${"qamets he"}  | ${"עֵצָ֖ה"}     | ${"ʿēṣâ"}
        ${"seghol he"}  | ${"יִקְרֶ֥ה"}   | ${"yiqrê"}
        ${"tsere he"}   | ${"הָאַרְיֵ֔ה"} | ${"hāʾaryê"}
        ${"shureq"}     | ${"קוּם"}       | ${"qûm"}
      `("$description", ({ hebrew, transliteration }) => {
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });

    describe("edge cases", () => {
      test.each`
        description                                                            | hebrew             | transliteration
        ${"const yod with hiriq as vowel"}                                     | ${"יַ֣יִן"}        | ${"yayin"}
        ${"final hiriq yod with maqaf"}                                        | ${"וַֽיְהִי־כֵֽן"} | ${"wayǝhî-kēn"}
        ${"hiriq followed by const yod (fake word)"}                           | ${"רִיֵם"}         | ${"riyēm"}
        ${"consonantal vav with holem as vowel"}                               | ${"עָוֺ֖ן"}        | ${"ʿāwōn"}
        ${"consonantal vav with holem vav as vowel"}                           | ${"עָו֑וֹן"}       | ${"ʿāwôn"}
        ${"consonantal vav with holem, holem vav, and shureq (post biblical)"} | ${"עֲוֹנוֹתֵינוּ"} | ${"ʿăwōnôtênû"}
        ${"initial shureq"}                                                    | ${"וּמִן"}         | ${"ûmin"}
      `("$description", ({ hebrew, transliteration }) => {
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });
  });
});
