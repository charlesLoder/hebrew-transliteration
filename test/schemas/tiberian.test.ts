import { transliterate } from "../../src/index";
import { tiberian } from "../../src/schemas/index";

interface Inputs {
  hebrew: string;
  transliteration: string;
}

const schema = tiberian;

describe("basic tests", () => {
  test.each`
    description                    | hebrew                           | transliteration
    ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"ʔvʁðhvzħtˁjχχlmmnnsʕffsˁsˁq̟ʀ̟ʃθ"}
    ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"ˈʀ̟aʕal"}
    ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. ˈʀ̟aʕal"}
    ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n ˈʀ̟aʕal"}
    ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"}             | ${"ˈʀ̟aʕal  ˈʀ̟aʕal"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    // allowNoNiqqud must be true for the string of consonants
    expect(transliterate(hebrew, { ...schema, allowNoNiqqud: true })).toBe(transliteration);
  });
});

describe("consonant features", () => {
  describe("spirantization and ligature tests", () => {
    test.each`
      description              | hebrew       | transliteration
      ${"unspirantized bet"}   | ${"בָּ֣ם"}   | ${"ˈbɔm"}
      ${"spirantized bet"}     | ${"אָ֣ב"}    | ${"ˈʔɔv"}
      ${"unspirantized gimel"} | ${"גָּדַ֣ל"} | ${"gɔˈðal"}
      ${"spirantized gimel"}   | ${"חָ֣ג"}    | ${"ˈħɔʁ"}
      ${"unspirantized dalet"} | ${"דָּ֣ם"}   | ${"ˈdɔm"}
      ${"spirantized dalet"}   | ${"סַ֣ד"}    | ${"ˈsað"}
      ${"unspirantized kaf"}   | ${"כָּמָ֣ר"} | ${"kʰɔˈmɔʀ̟"}
      ${"spirantized kaf"}     | ${"לֵ֣ךְ"}   | ${"ˈleχ"}
      ${"unspirantized peh"}   | ${"פֹּ֣ה"}   | ${"ˈpʰoh"}
      ${"spirantized peh"}     | ${"אֶ֣לֶף"}  | ${"ˈʔɛlɛf"}
      ${"unspirantized tav"}   | ${"תָּ֣ם"}   | ${"ˈtʰɔm"}
      ${"spirantized tav"}     | ${"מַ֣ת"}    | ${"ˈmaθ"}
      ${"shin"}                | ${"שֶׁ֣לֶם"}  | ${"ˈʃɛlɛm"}
      ${"sin"}                 | ${"אָ֣רַשׂ"}  | ${"ˈʔɔʀ̟as"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("furtive", () => {
    test.each`
      description               | hebrew         | transliteration
      ${"furtive patach, chet"} | ${"נֹ֖חַ"}     | ${"ˈnoaħ"}
      ${"furtive patach, ayin"} | ${"רָקִ֖יעַ"}  | ${"ʀ̟ɔˈq̟i:aʕ"}
      ${"furtive patach, he"}   | ${"גָּבֹ֗הַּ"} | ${"gɔˈvoah"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("dagesh", () => {
    test.each`
      description                          | hebrew            | transliteration
      ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}      | ${"ˈbosɛʀ̟"}
      ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"}    | ${"masˈgeʀ̟"}
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"}    | ${"minnǝˈzɔʀ̟"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}      | ${"maˈggɔl"}
      ${"doubled shin"}                    | ${"מַשָּׁ֥א"}     | ${"maˈʃʃɔʔ"}
      ${"doubled tsadi"}                   | ${"לְבִצָּר֔וֹן"} | ${"lǝvisˁsˁɔˈʀ̟o:n"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("shewa", () => {
    test.each`
      description                              | hebrew              | transliteration
      ${"vocal shewa"}                         | ${"סְלִ֣ק"}         | ${"sǝˈliq̟"}
      ${"silent shewa"}                        | ${"סַלְכָ֣ה"}       | ${"salˈχɔ:"}
      ${"final shewa"}                         | ${"כָּ֣ךְ"}         | ${"ˈkʰɔχ"}
      ${"two final shewas"}                    | ${"קָטַ֣לְתְּ"}     | ${"q̟ɔˈtˁaltʰ"}
      ${"omitted dagesh chazaq after article"} | ${"הַיְאֹ֗ר"}       | ${"hajǝˈʔoʀ̟"}
      ${"silent shewa and ligature consonant"} | ${"אַשְׁכְּנַזִּי"} | ${"ʔaʃkʰǝnazzi:"}
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
      ${"hiriq yod"}  | ${"עִ֔יר"}      | ${"ˈʕi:ʀ̟"}
      ${"tsere yod"}  | ${"אֵ֤ין"}      | ${"ˈʔe:n"}
      ${"seghol yod"} | ${"אֱלֹהֶ֑יךָ"} | ${"ʔɛloˈhɛ:χɔ"}
      ${"holem vav"}  | ${"ס֣וֹא"}      | ${"ˈso:ʔ"}
      ${"qamets he"}  | ${"עֵצָ֖ה"}     | ${"ʕeˈsˁɔ:"}
      ${"seghol he"}  | ${"יִקְרֶ֥ה"}   | ${"jiq̟ˈʀ̟ɛ:"}
      ${"tsere he"}   | ${"הָאַרְיֵ֔ה"} | ${"hɔʔaʀ̟ˈjɛ:"}
      ${"shureq"}     | ${"קוּם"}       | ${"q̟u:m"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("edge cases", () => {
    test.each`
      description                                                            | hebrew              | transliteration
      ${"const yod with hiriq as vowel"}                                     | ${"יַ֣יִן"}         | ${"ˈjajin"}
      ${"final hiriq yod with maqaf"}                                        | ${"וַֽיְהִי־כֵֽן"}  | ${"vajǝhi:-χen"}
      ${"hiriq followed by const yod (fake word)"}                           | ${"רִיֵם"}          | ${"ʀ̟ijem"}
      ${"consonantal vav with holem as vowel"}                               | ${"עָוֺ֖ן"}         | ${"ʕɔˈvon"}
      ${"consonantal vav with holem vav as vowel"}                           | ${"עָו֑וֹן"}        | ${"ʕɔˈvo:n"}
      ${"consonantal vav with holem, holem vav, and shureq (post biblical)"} | ${"עֲוֹנוֹתֵ֑ינוּ"} | ${"ʕavono:ˈθe:nu:"}
      ${"initial shureq"}                                                    | ${"וּמִן"}          | ${"u:min"}
      ${"bgdkpt letter with mater"}                                          | ${"בִּיטוֹן"}       | ${"bi:tˁo:n"}
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
    ${"with a maqqef"}             | ${"אֶת־יְהוָ֤ה"} | ${"ʔɛθ-yhwh"}
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
    ${"standard"}          | ${"כָּל־הָעָ֖ם"} | ${"kʰɔl-hɔˈʕɔm"}
    ${"with hatef qamets"} | ${"נָעֳמִי֙"}    | ${"nɔʕoˈmi:"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});
