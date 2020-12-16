import { testEach } from "../src/testEach";

describe("using defaut academic style", () => {
  describe("consonant ligatures", () => {
    test("check for sin-dot and change combination to s with a grave", () => {
      expect(testEach(["š\u{05C2}in"])).toEqual(["śin"]);
    });
  });

  describe("mater", () => {
    test("check for hiriq yod in various positions", () => {
      expect(testEach(["biy", "qātiyl", "šiyšiy", "yiyraš", "šāmayim"])).toEqual([
        "bî",
        "qātîl",
        "šîšî",
        "yîraš",
        "šāmayim"
      ]);
    });

    test("check for tsere yod in various positions", () => {
      expect(testEach(["bēy", "bēyṣa", "yēyṣaʿ", "bēyat"])).toEqual(["bê", "bêṣa", "yêṣaʿ", "bēyat"]);
    });

    test("check for seghol yod in various positions", () => {
      expect(testEach(["bey", "dǝbāreykā"])).toEqual(["bê", "dǝbārêkā"]);
    });

    test("check for waw mater for holem, with holem preceding waw [preferred way]", () => {
      expect(testEach(["bōw", "lib\u05BCōw", "qǝṭōwl"])).toEqual(["bô", "libbô", "qǝṭôl"]);
    });

    test("check for waw mater for holem, with waw preceding holem", () => {
      expect(testEach(["bwō", "b\u05BCwō", "lib\u05BCwō", "qǝṭwōl"])).toEqual(["bô", "bô", "libbô", "qǝṭôl"]);
    });

    test("check for waw mater for shureq", () => {
      expect(testEach(["bw\u05BC", "w\u05BCmōšeh"])).toEqual(["bû", "ûmōšê"]);
    });

    test("check for consonantal waw with any vowel but holem", () => {
      expect(testEach(["miṣǝwāh", "mǝṣaw\u05BCeh", "mōwet"])).toEqual(["miṣwâ", "mǝṣawwê", "mōwet"]);
    });

    test("check consonantal waw with holem as vowel", () => {
      expect(testEach(["ʿāwōn", "miṣǝwōt"])).toEqual(["ʿāwōn", "miṣwōt"]);
    });

    test("check consonantal waw, with a waw mater in the same word", () => {
      // first: (ayin + patach) + (waw + holem) + (nun + holem + waw)
      // second: (ayin + patach) + (waw + holem) + (nun + waw + holem)
      expect(testEach(["ʿăwōnōwteynw\u05BC", "ʿăwōnwōteynw\u05BC"])).toEqual(["ʿăwōnôtênû", "ʿăwōnôtênû"]);
    });

    test("check for he mater", () => {
      expect(testEach(["bāh", "bēh", "beh"])).toEqual(["bâ", "bê", "bê"]);
    });

    test("check for he with mappiq", () => {
      expect(testEach(["bāh\u05BC"])).toEqual(["bāh"]);
    });
  });

  describe("furtive patach", () => {
    test("check for furtive patach", () => {
      expect(testEach(["yārēḥa", "gāboh\u05BCa", "rōʿa"])).toEqual(["yārēaḥ", "gāboah", "rōaʿ"]);
    });
  });

  describe("shewa", () => {
    test("check for shewa at end of word", () => {
      expect(testEach(["qātaltǝ"])).toEqual(["qātalt"]);
    });

    test("check for shewa preceded by short vowel", () => {
      expect(testEach(["yiqǝtǝlû", "qātǝlâ"])).toEqual(["yiqtǝlû", "qātǝlâ"]);
    });

    test("check for shewa preceded by short vowel, but SQeNeM LeVY letters in wayyiqtol forms", () => {
      expect(testEach(["wayǝdab\u05BCēr"])).toEqual(["wayǝdabbēr"]);
    });
  });

  describe("qamets qatan/gadol", () => {
    test("option false", () => {
      expect(testEach(["kāl-hāʿam"])).toEqual(["kāl-hāʿam"]);
    });
  });

  describe("dagesh", () => {
    test("check for doubling dagesh", () => {
      expect(testEach(["ḥaṭ\u05BCaʿōt", "qātalǝt\u05BCǝ"])).toEqual(["ḥaṭṭaʿōt", "qātalt"]);
    });
  });

  describe("divine name", () => {
    test("check for divine name", () => {
      expect(testEach(["yǝhwâ", "yǝhwâ", "yhwâ"])).toEqual(["yhwh", "yhwh", "yhwh"]);
    });
  });
});

describe("using simple style", () => {
  test("remove he-mater", () => {
    expect(testEach(["malkāh", "rōʾeh"], { isSimple: true })).toEqual(["malkah", "roeh"]);
  });

  test("remove hiriq-yod, tsere/seghol-yod", () => {
    expect(testEach(["šîr", "bǝnê"], { isSimple: true })).toEqual(["shir", "bene"]);
  });

  test("spiritanized bet", () => {
    expect(testEach(["abba", "ab"], { isSimple: true })).toEqual(["abba", "av"]);
  });

  test("spiritanized peh", () => {
    expect(testEach(["pîlāṭ", "ʿôp"], { isSimple: true })).toEqual(["pilat", "of"]);
  });

  test("spiritanized kaf", () => {
    expect(testEach(["kǝnôn", "bǝrākāh"], { isSimple: true })).toEqual(["kenon", "berakhah"]);
  });

  test("tsade > ts, and no doubling", () => {
    expect(testEach(["ṣǝbāʿôt", "hāṣṣedeq"], { isSimple: true })).toEqual(["tsevaot", "hatsedeq"]);
  });

  test("shin > sh, and no doubling", () => {
    expect(testEach(["šālôm", "maššāʿ"], { isSimple: true })).toEqual(["shalom", "masha"]);
  });

  describe("divine name", () => {
    test("check for divine name", () => {
      expect(testEach(["yǝhwâ", "yǝhwâ", "yhwâ"], { isSimple: true })).toEqual(["yhvh", "yhvh", "yhvh"]);
    });
  });
});
