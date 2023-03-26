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
    ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"ˈʀ̟aʕal"}
    ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. ˈʀ̟aʕal"}
    ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n ˈʀ̟aʕal"}
    ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"}             | ${"ˈʀ̟aʕal  ˈʀ̟aʕal"}
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
      ${"unspirantized gimel"} | ${"גָּדַ֣ל"} | ${"gɔˈðal"}
      ${"spirantized gimel"}   | ${"חָ֣ג"}    | ${"ˈħɔːɔʁ"}
      ${"unspirantized dalet"} | ${"דָּ֣ם"}   | ${"ˈdɔːɔm"}
      ${"spirantized dalet"}   | ${"סַ֣ד"}    | ${"ˈsað"}
      ${"unspirantized kaf"}   | ${"כָּמָ֣ר"} | ${"kʰɔˈmɔːɔʀ̟"}
      ${"spirantized kaf"}     | ${"לֵ֣ךְ"}   | ${"ˈleχ"}
      ${"unspirantized peh"}   | ${"פֹּ֣ה"}   | ${"ˈpʰoːoh"}
      ${"spirantized peh"}     | ${"אֶ֣לֶף"}  | ${"ˈʔɛlɛf"}
      ${"unspirantized tav"}   | ${"תָּ֣ם"}   | ${"ˈtʰɔːɔm"}
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
      description                                | hebrew            | transliteration
      ${"furtive patach, chet"}                  | ${"נֹ֖חַ"}        | ${"ˈnoaħ"}
      ${"furtive patach, chet preceded by vav "} | ${"ר֑וּחַ"}       | ${"ˈʀ̟uːwaħ"}
      ${"furtive patach, chet preceded by yod "} | ${"שְׁלִ֔יחַ"}    | ${"ʃaˈliːjaħ"}
      ${"furtive patach, ayin"}                  | ${"כִּשְׁמֹ֤עַ"}  | ${"kʰiʃˈmoaʕ"}
      ${"furtive patach, ayin preceded by yod"}  | ${"רָקִ֖יעַ"}     | ${"ʀ̟ɔˈq̟iːjaʕ"}
      ${"furtive patach, ayin preceded by vav"}  | ${"יֵשׁ֡וּעַ"}    | ${"jeˈʃuːwaʕ"}
      ${"furtive patach, he"}                    | ${"גָּבֹ֗הַּ"}    | ${"gɔˈvoːoah"}
      ${"furtive patach, he  preceded by vav"}   | ${"אֱלֹ֨והַּ"}    | ${"ʔɛˈloːwah"}
      ${"furtive patach, he  preceded by yod"}   | ${"מַגְבִּ֥יהַּ"} | ${"maʁˈbiːjah"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("dagesh", () => {
    test.each`
      description                          | hebrew            | transliteration
      ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}      | ${"ˈbosɛʀ̟"}
      ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"}    | ${"masˈgeːeʀ̟"}
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"}    | ${"minnaˈzɔːɔʀ̟"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}      | ${"maˈgɔːɔl"}
      ${"doubled shin"}                    | ${"מַשָּׁ֥א"}     | ${"maˈʃׁɔːɔ"}
      ${"doubled tsadi"}                   | ${"לְבִצָּר֔וֹן"} | ${"lavisˁsˁɔˈʀ̟oːn"}
      ${"yod with dagesh"}                 | ${"וַיִּלָּפֵ֑ת"} | ${"vaɟɟillɔˈfeθ"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("shewa", () => {
    test.each`
      description                              | hebrew              | transliteration
      ${"vocal shewa"}                         | ${"סְלִ֣ק"}         | ${"saˈliq̟"}
      ${"silent shewa"}                        | ${"סַלְכָ֣ה"}       | ${"salˈχɔː"}
      ${"final shewa"}                         | ${"כָּ֣ךְ"}         | ${"ˈkʰɔχ"}
      ${"two final shewas"}                    | ${"קָטַ֣לְתְּ"}     | ${"q̟ɔˈtˁaltʰ"}
      ${"omitted dagesh chazaq after article"} | ${"הַיְאֹ֗ר"}       | ${"hajaˈʔoːoʀ̟"}
      ${"silent shewa and ligature consonant"} | ${"אַשְׁכְּנַזִּי"} | ${"ʔaʃkʰanazziː"}
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
      ${"hiriq yod"}  | ${"עִ֔יר"}      | ${"ˈʕiːʀ̟"}
      ${"tsere yod"}  | ${"אֵ֤ין"}      | ${"ˈʔeːn"}
      ${"seghol yod"} | ${"אֱלֹהֶ֑יךָ"} | ${"ʔɛloˈhɛːχɔ"}
      ${"holem vav"}  | ${"ס֣וֹא"}      | ${"ˈsoː"}
      ${"qamets he"}  | ${"עֵצָ֖ה"}     | ${"ʕeˈsˁɔː"}
      ${"seghol he"}  | ${"יִקְרֶ֥ה"}   | ${"jiq̟ˈʀ̟ɛː"}
      ${"tsere he"}   | ${"הָאַרְיֵ֔ה"} | ${"hɔʔaʀ̟ˈjɛː"}
      ${"shureq"}     | ${"קוּם"}       | ${"q̟uːm"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("edge cases", () => {
    test.each`
      description                                                            | hebrew              | transliteration
      ${"const yod with hiriq as vowel"}                                     | ${"יַ֣יִן"}         | ${"ˈjajin"}
      ${"final hiriq yod with maqaf"}                                        | ${"וַֽיְהִי־כֵֽן"}  | ${"vajahiː-χen"}
      ${"hiriq followed by const yod (fake word)"}                           | ${"רִיֵם"}          | ${"ʀ̟ijem"}
      ${"consonantal vav with holem as vowel"}                               | ${"עָוֺ֖ן"}         | ${"ʕɔˈvoːon"}
      ${"consonantal vav with holem vav as vowel"}                           | ${"עָו֑וֹן"}        | ${"ʕɔˈvoːn"}
      ${"consonantal vav with holem, holem vav, and shureq (post biblical)"} | ${"עֲוֹנוֹתֵ֑ינוּ"} | ${"ʕavonoːˈθeːnuː"}
      ${"initial shureq"}                                                    | ${"וּמִן"}          | ${"uːmin"}
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
    ${"with a preposition"}        | ${"בַּֽיהוָ֔ה"}  | ${"ba-ʔaðoːˈnɔːj"}
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
    ${"standard"}          | ${"כָּל־הָעָ֖ם"} | ${"kʰɔl-hɔˈʕɔːɔm"}
    ${"with hatef qamets"} | ${"נָעֳמִי֙"}    | ${"nɔʕoˈmiː"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});
