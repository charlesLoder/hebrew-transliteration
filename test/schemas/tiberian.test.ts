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
    ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"vʁðhvzħtˁjχχlmmnnsʕffsˁsˁq̟ʀ̟ʃθ"}
    ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"ˈʀ̟aːʕal"}
    ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. ˈʀ̟aːʕal"}
    ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n ˈʀ̟aːʕal"}
    ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"}             | ${"ˈʀ̟aːʕal  ˈʀ̟aːʕal"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    // allowNoNiqqud must be true for the string of consonants
    // In the `consonants` test, the aleph is not in the transliteration output
    // because it matches a rule for a quiesced aleph
    expect(transliterate(hebrew, { ...schema, allowNoNiqqud: true })).toBe(transliteration);
  });
});

describe("consonant features", () => {
  describe("spirantization and ligature tests", () => {
    test.each`
      description              | hebrew       | transliteration
      ${"unspirantized bet"}   | ${"בָּ֣ם"}   | ${"ˈbɔːɔm"}
      ${"spirantized bet"}     | ${"אָ֣ב"}    | ${"ˈʔɔːɔv"}
      ${"unspirantized gimel"} | ${"גָּדַ֣ל"} | ${"gɔːˈðaːal"}
      ${"spirantized gimel"}   | ${"חָ֣ג"}    | ${"ˈħɔːɔʁ"}
      ${"unspirantized dalet"} | ${"דָּ֣ם"}   | ${"ˈdɔːɔm"}
      ${"spirantized dalet"}   | ${"סַ֣ד"}    | ${"ˈsaːað"}
      ${"unspirantized kaf"}   | ${"כָּמָ֣ר"} | ${"kʰɔːˈmɔːɔʀ̟"}
      ${"spirantized kaf"}     | ${"לֵ֣ךְ"}   | ${"ˈleːeχ"}
      ${"unspirantized peh"}   | ${"פֹּ֣ה"}   | ${"ˈpʰoː"}
      ${"spirantized peh"}     | ${"אֶ֣לֶף"}  | ${"ˈʔɛːlɛf"}
      ${"unspirantized tav"}   | ${"תָּ֣ם"}   | ${"ˈtʰɔːɔm"}
      ${"spirantized tav"}     | ${"מַ֣ת"}    | ${"ˈmaːaθ"}
      ${"shin"}                | ${"שֶׁ֣לֶם"}  | ${"ˈʃɛːlɛm"}
      ${"sin"}                 | ${"אָ֣רַשׂ"}  | ${"ˈʔɔːʀ̟as"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("furtive", () => {
    test.each`
      description                                | hebrew            | transliteration
      ${"furtive patach, chet"}                  | ${"נֹ֖חַ"}        | ${"ˈnoːaħ"}
      ${"furtive patach, chet preceded by vav "} | ${"ר֑וּחַ"}       | ${"ˈʀ̟uːwaħ"}
      ${"furtive patach, chet preceded by yod "} | ${"שְׁלִ֔יחַ"}    | ${"ʃaˈliːjaħ"}
      ${"furtive patach, ayin"}                  | ${"כִּשְׁמֹ֤עַ"}  | ${"kʰiʃˈmoːaʕ"}
      ${"furtive patach, ayin preceded by yod"}  | ${"רָקִ֖יעַ"}     | ${"ʀ̟ɔːˈq̟iːjaʕ"}
      ${"furtive patach, ayin preceded by vav"}  | ${"יֵשׁ֡וּעַ"}    | ${"jeːˈʃuːwaʕ"}
      ${"furtive patach, he"}                    | ${"גָּבֹ֗הַּ"}    | ${"gɔːˈvoːoah"}
      ${"furtive patach, he  preceded by vav"}   | ${"אֱלֹ֨והַּ"}    | ${"ʔɛˈloːwah"}
      ${"furtive patach, he  preceded by yod"}   | ${"מַגְבִּ֥יהַּ"} | ${"maʁˈbiːijah"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("dagesh", () => {
    test.each`
      description                          | hebrew            | transliteration
      ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}      | ${"ˈboːsɛrˁ"}
      ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"}    | ${"masˈgeːeʀ̟"}
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"}    | ${"minnaˈzɔːɔʀ̟"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}      | ${"magˈgɔːɔl"}
      ${"doubled shin"}                    | ${"מַשָּׁ֥א"}     | ${"maʃˈʃɔː"}
      ${"doubled tsadi"}                   | ${"לְבִצָּר֔וֹן"} | ${"lavisˁsˁɔːˈrˁoːon"}
      ${"yod with dagesh"}                 | ${"וַיִּלָּפֵ֑ת"} | ${"vaɟɟillɔːˈfeːeθ"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("shewa", () => {
    test.each`
      description                              | hebrew              | transliteration
      ${"vocal shewa"}                         | ${"סְלִ֣ק"}         | ${"saˈliːiq̟"}
      ${"silent shewa"}                        | ${"סַלְכָ֣ה"}       | ${"salˈχɔː"}
      ${"final shewa"}                         | ${"כָּ֣ךְ"}         | ${"ˈkʰɔːɔχ"}
      ${"two final shewas"}                    | ${"קָטַ֣לְתְּ"}     | ${"q̟ɔːˈtˁaːaltʰ"}
      ${"omitted dagesh chazaq after article"} | ${"הַיְאֹ֗ר"}       | ${"haːjoˈʔoːoʀ̟"}
      ${"silent shewa and ligature consonant"} | ${"אַשְׁכְּנַזִּי"} | ${"ʔaʃkʰanazziː"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("resh", () => {
    test.each`
      description         | hebrew           | transliteration
      ${"pharyngealized"} | ${"בְּמִזְרֶ֖ה"} | ${"bamizˈrˁɛː"}
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
      ${"hiriq yod"}  | ${"עִ֔יר"}      | ${"ˈʕiːiʀ̟"}
      ${"tsere yod"}  | ${"אֵ֤ין"}      | ${"ˈʔeːen"}
      ${"seghol yod"} | ${"אֱלֹהֶ֑יךָ"} | ${"ʔɛloːˈhɛːχɔː"}
      ${"holem vav"}  | ${"ס֣וֹא"}      | ${"ˈsoː"}
      ${"qamets he"}  | ${"עֵצָ֖ה"}     | ${"ʕeːˈsˁɔː"}
      ${"seghol he"}  | ${"יִקְרֶ֥ה"}   | ${"jiq̟ˈʀ̟ɛː"}
      ${"tsere he"}   | ${"הָאַרְיֵ֔ה"} | ${"hɔːʔaʀ̟ˈjeː"}
      ${"shureq"}     | ${"קוּם"}       | ${"q̟uːm"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("edge cases", () => {
    test.each`
      description                                                            | hebrew              | transliteration
      ${"const yod with hiriq as vowel"}                                     | ${"יַ֣יִן"}         | ${"ˈjaːjin"}
      ${"final hiriq yod with maqaf"}                                        | ${"וַֽיְהִי־כֵֽן׃"} | ${"ˌvaˑjhiː-ˈχeːen"}
      ${"hiriq followed by const yod (fake word)"}                           | ${"רִיֵם"}          | ${"ʀ̟iːjem"}
      ${"consonantal vav with holem as vowel"}                               | ${"עָוֺ֖ן"}         | ${"ʕɔːˈvoːon"}
      ${"consonantal vav with holem vav as vowel"}                           | ${"עָו֑וֹן"}        | ${"ʕɔːˈvoːon"}
      ${"consonantal vav with holem, holem vav, and shureq (post biblical)"} | ${"עֲוֹנוֹתֵ֑ינוּ"} | ${"ʕavoːnoːˈθeːnuː"}
      ${"initial shureq"}                                                    | ${"וּמִן"}          | ${"wumin"}
      ${"initial shureq in closed syllable"}                                 | ${"וּלְמִקְוֵ֥ה"}   | ${"wulmiq̟ˈveː"}
      ${"bgdkpt letter with mater"}                                          | ${"בִּיטוֹן"}       | ${"biːtˁoːn"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });
});

describe("divine name", () => {
  test.each`
    description                    | hebrew           | transliteration
    ${"by itself"}                 | ${"יְהוָ֥ה"}     | ${"ʔaðoːˈnɔːj"}
    ${"with a maqqef"}             | ${"אֶת־יְהוָ֤ה"} | ${"ʔɛθ-ʔaðoːˈnɔːj"}
    ${"with a preposition"}        | ${"בַּֽיהוָ֔ה"}  | ${"baː-ʔaðoːˈnɔːj"}
    ${"with latin char following"} | ${"יְהוָ֥ה,"}    | ${"ʔaðoːˈnɔːj,"}
    ${"pointed as elohim"}         | ${"יֱהוִה֙"}     | ${"ʔɛloːˈhiːim"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("qamets qatan", () => {
  test.each`
    description            | hebrew           | transliteration
    ${"standard"}          | ${"כָּל־הָעָ֖ם"} | ${"kʰɔl-hɔːˈʕɔːɔm"}
    ${"with hatef qamets"} | ${"נָעֳמִי֙"}    | ${"nɔːʕɔˈmiː"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});
