import { transliterate, Schema } from "../src/index";

interface Inputs {
  hebrew: string;
  transliteration: string;
  options?: Partial<Schema>;
}
/**
 * most tests use taamim
 */
describe("using default options", () => {
  describe("basic tests", () => {
    test.each`
      description                    | hebrew                           | transliteration
      ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"ʾbgdhwzḥṭykklmmnnsʿppṣṣqršt"}
      ${"sin ligature w/o vowels"}   | ${"שׂגב"}                        | ${"śgb"}
      ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"raʿal"}
      ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. raʿal"}
      ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n raʿal"}
      ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"}             | ${"raʿal  raʿal"}
      ${"taamim, but not vowels"}    | ${"אֽנכ֖י יהו֣ה אלה֑יך"}         | ${"ʾnky yhwh ʾlhyk"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
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
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });

    describe("furtive", () => {
      test.each`
        description               | hebrew         | transliteration
        ${"furtive patach, chet"} | ${"נֹ֖חַ"}     | ${"nōaḥ"}
        ${"furtive patach, ayin"} | ${"רָקִ֖יעַ"}  | ${"rāqîaʿ"}
        ${"furtive patach, he"}   | ${"גָּבֹ֗הַּ"} | ${"gābōah"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
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
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });

    describe("shewa", () => {
      test.each`
        description                                     | hebrew              | transliteration
        ${"vocal shewa"}                                | ${"סְלִ֣ק"}         | ${"sǝliq"}
        ${"silent shewa"}                               | ${"סַלְכָ֣ה"}       | ${"salkâ"}
        ${"final shewa"}                                | ${"כָּ֣ךְ"}         | ${"kāk"}
        ${"two final shewas"}                           | ${"קָטַ֣לְתְּ"}     | ${"qāṭalt"}
        ${"omitted dagesh chazaq after article, yod"}   | ${"הַיְאֹ֗ר"}       | ${"hayǝʾōr"}
        ${"omitted dagesh chazaq after article, mem"}   | ${"הַמְיַלֶּ֗דֶת"}  | ${"hamǝyalledet"}
        ${"omitted dagesh chazaq after article, lamed"} | ${"הַלְוִיִּ֔ם"}    | ${"halǝwiyyim"}
        ${"silent shewa and ligature consonant"}        | ${"אַשְׁכְּנַזִּי"} | ${"ʾaškǝnazzî"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
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
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
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
        ${"bgdkpt letter with mater"}                                          | ${"בִּיטוֹן"}      | ${"bîṭôn"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew)).toBe(transliteration);
      });
    });
  });

  describe("divine name", () => {
    test.each`
      description             | hebrew           | transliteration
      ${"by itself"}          | ${"יְהוָ֥ה"}     | ${"yhwh"}
      ${"with a maqqef"}      | ${"אֶת־יְהוָ֤ה"} | ${"ʾet-yhwh"}
      ${"with a preposition"} | ${"בַּֽיהוָ֔ה"}  | ${"ba-yhwh"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });

  describe("qamets qatan", () => {
    test.each`
      description            | hebrew           | transliteration
      ${"standard"}          | ${"כָּל־הָעָ֖ם"} | ${"kol-hāʿām"}
      ${"with hatef qamets"} | ${"נָעֳמִי֙"}    | ${"noʿŏmî"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });
});

/**
 * users should have the ability to enter any optional argument
 * even if it is not part of the SBL schema
 */
describe("extending SBL schema for optional arguments", () => {
  describe("basic tests", () => {
    test.each`
      description             | hebrew      | transliteration
      ${"syllable separator"} | ${"רַ֛עַל"} | ${"ra-ʿal"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, { SYLLABLE_SEPARATOR: "-" })).toBe(transliteration);
    });
  });

  describe("consonant features", () => {
    describe("spirantization and ligature tests", () => {
      test.each`
        description              | hebrew       | transliteration
        ${"unspirantized bet"}   | ${"בָּ֣ם"}   | ${"Bām"}
        ${"spirantized bet"}     | ${"אָ֣ב"}    | ${"ʾāb"}
        ${"unspirantized gimel"} | ${"גָּדַ֣ל"} | ${"Gādal"}
        ${"spirantized gimel"}   | ${"חָ֣ג"}    | ${"ḥāg"}
        ${"unspirantized dalet"} | ${"דָּ֣ם"}   | ${"Dām"}
        ${"spirantized dalet"}   | ${"סַ֣ד"}    | ${"sad"}
        ${"unspirantized kaf"}   | ${"כָּמָ֣ר"} | ${"Kāmār"}
        ${"spirantized kaf"}     | ${"לֵ֣ךְ"}   | ${"lēk"}
        ${"unspirantized peh"}   | ${"פֹּ֣ה"}   | ${"Pōh"}
        ${"spirantized peh"}     | ${"אֶ֣לֶף"}  | ${"ʾelep"}
        ${"unspirantized tav"}   | ${"תָּ֣ם"}   | ${"Tām"}
        ${"spirantized tav"}     | ${"מַ֣ת"}    | ${"mat"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        const options: Partial<Schema> = {
          BET_DAGESH: "B",
          GIMEL_DAGESH: "G",
          DALET_DAGESH: "D",
          KAF_DAGESH: "K",
          PE_DAGESH: "P",
          TAV_DAGESH: "T"
        };
        expect(transliterate(hebrew, options)).toBe(transliteration);
      });
    });

    describe("dagesh chazaq", () => {
      test.each`
        description                                 | hebrew           | transliteration | options
        ${"dagesh chazaq - false"}                  | ${"שַׁבָּת֔וֹן"} | ${"šabātôn"}    | ${{ DAGESH_CHAZAQ: false }}
        ${"dagesh chazaq - false, different chars"} | ${"שַׁבָּת֔וֹן"} | ${"šavātôn"}    | ${{ DAGESH_CHAZAQ: false, BET: "v" }}
        ${"dagesh chazaq - false, different chars"} | ${"שַׁבָּת֔וֹן"} | ${"šabātôn"}    | ${{ DAGESH_CHAZAQ: false, BET: "v", BET_DAGESH: "b" }}
        ${"dagesh chazaq - true, different chars"}  | ${"שַׁבָּת֔וֹן"} | ${"šabbātôn"}   | ${{ DAGESH_CHAZAQ: true, BET: "v", BET_DAGESH: "b" }}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration, options } = inputs;
        expect(transliterate(hebrew, options)).toBe(transliteration);
      });
    });
  });

  describe("additional features", () => {
    test.each`
      description           | hebrew                    | transliteration      | options
      ${"cluster feature"}  | ${"הַזֹּאת"}              | ${"hatzōʾt"}         | ${{ ADDITIONAL_FEATURES: [{ FEATURE: "cluster", HEBREW: "זּ", TRANSLITERATION: "tz" }] }}
      ${"syllable feature"} | ${"בְּרֵאשִׁ֖ית בָּרָ֣א"} | ${"bǝRAYšît bārāʾ"}  | ${{ ADDITIONAL_FEATURES: [{ FEATURE: "syllable", HEBREW: "רֵא", TRANSLITERATION: "RAY" }] }}
      ${"word feature"}     | ${"וְאֵ֥ת הָאָֽרֶץ"}      | ${"wǝʾēt The Earth"} | ${{ ADDITIONAL_FEATURES: [{ FEATURE: "word", HEBREW: "הָאָרֶץ", TRANSLITERATION: "The Earth" }] }}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration, options } = inputs;
      expect(transliterate(hebrew, options)).toBe(transliteration);
    });
  });

  describe("stress marks", () => {
    test.each`
      description                   | hebrew         | transliteration | options
      ${"before-syllable"}          | ${"דָּבָ֑ר"}   | ${"dāˈbār"}     | ${{ STRESS_MARKER: { location: "before-syllable", mark: "ˈ" } }}
      ${"after-syllable"}           | ${"דָּבָ֑ר"}   | ${"dābārˈ"}     | ${{ STRESS_MARKER: { location: "after-syllable", mark: "ˈ" } }}
      ${"before-vowel"}             | ${"מֶ֣לֶךְ"}   | ${"ḿelek"}      | ${{ STRESS_MARKER: { location: "before-vowel", mark: "\u0301" } }}
      ${"after-vowel"}              | ${"מֶ֣לֶךְ"}   | ${"mélek"}      | ${{ STRESS_MARKER: { location: "after-vowel", mark: "\u0301" } }}
      ${"after-vowel with mater"}   | ${"אֱלֹהִ֔ים"} | ${"ʾĕlōhî́m"}    | ${{ STRESS_MARKER: { location: "after-vowel", mark: "\u0301" } }}
      ${"after-vowel with digraph"} | ${"בֵּ֣ית"}    | ${"beít"}       | ${{ TSERE_YOD: "ei", STRESS_MARKER: { location: "after-vowel", mark: "\u0301" } }}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration, options } = inputs;
      expect(transliterate(hebrew, options)).toBe(transliteration);
    });
  });
});

