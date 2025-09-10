import { describe, expect, test } from "vitest";
import { transliterate } from "../../src/index";
import { tiberian } from "../../src/schemas/index";

interface Inputs {
  hebrew: string;
  transliteration: string;
}

const schema = tiberian;

describe("basic tests", () => {
  test("consontants", () => {
    const consonants = "אבגדהוזחטיכךלמםנןסעפףצץקרשת";
    expect(transliterate(consonants, { ...schema, allowNoNiqqud: true, STRESS_MARKER: undefined })).toBe(
      "vʁðhvzħtˁjχχlmmnnsʕffsˁsˁq̟ʀ̟ʃθ"
    );
  });

  test.each`
    description                    | hebrew               | transliteration
    ${"no special cases"}          | ${"רַ֛עַל"}          | ${"ˈʀ̟aːʕal"}
    ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}      | ${"v1. ˈʀ̟aːʕal"}
    ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}    | ${"v1.\n ˈʀ̟aːʕal"}
    ${"multiple words and passeq"} | ${"רַ֛עַל ׀ רַ֛עַל"} | ${"ˈʀ̟aːʕal  ˈʀ̟aːʕal"}
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
      description                                 | hebrew                 | transliteration
      ${"dagesh qal beginning of word"}           | ${"בֹּ֔סֶר"}           | ${"ˈboːsɛrˁ"}
      ${"dagesh qal middle of word"}              | ${"מַסְגֵּ֖ר"}         | ${"masˈgeːeʀ̟"}
      ${"dagesh chazaq - not BeGaDKePhaT"}        | ${"מִנְּזָר֜"}         | ${"minnaˈzɔːɔrˁ"}
      ${"dagesh chazaq - BeGaDKePhaT"}            | ${"מַגָּ֖ל"}           | ${"magˈgɔːɔl"}
      ${"doubled shin"}                           | ${"מַשָּׁ֥א"}          | ${"maʃˈʃɔː"}
      ${"yod with dagesh"}                        | ${"וַיִּלָּפֵ֑ת"}      | ${"vaɟɟillɔːˈfeːeθ"}
      ${"aleph with dagesh (no doubling)"}        | ${"תָּבִ֣יאּוּ"}       | ${"tʰɔːˈviːiʔuː"}
      ${"dagesh chazaq - prev word in construct"} | ${"בְחַגְוֵי־סֶּ֖לַע"} | ${"vaħaʁveː-sˈsɛːlaʕ"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("resh", () => {
    // For "pharyngealized, with a sin", the original text (1 Sam 17:55) does NOT have a maqqef,
    // but it is in construct. Since we can't tell if it is in construct w/o the maqqef, and the test is concerend about the resh,
    // the maqqef is added to the test to simulate the correct result.
    test.each`
      description                                                                            | hebrew             | transliteration
      ${"basic"}                                                                             | ${"דָּבָ֫ר"}       | ${"dɔːˈvɔːɔʀ̟"}
      ${"pharyngealized, immediate contact with a preceding alveolar in different syllable"} | ${"בְּמִזְרֶ֖ה"}   | ${"bamizˈrˁɛː"}
      ${"pharyngealized, in the same syllable, as a preceding alveolar"}                     | ${"דַּרְכּ֖וֹ"}    | ${"dɑrˁˈkʰoː"}
      ${"regular, in a different syllable, than a preceding alveolar"}                       | ${"לָֽרָקִ֖יעַ"}   | ${"ˌlɔːʀ̟ɔːˈq̟iːjaʕ"}
      ${"pharyngealized, in the same foot, as a preceding alveolar"}                         | ${"צְרוּפָ֔ה"}     | ${"sˁɑrˁuːˈfɔː"}
      ${"pharyngealized, immediate contact with a following lamed or nun"}                   | ${"עַרְלֵי־לֵֽב׃"} | ${"ʕɑrˁleː-ˈleːev"}
      ${"pharyngealized, in the same foot with following a lamed or nun"}                    | ${"רְנָנָ֣ה"}      | ${"rˁɑnɔːˈnɔː"}
      ${"regular, in a different syllable with following a lamed or nun"}                    | ${"עֲרֵלִ֖ים"}     | ${"ʕaʀ̟eːˈliːim"}
      ${"pharyngealized, with a sin"}                                                        | ${"שַׂר־"}         | ${"sɑrˁ-"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("begadkephat", () => {
    test.each`
      description                   | hebrew           | transliteration
      ${"bet dagesh chazaq"}        | ${"לְאַבֵּ֔ד"}   | ${"laʔabˈbeːeð"}
      ${"bet dagesh qal initial"}   | ${"בָּח֥וּר"}    | ${"bɔːˈħuːuʀ̟"}
      ${"bet dagesh qal medial"}    | ${"מִדְבַּ֥ר"}   | ${"miðˈbaːaʀ̟"}
      ${"gimel dagesh chazaq"}      | ${"מְנַגֵּ֩חַ֩"} | ${"managˈgeːaħ"}
      ${"gimel dagesh qal initial"} | ${"גֵּ֖ר"}       | ${"ˈgeːeʀ̟"}
      ${"gimel dagesh qal medial"}  | ${"הִרְגִּ֖יז"}  | ${"hiʀ̟ˈgiːiz"}
      ${"dalet dagesh chazaq"}      | ${"אַדִּ֖יר"}    | ${"ʔadˈdiːiʀ̟"}
      ${"dalet dagesh qal initial"} | ${"מַסְגֵּ֑ר"}   | ${"masˈgeːeʀ̟"}
      ${"dalet dagesh qal medial"}  | ${"תִּפְדֶּ֔ה"}  | ${"tʰifˈdɛː"}
      ${"kaf dagesh chazaq"}        | ${"מְבַכּ֖וֹת"}  | ${"mavakˈkʰoːoθ"}
      ${"kaf dagesh qal initial"}   | ${"כְּלִ֣י"}     | ${"kʰaˈliː"}
      ${"kaf dagesh qal medial"}    | ${"נִמְכַּ֨ר"}   | ${"nimˈkʰaːaʀ̟"}
      ${"pe dagesh chazaq"}         | ${"סַפִּ֖יר"}    | ${"sapˈpʰiːiʀ̟"}
      ${"pe dagesh qal initial"}    | ${"פֶּ֛ה"}       | ${"ˈpʰɛː"}
      ${"pe dagesh qal medial"}     | ${"מִסְפַּ֤ר"}   | ${"misˈpʰaːaʀ̟"}
      ${"tav dagesh chazaq"}        | ${"מִתַּ֤חַת"}   | ${"mitˈtʰaːħaθ"}
      ${"tav dagesh qal initial"}   | ${"תִּפְדֶּ֔ה"}  | ${"tʰifˈdɛː"}
      ${"tav dagesh qal medial"}    | ${"יִכְתֹּ֤ב"}   | ${"jiχˈtʰoːov"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("aleph", () => {
    test.each`
      description            | hebrew             | transliteration
      ${"regular aleph"}     | ${"לְאַבֵּ֔ד"}     | ${"laʔabˈbeːeð"}
      ${"quiesced aleph"}    | ${"בְּרֵאשִׁ֖ית"}  | ${"baʀ̟eːˈʃiːiθ"}
      ${"aleph with shureq"} | ${"הִשִּׁיא֛וּךָ"} | ${"hiʃʃiːˈʔuːχɔː"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("has digraph", () => {
    describe("tet", () => {
      // tet
      test.each`
        description        | hebrew          | transliteration
        ${"pharygealized"} | ${"טַ֫עַם"}     | ${"ˈtˁɑːʕam"}
        ${"doubled"}       | ${"חַ֭טָּאִים"} | ${"ħɑttˁɔːˈʔiːim"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });

    describe("tsadi", () => {
      // tet
      test.each`
        description        | hebrew            | transliteration
        ${"pharygealized"} | ${"צֹ֣הַר"}       | ${"ˈsˁoːhaʀ̟"}
        ${"doubled"}       | ${"מִצְּעִירָ֑ה"} | ${"missˁiʕiːˈʀ̟ɔː"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });
  });

  describe("dagesh form has digraph", () => {
    describe("tav", () => {
      test.each`
        description      | hebrew           | transliteration
        ${"spriantized"} | ${"תֹאכְל֣וּ"}   | ${"θoːoχˈluː"}
        ${"aspirated"}   | ${"תֹּאכְל֖וּן"} | ${"tʰoːoχˈluːun"}
        ${"doubled"}     | ${"וַתֵּ֨שֶׁב"}  | ${"vatˈtʰeːʃɛv"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });

    describe("kaf", () => {
      test.each`
        description              | hebrew          | transliteration
        ${"spriantized"}         | ${"יָדְךָ֖"}    | ${"jɔːɔðˈχɔː"}
        ${"aspirated"}           | ${"כֹּאֲבִ֗ים"} | ${"kʰoːʔaˈviːim"}
        ${"doubled"}             | ${"וְחִכֵּ֕ךְ"} | ${"viħikˈkʰeːeχ"}
        ${"doubled with shureq"} | ${"וַיֻּכּ֗וּ"} | ${"vaɟɟukˈkʰuː"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });

    describe("peh", () => {
      test.each`
        description              | hebrew            | transliteration
        ${"spriantized"}         | ${"רִשְׁפֵ֔י"}    | ${"ʀ̟iʃˈfeː"}
        ${"aspirated"}           | ${"תִּסְפְּר֖וּ"} | ${"tʰispʰaˈʀ̟uː"}
        ${"doubled"}             | ${"הַפֶּ֔ה"}      | ${"hapˈpʰɛː"}
        ${"doubled with shureq"} | ${"הַפּ֔וּר"}     | ${"hapˈpʰuːuʀ̟"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });
  });
});

describe("mater features", () => {
  // technically, not all there are maters, but they behave similarly
  describe("typical", () => {
    test.each`
      description                 | hebrew          | transliteration
      ${"hiriq yod"}              | ${"עִ֔יר"}      | ${"ˈʕiːiʀ̟"}
      ${"tsere yod"}              | ${"אֵ֤ין"}      | ${"ˈʔeːen"}
      ${"seghol yod"}             | ${"אֱלֹהֶ֑יךָ"} | ${"ʔɛloːˈhɛːχɔː"}
      ${"holem vav"}              | ${"ס֣וֹא"}      | ${"ˈsoː"}
      ${"qamets he"}              | ${"עֵצָ֖ה"}     | ${"ʕeːˈsˁɔː"}
      ${"patah he"}               | ${"מַה־"}       | ${"maː-"}
      ${"seghol he"}              | ${"יִקְרֶ֥ה"}   | ${"jiq̟ˈʀ̟ɛː"}
      ${"seghol he (unaccented)"} | ${"עֹ֥שֶׂה"}    | ${"ˈʕoːsɛː"}
      ${"tsere he"}               | ${"הָאַרְיֵ֔ה"} | ${"hɔːʔaʀ̟ˈjeː"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });

  describe("shureq", () => {
    test.each`
      description                                      | hebrew              | transliteration
      ${"shureq"}                                      | ${"לָק֣וּם"}        | ${"lɔːˈq̟uːum"}
      ${"initial shureq"}                              | ${"וּלְכֹ֖ל"}       | ${"wulˈχoːol"}
      ${"initial shureq in closed syllable"}           | ${"וּלְמִקְוֵ֥ה"}   | ${"wulmiq̟ˈveː"}
      ${"initial shureq with a gaya, closed syllable"} | ${"וּֽבְתוֹרָת֥וֹ"} | ${"ˌwuˑvθoːʀ̟ɔːˈθoː"}
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
      ${"hiriq followed by const yod (fake word)"}                           | ${"רִיֵם"}          | ${"ʀ̟iːˈjeːem"}
      ${"consonantal vav with holem as vowel"}                               | ${"עָוֺ֖ן"}         | ${"ʕɔːˈvoːon"}
      ${"consonantal vav with holem vav as vowel"}                           | ${"עָו֑וֹן"}        | ${"ʕɔːˈvoːon"}
      ${"consonantal vav with holem, holem vav, and shureq (post biblical)"} | ${"עֲוֹנוֹתֵ֑ינוּ"} | ${"ʕavoːnoːˈθeːnuː"}
      ${"bgdkpt letter with mater"}                                          | ${"בִּ֣י"}          | ${"ˈbiː"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });
});

describe("divine name", () => {
  test.each`
    description                    | hebrew           | transliteration
    ${"by itself"}                 | ${"יְהוָ֥ה"}     | ${"ʔaðoːˈnɔːɔj"}
    ${"with a maqqef"}             | ${"אֶת־יְהוָ֤ה"} | ${"ʔɛθ-ʔaðoːˈnɔːɔj"}
    ${"with a preposition"}        | ${"בַּֽיהוָ֔ה"}  | ${"ˌbaˑ-ʔaðoːˈnɔːɔj"}
    ${"with latin char following"} | ${"יְהוָ֥ה,"}    | ${"ʔaðoːˈnɔːɔj,"}
    ${"pointed as elohim"}         | ${"יֱהוִה֙"}     | ${"ʔɛloːˈhiːim"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("qere perpetuum 3fs", () => {
  test.each`
    description | hebrew     | transliteration
    ${"3fs"}    | ${"הִ֑וא"} | ${"ˈhiː"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("jerusalem", () => {
  test.each`
    description      | hebrew                | transliteration
    ${"with patach"} | ${"יְרוּשָׁלִַ֗ם"}    | ${"jaʀ̟uːʃɔːˈlaːjim"}
    ${"with qamets"} | ${"בִּירוּשָׁלִָֽם׃"} | ${"biːʀ̟uːʃɔːˈlɔːjim"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("issachar", () => {
  test.each`
    description   | hebrew             | transliteration
    ${"no vav"}   | ${"יִשָּׂשכָ֖ר"}   | ${"jissɔːˈχɔːɔʀ̟"}
    ${"with vav"} | ${"וְיִשָּׂשכָ֖ר"} | ${"vajissɔːˈχɔːɔʀ̟"}
  `("$description", (inputs: Inputs) => {
    const { hebrew, transliteration } = inputs;
    expect(transliterate(hebrew, schema)).toBe(transliteration);
  });
});

describe("vowel features", () => {
  describe("sheva", () => {
    test.each`
      description                                     | hebrew              | transliteration
      ${"vocal sheva"}                                | ${"סְלִ֣ק"}         | ${"saˈliːiq̟"}
      ${"silent sheva"}                               | ${"סַלְכָ֣ה"}       | ${"salˈχɔː"}
      ${"final sheva"}                                | ${"כָּ֣ךְ"}         | ${"ˈkʰɔːɔχ"}
      ${"two final shevas"}                           | ${"קָטַ֣לְתְּ"}     | ${"q̟ɔːˈtˁɑːɑltʰ"}
      ${"omitted dagesh chazaq after article"}        | ${"הַיְאֹ֗ר"}       | ${"hajˈʔoːoʀ̟"}
      ${"silent sheva and ligature consonant"}        | ${"אַשְׁכְּנַזִּי"} | ${"ʔaʃkʰanazˈziː"}
      ${"vocal sheva preceding guttural"}             | ${"בְּאֵ֥ר"}        | ${"beˈʔeːeʀ̟"}
      ${"vocal sheva preceding guttural with shureq"} | ${"שִׁלְּח֗וּךָ"}   | ${"ʃilluˈħuːχɔː"}
      ${"vocal sheva with minor gaya"}                | ${"וְֽהָיָ֗ה"}      | ${"ˌvɔˑhɔːˈjɔː"}
      ${"medial vocal sheva with minor gaya"}         | ${"אַ֥שְֽׁרֵי"}     | ${"ˈʔaːˌʃaˑʀ̟eː"}
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

  describe("back rounded ɑ", () => {
    describe("tet", () => {
      test.each`
        description                    | hebrew        | transliteration
        ${"onset of current syllable"} | ${"טַ֫עַם"}   | ${"ˈtˁɑːʕam"}
        ${"coda of current syllable"}  | ${"הַמְעַט֙"} | ${"hamˈʕɑːɑtˁ"}
        ${"onset of next syllable"}    | ${"חֲטָאָ֣ה"}  | ${"ħɑtˁɔːˈʔɔː"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });
    describe("tsade", () => {
      test.each`
        description                    | hebrew          | transliteration
        ${"onset of current syllable"} | ${"צַ֖יִד"}     | ${"ˈsˁɑːjið"}
        ${"coda of current syllable"}  | ${"רָחַ֤ץ"}     | ${"ʀ̟ɔːˈħɑːɑsˁ"}
        ${"onset of next syllable"}    | ${"מַזְרִ֣יעַ"} | ${"mɑzˈrˁiːjaʕ"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });
    describe("pharyngealized resh", () => {
      test.each`
        description                    | hebrew          | transliteration
        ${"onset of current syllable"} | ${"מַזְרִ֣יעַ"} | ${"mɑzˈrˁiːjaʕ"}
        ${"coda of current syllable"}  | ${"זַרְע֫וֹ"}   | ${"zɑrˁˈʕoː"}
        ${"onset of next syllable"}    | ${"מַזְרִ֣יעַ"} | ${"mɑzˈrˁiːjaʕ"}
      `("$description", (inputs: Inputs) => {
        const { hebrew, transliteration } = inputs;
        expect(transliterate(hebrew, schema)).toBe(transliteration);
      });
    });
  });

  describe("long vowel preceding sheva", () => {
    test.each`
      description                      | hebrew         | transliteration
      ${"From hayah"}                  | ${"הָיְתָ֥ה"}  | ${"hɔːɔjˈθɔː"}
      ${"From yashav"}                 | ${"יֵשְׁבוּ֙"} | ${"jeːeʃˈvuː"}
      ${"From yad"}                    | ${"יָדְךָ֖"}   | ${"jɔːɔðˈχɔː"}
      ${"From shamar"}                 | ${"שָׁמְר֥וּ"} | ${"ʃɔːɔmˈʀ̟uː"}
      ${"From shamar, participle"}     | ${"שֹׁמְרֵ֥י"} | ${"ʃoːomˈʀ̟eː"}
      ${"Qamets qatan, no epenthesis"} | ${"קָדְשֵׁ֧י"} | ${"q̟ɔðˈʃeː"}
    `("$description", (inputs: Inputs) => {
      const { hebrew, transliteration } = inputs;
      expect(transliterate(hebrew, schema)).toBe(transliteration);
    });
  });
});
