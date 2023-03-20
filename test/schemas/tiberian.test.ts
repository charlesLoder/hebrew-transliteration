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
      description                                | hebrew            | transliteration
      ${"furtive patach, chet"}                  | ${"נֹ֖חַ"}        | ${"ˈnoaħ"}
      ${"furtive patach, chet preceded by vav "} | ${"ר֑וּחַ"}       | ${"ˈʀ̟u:waħ"}
      ${"furtive patach, chet preceded by yod "} | ${"שְׁלִ֔יחַ"}    | ${"ʃaˈli:jaħ"}
      ${"furtive patach, ayin"}                  | ${"כִּשְׁמֹ֤עַ"}  | ${"kʰiʃˈmoaʕ"}
      ${"furtive patach, ayin preceded by yod"}  | ${"רָקִ֖יעַ"}     | ${"ʀ̟ɔˈq̟i:jaʕ"}
      ${"furtive patach, ayin preceded by vav"}  | ${"יֵשׁ֡וּעַ"}    | ${"jeˈʃu:waʕ"}
      ${"furtive patach, he"}                    | ${"גָּבֹ֗הַּ"}    | ${"gɔˈvoah"}
      ${"furtive patach, he  preceded by vav"}   | ${"אֱלֹ֨והַּ"}    | ${"ʔɛˈlo:wah"}
      ${"furtive patach, he  preceded by yod"}   | ${"מַגְבִּ֥יהַּ"} | ${"maʁˈbi:jah"}
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
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"}    | ${"minnaˈzɔʀ̟"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}      | ${"maˈggɔl"}
      ${"doubled shin"}                    | ${"מַשָּׁ֥א"}     | ${"maˈʃʃɔ"}
      ${"doubled tsadi"}                   | ${"לְבִצָּר֔וֹן"} | ${"lavisˁsˁɔˈʀ̟o:n"}
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
      ${"silent shewa"}                        | ${"סַלְכָ֣ה"}       | ${"salˈχɔ:"}
      ${"final shewa"}                         | ${"כָּ֣ךְ"}         | ${"ˈkʰɔχ"}
      ${"two final shewas"}                    | ${"קָטַ֣לְתְּ"}     | ${"q̟ɔˈtˁaltʰ"}
      ${"omitted dagesh chazaq after article"} | ${"הַיְאֹ֗ר"}       | ${"hajaˈʔoʀ̟"}
      ${"silent shewa and ligature consonant"} | ${"אַשְׁכְּנַזִּי"} | ${"ʔaʃkʰanazzi:"}
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
      ${"holem vav"}  | ${"ס֣וֹא"}      | ${"ˈso:"}
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
      ${"final hiriq yod with maqaf"}                                        | ${"וַֽיְהִי־כֵֽן"}  | ${"vajahi:-χen"}
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
    ${"by itself"}                 | ${"יְהוָ֥ה"}     | ${"ʔaðo:ˈnɔ:j"}
    ${"with a maqqef"}             | ${"אֶת־יְהוָ֤ה"} | ${"ʔɛθ-ʔaðo:ˈnɔ:j"}
    ${"with a preposition"}        | ${"בַּֽיהוָ֔ה"}  | ${"ba-ʔaðo:ˈnɔ:j"}
    ${"with latin char following"} | ${"יְהוָ֥ה,"}    | ${"ʔaðo:ˈnɔ:j,"}
    ${"pointed as elohim"}         | ${"יֱהוִה֙"}     | ${"ʔɛloːˈhiːim"}
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