describe("using custom schema (SBL simple)", () => {
  const schema = new Schema({
    ALEF: "",
    BET: "v",
    BET_DAGESH: "b",
    GIMEL: "g",
    DALET: "d",
    HE: "h",
    VAV: "v",
    ZAYIN: "z",
    HET: "kh",
    TET: "t",
    YOD: "y",
    KAF: "kh",
    KAF_DAGESH: "k",
    FINAL_KAF: "kh",
    LAMED: "l",
    MEM: "m",
    FINAL_MEM: "m",
    NUN: "n",
    FINAL_NUN: "n",
    SAMEKH: "s",
    AYIN: "",
    PE: "f",
    PE_DAGESH: "p",
    FINAL_PE: "f",
    TSADI: "ts",
    FINAL_TSADI: "ts",
    QOF: "q",
    RESH: "r",
    SIN: "s",
    SHIN: "sh",
    TAV: "t",
    DAGESH: "",
    DAGESH_CHAZAQ: true,
    VOCAL_SHEVA: "e",
    PATAH: "a",
    HATAF_PATAH: "a",
    QAMATS: "a",
    HATAF_QAMATS: "o",
    SEGOL: "e",
    HATAF_SEGOL: "e",
    TSERE: "e",
    HIRIQ: "i",
    HOLAM: "o",
    QUBUTS: "u",
    QAMATS_HE: "ah",
    SEGOL_HE: "eh",
    TSERE_HE: "eh",
    SEGOL_YOD: "e",
    HIRIQ_YOD: "i",
    TSERE_YOD: "e",
    FURTIVE_PATAH: "a",
    QAMATS_QATAN: "o",
    HOLAM_VAV: "o",
    SHUREQ: "u",
    MS_SUFX: "ayw",
    PASEQ: "",
    SOF_PASUQ: "",
    MAQAF: "-",
    DIVINE_NAME: "yhwh",
    longVowels: true,
    sqnmlvy: true,
    qametsQatan: true,
    wawShureq: true,
    article: true,
    allowNoNiqqud: true
  });

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
        description                          | hebrew         | transliteration
        ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}   | ${"boser"}
        ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"} | ${"masger"}
        ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"} | ${"minnezar"}
        ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}   | ${"maggal"}
        ${"mappiq he"}                       | ${"וְלַ֨הּ"}   | ${"velah"}
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
});
