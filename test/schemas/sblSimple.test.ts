import { transliterate } from "../../src/index";
import { sblSimple } from "../../src/schemas/index";

interface Inputs {
  hebrew: string;
  transliteration: string;
}

const schema = sblSimple;

describe("basic tests", () => {
  test.each`
    description                    | hebrew                           | transliteration
    ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"vgdhvzkhtykhkhlmmnnsfftstsqrsht"}
    ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"raal"}
    ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. raal"}
    ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n raal"}
    ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"}             | ${"raal  raal"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("consonant features", () => {
  describe("spirantization and ligature tests", () => {
    test.each`
      description              | hebrew       | transliteration
      ${"unspirantized bet"}   | ${"בָּ֣ם"}   | ${"bam"}
      ${"spirantized bet"}     | ${"אָ֣ב"}    | ${"av"}
      ${"unspirantized gimel"} | ${"גָּדַ֣ל"} | ${"gadal"}
      ${"spirantized gimel"}   | ${"חָ֣ג"}    | ${"khag"}
      ${"unspirantized dalet"} | ${"דָּ֣ם"}   | ${"dam"}
      ${"spirantized dalet"}   | ${"סַ֣ד"}    | ${"sad"}
      ${"unspirantized kaf"}   | ${"כָּמָ֣ר"} | ${"kamar"}
      ${"spirantized kaf"}     | ${"לֵ֣ךְ"}   | ${"lekh"}
      ${"unspirantized peh"}   | ${"פֹּ֣ה"}   | ${"poh"}
      ${"spirantized peh"}     | ${"אֶ֣לֶף"}  | ${"elef"}
      ${"unspirantized tav"}   | ${"תָּ֣ם"}   | ${"tam"}
      ${"spirantized tav"}     | ${"מַ֣ת"}    | ${"mat"}
      ${"shin"}                | ${"שֶׁ֣לֶם"}  | ${"shelem"}
      ${"sin"}                 | ${"אָ֣רַשׂ"}  | ${"aras"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("furtive", () => {
    test.each`
      description               | hebrew         | transliteration
      ${"furtive patach, chet"} | ${"נֹ֖חַ"}     | ${"noakh"}
      ${"furtive patach, ayin"} | ${"רָקִ֖יעַ"}  | ${"raqia"}
      ${"furtive patach, he"}   | ${"גָּבֹ֗הַּ"} | ${"gavoah"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("dagesh", () => {
    test.each`
      description                          | hebrew            | transliteration
      ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}      | ${"boser"}
      ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"}    | ${"masger"}
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"}    | ${"minnezar"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}      | ${"maggal"}
      ${"doubled shin"}                    | ${"מַשָּׁא"}       | ${"masha"}
      ${"doubled tsadi"}                   | ${"לְבִצָּר֔וֹן"} | ${"levitsaron"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("shewa", () => {
    test.each`
      description                              | hebrew              | transliteration
      ${"vocal shewa"}                         | ${"סְלִ֣ק"}         | ${"seliq"}
      ${"silent shewa"}                        | ${"סַלְכָ֣ה"}       | ${"salkhah"}
      ${"final shewa"}                         | ${"כָּ֣ךְ"}         | ${"kakh"}
      ${"two final shewas"}                    | ${"קָטַ֣לְתְּ"}     | ${"qatalt"}
      ${"omitted dagesh chazaq after article"} | ${"הַיְאֹ֗ר"}       | ${"hayeor"}
      ${"silent shewa and ligature consonant"} | ${"אַשְׁכְּנַזִּי"} | ${"ashkenazzi"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });
});

describe("mater features", () => {
  describe("typical", () => {
    test.each`
      description     | hebrew          | transliteration
      ${"hiriq yod"}  | ${"עִ֔יר"}      | ${"ir"}
      ${"tsere yod"}  | ${"אֵ֤ין"}      | ${"en"}
      ${"seghol yod"} | ${"אֱלֹהֶ֑יךָ"} | ${"elohekha"}
      ${"holem vav"}  | ${"ס֣וֹא"}      | ${"so"}
      ${"qamets he"}  | ${"עֵצָ֖ה"}     | ${"etsah"}
      ${"seghol he"}  | ${"יִקְרֶ֥ה"}   | ${"yiqreh"}
      ${"tsere he"}   | ${"הָאַרְיֵ֔ה"} | ${"haaryeh"}
      ${"shureq"}     | ${"קוּם"}       | ${"qum"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("edge cases", () => {
    test.each`
      description                                                            | hebrew             | transliteration
      ${"const yod with hiriq as vowel"}                                     | ${"יַ֣יִן"}        | ${"yayin"}
      ${"final hiriq yod with maqaf"}                                        | ${"וַֽיְהִי־כֵֽן"} | ${"vayehi-khen"}
      ${"hiriq followed by const yod (fake word)"}                           | ${"רִיֵם"}         | ${"riyem"}
      ${"consonantal vav with holem as vowel"}                               | ${"עָוֺ֖ן"}        | ${"avon"}
      ${"consonantal vav with holem vav as vowel"}                           | ${"עָו֑וֹן"}       | ${"avon"}
      ${"consonantal vav with holem, holem vav, and shureq (post biblical)"} | ${"עֲוֹנוֹתֵינוּ"} | ${"avonotenu"}
      ${"initial shureq"}                                                    | ${"וּמִן"}         | ${"umin"}
      ${"bgdkpt letter with mater"}                                          | ${"בִּיטוֹן"}      | ${"biton"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });
});

describe("divine name", () => {
  test.each`
    description                    | hebrew           | transliteration
    ${"by itself"}                 | ${"יְהוָ֥ה"}     | ${"yhwh"}
    ${"with a maqqef"}             | ${"אֶת־יְהוָ֤ה"} | ${"et-yhwh"}
    ${"with a preposition"}        | ${"בַּֽיהוָ֔ה"}  | ${"ba-yhwh"}
    ${"with latin char following"} | ${"יְהוָ֥ה,"}    | ${"yhwh,"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("qamets qatan", () => {
  test.each`
    description            | hebrew           | transliteration
    ${"standard"}          | ${"כָּל־הָעָ֖ם"} | ${"kol-haam"}
    ${"with hatef qamets"} | ${"נָעֳמִי֙"}    | ${"noomi"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});
