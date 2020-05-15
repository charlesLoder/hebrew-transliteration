import { transliterate } from "../src/transliterate";

describe("using default academic style", () => {
  describe("default options", () => {
    test("basic transliteration", () => {
      expect(transliterate("אֱלֹהִים")).toEqual("ʾĕlōhîm");
    });

    test("longer string of text", () => {
      expect(
        transliterate(
          "וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֨הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְהֹ֑ום וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃"
        )
      ).toEqual("wǝhāʾāreṣ hāyǝtâ tōhû wābōhû wǝḥōšek ʿal-pǝnê tǝhôm wǝrûaḥ ʾĕlōhîm mǝraḥepet ʿal-pǝnê hammāyim");
    });

    test("verse numbers", () => {
      expect(
        transliterate(`
    v.1 וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֨הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְהֹ֑ום וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃
    `)
      ).toEqual(`
    v.1 wǝhāʾāreṣ hāyǝtâ tōhû wābōhû wǝḥōšek ʿal-pǝnê tǝhôm wǝrûaḥ ʾĕlōhîm mǝraḥepet ʿal-pǝnê hammāyim
    `);
    });

    test("line breaks", () => {
      expect(
        transliterate(`
    אֱלֹהִים
    תֹורָה
    אִ֛ישׁ
    מַלְכֵי
    `)
      ).toEqual(`
    ʾĕlōhîm
    tôrâ
    ʾîš
    malkê
    `);
    });

    test("qametsQatan false", () => {
      expect(transliterate("כָּל־הָעָם")).toEqual("kāl-hāʿām");
    });
  });

  describe("qametsQatan true", () => {
    test("kol", () => {
      expect(transliterate("כָּל־הָעָם", { qametsQatan: true })).toEqual("kol-hāʿām");
    });

    test("ḥoq", () => {
      expect(transliterate("לְחָק־עוֹלָ֗ם", { qametsQatan: true })).toEqual("lǝḥoq-ʿôlām");
    });

    test("wayyāqom", () => {
      expect(transliterate("וַיָּ֥קָם קַ֛יִן אֶל־הֶ֥בֶל", { qametsQatan: true })).toEqual("wayyāqom qayin ʾel-hebel");
    });

    test("tayyāqom", () => {
      expect(transliterate("וַתָּ֤קָם הַצְּעִירָה֙", { qametsQatan: true })).toEqual("wattāqom haṣṣǝʿîrâ");
    });

    test("toknît (Ezk 28:12, 43:10)", () => {
      expect(transliterate("אֶת־תָּכְנִֽית חוֹתֵ֣ם תָּכְנִ֔ית", { qametsQatan: true })).toEqual(
        "ʾet-toknît ḥôtēm toknît"
      );
    });

    test("dorbān (1 Sam 13:21)", () => {
      expect(transliterate("וּלְהַצִּ֖יב הַדָּרְבָֽן", { qametsQatan: true })).toEqual("ûlǝhaṣṣîb haddorbān");
    });

    test("ḥonnenî", () => {
      expect(transliterate("פְּנֵה־אֵלַ֥י וְחָנֵּ֑נִי", { qametsQatan: true })).toEqual("pǝnê-ʾēlay wǝḥonnēnî");
    });

    test("ʾoklâ (1, with siluq)", () => {
      expect(transliterate("לָכֶ֥ם יִֽהְיֶ֖ה לְאָכְלָֽה", { qametsQatan: true })).toEqual("lākem yihyê lǝʾoklâ");
    });

    test("ʾoklâ (2)", () => {
      expect(transliterate("אֶת־כָּל־יֶ֥רֶק עֵ֖שֶׂב לְאָכְלָ֑ה", { qametsQatan: true })).toEqual(
        "ʾet-kol-yereq ʿēśeb lǝʾoklâ"
      );
    });

    test("ʾokel inflected", () => {
      expect(transliterate("לְפִ֣י אָכְל֑וֹ", { qametsQatan: true })).toEqual("lǝpî ʾoklô");
    });

    test("qorbān", () => {
      expect(transliterate("יָבִ֧יא אֶת־קָרְבָּנ֛וֹ לַיהוָ֖ה", { qametsQatan: true })).toEqual(
        "yābîʾ ʾet-qorbānô layhwh"
      );
    });

    test("qorbān w/ heavy suffix, Lev 7:38", () => {
      expect(transliterate("אֶת־קָרְבְּנֵיהֶ֛ם", { qametsQatan: true })).toEqual("ʾet-qorbǝnêhem");
    });

    test("qodqod (1)", () => {
      expect(transliterate("וּלְקָדְקֹ֖ד נְזִ֥יר", { qametsQatan: true })).toEqual("ûlǝqodqōd nǝzîr");
    });

    test("qodqod (2)", () => {
      expect(transliterate("וְעַ֥ד קָדְקֳדֶֽךָ", { qametsQatan: true })).toEqual("wǝʿad qodqŏdekā");
    });

    test("qodesh", () => {
      expect(transliterate("לְכָֽל־מַתְּנֹ֖ת קָדְשֵׁיהֶ֑ם", { qametsQatan: true })).toEqual("lǝkāl-mattǝnōt qodšêhem");
    });

    test("shoresh (1)", () => {
      expect(transliterate("שָׁרְשָׁם֙ בַּעֲמָלֵ֔ק", { qametsQatan: true })).toEqual("šoršām baʿămālēq");
    });

    test("shoresh (2)", () => {
      expect(transliterate("אֶת־שָׁרָשֶׁ֨יהָ", { qametsQatan: true })).toEqual("ʾet-šorāšêhā");
    });

    test("shoresh (3, with dagesh)", () => {
      expect(transliterate("מִשָּׁרָשָׁ֥יו יִפְרֶֽה", { qametsQatan: true })).toEqual("miššorāšāyw yiprê");
    });

    test("ʾobdan", () => {
      expect(transliterate("בְּאָבְדַ֖ן מוֹלַדְתִּֽי", { qametsQatan: true })).toEqual("bǝʾobdan môladtî");
    });

    test("ʾoben", () => {
      expect(transliterate("עַל־הָאָבְנָ֑יִם", { qametsQatan: true })).toEqual("ʿal-hāʾobnāyim");
    });

    test("ʾopen", () => {
      expect(transliterate("עַל־אָפְנָֽיו׃", { qametsQatan: true })).toEqual("ʿal-ʾopnāyw");
    });

    test("ʾopnî", () => {
      expect(transliterate("וְהָֽעָפְנִ֖י", { qametsQatan: true })).toEqual("wǝhāʿopnî");
    });

    test("ʿoprâ (1)", () => {
      expect(transliterate("בְּעָפְרָ֔ה", { qametsQatan: true })).toEqual("bǝʿoprâ");
    });

    test("ʿoprâ (2)", () => {
      expect(transliterate("בֵית־אָבִיו֙ עָפְרָ֔תָה", { qametsQatan: true })).toEqual("bêt-ʾābîw ʿoprātâ");
    });

    test("ḥopšî", () => {
      expect(transliterate("אֲשֶׁ֥ר שִׁלְּח֖וּ חָפְשִׁ֑ים", { qametsQatan: true })).toEqual("ʾăšer šillǝḥû ḥopšîm");
    });

    test("ḥopnî, PN", () => {
      expect(transliterate("חָפְנִי֙ וּפִ֣נְחָ֔ס", { qametsQatan: true })).toEqual("ḥopnî ûpinḥās");
    });

    test("ḥopen", () => {
      expect(transliterate("מְלֹ֣א חָפְנֵיכֶ֔ם", { qametsQatan: true })).toEqual("mǝlōʾ ḥopnêkem");
    });

    test("ʿorpâ (PN)", () => {
      expect(transliterate("הָֽאַחַת֙ עָרְפָּ֔ה", { qametsQatan: true })).toEqual("hāʾaḥat ʿorpâ");
    });

    test("ḥopraʿ (PN)", () => {
      expect(transliterate("אֶת־פַּרְעֹ֨ה חָפְרַ֤ע", { qametsQatan: true })).toEqual("ʾet-parʿōh ḥopraʿ");
    });

    test("ḥopšît", () => {
      expect(transliterate("בְּבֵ֣ית הַחָפְשִׁ֑ית", { qametsQatan: true })).toEqual("bǝbêt haḥopšît");
    });
  });

  describe("sequence", () => {
    test("sequence true", () => {
      expect(transliterate("\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}")).toEqual("haššā");
    });

    test("sequence false", () => {
      expect(transliterate("\u{5D4}\u{5B7}\u{5E9}\u{5B8}\u{5BC}", { isSequenced: false })).toEqual("hašā");
    });
  });
});

