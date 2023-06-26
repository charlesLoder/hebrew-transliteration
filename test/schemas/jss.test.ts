import { transliterate } from "../../src/index";
import { jss } from "../../src/schemas/index";

interface Inputs {
  hebrew: string;
  transliteration: string;
}

const schema = jss;

describe("basic tests", () => {
  test.each`
    description                    | hebrew                           | transliteration
    ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"ʾḇḡḏhwzḥṭyḵḵlmmnnsʿp̄p̄ṣṣqršṯ"}
    ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"raʿal"}
    ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. raʿal"}
    ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n raʿal"}
    ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"}             | ${"raʿal  raʿal"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("consonant features", () => {
  describe("spirantization and ligature tests", () => {
    test.each`
      description              | hebrew       | transliteration
      ${"unspirantized bet"}   | ${"בָּ֣ם"}   | ${"bå̄m"}
      ${"spirantized bet"}     | ${"אָ֣ב"}    | ${"ʾå̄ḇ"}
      ${"unspirantized gimel"} | ${"גָּדַ֣ל"} | ${"gå̄ḏal"}
      ${"spirantized gimel"}   | ${"חָ֣ג"}    | ${"ḥå̄ḡ"}
      ${"unspirantized dalet"} | ${"דָּ֣ם"}   | ${"då̄m"}
      ${"spirantized dalet"}   | ${"סַ֣ד"}    | ${"saḏ"}
      ${"unspirantized kaf"}   | ${"כָּמָ֣ר"} | ${"kå̄må̄r"}
      ${"spirantized kaf"}     | ${"לֵ֣ךְ"}   | ${"lēḵ"}
      ${"unspirantized peh"}   | ${"פֹּ֣ה"}   | ${"pōh"}
      ${"spirantized peh"}     | ${"אֶ֣לֶף"}  | ${"ʾɛlɛp̄"}
      ${"unspirantized tav"}   | ${"תָּ֣ם"}   | ${"tå̄m"}
      ${"spirantized tav"}     | ${"מַ֣ת"}    | ${"maṯ"}
      ${"shin"}                | ${"שֶׁ֣לֶם"}  | ${"šɛlɛm"}
      ${"sin"}                 | ${"אָ֣רַשׂ"}  | ${"ʾå̄raś"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("furtive", () => {
    test.each`
      description               | hebrew         | transliteration
      ${"furtive patach, chet"} | ${"נֹ֖חַ"}     | ${"nōaḥ"}
      ${"furtive patach, ayin"} | ${"רָקִ֖יעַ"}  | ${"rå̄qīaʿ"}
      ${"furtive patach, he"}   | ${"גָּבֹ֗הַּ"} | ${"gå̄ḇōah"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("dagesh", () => {
    test.each`
      description                          | hebrew            | transliteration
      ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}      | ${"bōsɛr"}
      ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"}    | ${"masgēr"}
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"}    | ${"minnǝzå̄r"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}      | ${"maggå̄l"}
      ${"doubled shin"}                    | ${"מַשָּׁא"}       | ${"maššå̄ʾ"}
      ${"doubled tsadi"}                   | ${"לְבִצָּר֔וֹן"} | ${"lǝḇiṣṣå̄rōn"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("shewa", () => {
    test.each`
      description                              | hebrew              | transliteration
      ${"vocal shewa"}                         | ${"סְלִ֣ק"}         | ${"sǝliq"}
      ${"silent shewa"}                        | ${"סַלְכָ֣ה"}       | ${"salḵå̄"}
      ${"final shewa"}                         | ${"כָּ֣ךְ"}         | ${"kå̄ḵ"}
      ${"two final shewas"}                    | ${"קָטַ֣לְתְּ"}     | ${"qå̄ṭalt"}
      ${"omitted dagesh chazaq after article"} | ${"הַיְאֹ֗ר"}       | ${"hayǝʾōr"}
      ${"silent shewa and ligature consonant"} | ${"אַשְׁכְּנַזִּי"} | ${"ʾaškǝnazzī"}
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
      ${"hiriq yod"}  | ${"עִ֔יר"}      | ${"ʿīr"}
      ${"tsere yod"}  | ${"אֵ֤ין"}      | ${"ʾēn"}
      ${"seghol yod"} | ${"אֱלֹהֶ֑יךָ"} | ${"ʾɛ̆lōhɛḵå̄"}
      ${"holem vav"}  | ${"ס֣וֹא"}      | ${"sōʾ"}
      ${"qamets he"}  | ${"עֵצָ֖ה"}     | ${"ʿēṣå̄"}
      ${"seghol he"}  | ${"יִקְרֶ֥ה"}   | ${"yiqrɛ"}
      ${"tsere he"}   | ${"הָאַרְיֵ֔ה"} | ${"hå̄ʾaryē"}
      ${"shureq"}     | ${"קוּם"}       | ${"qūm"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("edge cases", () => {
    test.each`
      description                                                            | hebrew             | transliteration
      ${"const yod with hiriq as vowel"}                                     | ${"יַ֣יִן"}        | ${"yayin"}
      ${"final hiriq yod with maqaf"}                                        | ${"וַֽיְהִי־כֵֽן"} | ${"wayǝhī ḵēn"}
      ${"hiriq followed by const yod (fake word)"}                           | ${"רִיֵם"}         | ${"riyēm"}
      ${"consonantal vav with holem as vowel"}                               | ${"עָוֺ֖ן"}        | ${"ʿå̄wōn"}
      ${"consonantal vav with holem vav as vowel"}                           | ${"עָו֑וֹן"}       | ${"ʿå̄wōn"}
      ${"consonantal vav with holem, holem vav, and shureq (post biblical)"} | ${"עֲוֹנוֹתֵינוּ"} | ${"ʿăwōnōṯēnū"}
      ${"initial shureq"}                                                    | ${"וּמִן"}         | ${"ūmin"}
      ${"bgdkpt letter with mater"}                                          | ${"בִּיטוֹן"}      | ${"bīṭōn"}
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
    ${"with a maqqef"}             | ${"אֶת־יְהוָ֤ה"} | ${"ʾɛṯ yhwh"}
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
    ${"standard"}          | ${"כָּל־הָעָ֖ם"} | ${"kål hå̄ʿå̄m"}
    ${"with hatef qamets"} | ${"נָעֳמִי֙"}    | ${"nå̄ʿå̆mī"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});