describe("using simple style", () => {
  test("basic transliteration", () => {
    expect(transliterate("בְּרֵאשִׁית בָּרָא אֱלֹהִים", { isSimple: true })).toEqual("bereshit bara elohim");
  });

  test("common words", () => {
    expect(transliterate("שָׁלֹום, דָּוִיד, אַבְרָם, סֶפֶר", { isSimple: true })).toEqual("shalom, david, avram, sefer");
  });

  test("line breaks", () => {
    expect(
      transliterate(
        `
    אֱלֹהִים
    תֹורָה
    אִ֛ישׁ
    מַלְכֵי
    `,
        { isSimple: true }
      )
    ).toEqual(`
    elohim
    torah
    ish
    malke
    `);
  });

  test("doubling", () => {
    expect(transliterate("הִנֵּה מַשָּׁא", { isSimple: true })).toEqual("hinneh masha");
  });

  test("qametsQatan false", () => {
    expect(transliterate("כָּל־הָעָם", { isSimple: true })).toEqual("kal-haam");
  });

  test("qametsQatan true (1)", () => {
    expect(transliterate("כָּל־הָעָם", { qametsQatan: true, isSimple: true })).toEqual("kol-haam");
  });

  test("qametsQatan true (2)", () => {
    expect(transliterate("וַתָּקָם עָרְפָּה אֶת־כָל־חָכְמָה", { qametsQatan: true, isSimple: true })).toEqual(
      "vattaqom orpah et-kol-khokhmah"
    );
  });
});
