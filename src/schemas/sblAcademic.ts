import { Schema } from "../schema.js";

/**
 * The default schema according to SBL's academic style guide.
 *
 * Whereas a new {@link Schema} must have all required properties when constructed,
 * this schema is meant to be used as a default so particular properties can be overidden (see example).
 *
 * If the property is not set, the default value will be used. Each property is documented below with their default values.
 *
 * Click into each property's "Overrides" for more information about that property.
 *
 * @param schema a {@link Schema | Partial<Schema>}
 *
 * @example
 * Extend the default schema
 * ```js
 *  transliterate("שָׁלוֹם", { SHIN: "sh" });
 * // shālôm
 * ```
 *
 * @privateRemarks
 * In order for documentation output to be the way I wanted, the properties are all redefined with their type from the Schema.
 * This is not necessary for the implementation, just the docs.
 */
export class SBL extends Schema {
  /** @category Vowels @default "ə" */
  declare VOCAL_SHEVA: Schema["VOCAL_SHEVA"];
  /** @category Vowels @default "ĕ" */
  declare HATAF_SEGOL: Schema["HATAF_SEGOL"];
  /** @category Vowels @default "ă" */
  declare HATAF_PATAH: Schema["HATAF_PATAH"];
  /** @category Vowels @default "ŏ" */
  declare HATAF_QAMATS: Schema["HATAF_QAMATS"];
  /** @category Vowels @default "i" */
  declare HIRIQ: Schema["HIRIQ"];
  /** @category Vowels @default "ē" */
  declare TSERE: Schema["TSERE"];
  /** @category Vowels @default "e" */
  declare SEGOL: Schema["SEGOL"];
  /** @category Vowels @default "a" */
  declare PATAH: Schema["PATAH"];
  /** @category Vowels @default "ā" */
  declare QAMATS: Schema["QAMATS"];
  /** @category Vowels @default "ō" */
  declare HOLAM: Schema["HOLAM"];
  /** @category Vowels @default "ō" */
  declare HOLAM_HASER: Schema["HOLAM_HASER"];
  /** @category Vowels @default "ū" */
  declare QUBUTS: Schema["QUBUTS"];
  /** @category Marks @default "" */
  declare DAGESH: Schema["DAGESH"];
  /** @category Marks @category Orthographic Features @default true */
  declare DAGESH_CHAZAQ: Schema["DAGESH_CHAZAQ"];
  /** @category Marks @category Taamim @default "-" */
  declare MAQAF: Schema["MAQAF"];
  /** @category Marks @default "" */
  declare PASEQ: Schema["PASEQ"];
  /** @category Marks @category Taamim @default "" */
  declare SOF_PASUQ: Schema["SOF_PASUQ"];
  /** @category Vowels @default "o" */
  declare QAMATS_QATAN: Schema["QAMATS_QATAN"];
  /** @category Vowels @category Orthographic Features @default "a" */
  declare FURTIVE_PATAH: Schema["FURTIVE_PATAH"];
  /** @category Vowels @category Orthographic Features @default "î" */
  declare HIRIQ_YOD: Schema["HIRIQ_YOD"];
  /** @category Vowels @category Orthographic Features @default "ê" */
  declare TSERE_YOD: Schema["TSERE_YOD"];
  /** @category Vowels @category Orthographic Features @default "ê" */
  declare SEGOL_YOD: Schema["SEGOL_YOD"];
  /** @category Vowels @category Orthographic Features @default "û" */
  declare SHUREQ: Schema["SHUREQ"];
  /** @category Vowels @category Orthographic Features @default "ô" */
  declare HOLAM_VAV: Schema["HOLAM_VAV"];
  /** @category Vowels @category Orthographic Features @default "â" */
  declare QAMATS_HE: Schema["QAMATS_HE"];
  /** @category Vowels @category Orthographic Features @default undefined */
  declare PATAH_HE: Schema["PATAH_HE"];
  /** @category Vowels @category Orthographic Features @default undefined */
  declare SEGOL_HE: Schema["SEGOL_HE"];
  /** @category Vowels @category Orthographic Features @default undefined */
  declare TSERE_HE: Schema["TSERE_HE"];
  /** @category Vowel @category Orthographic Features @default "āyw" */
  declare MS_SUFX: Schema["MS_SUFX"];
  /** @category Consonants @default "ʾ" */
  declare ALEF: Schema["ALEF"];
  /** @category Consonants @default "b" */
  declare BET: Schema["BET"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare BET_DAGESH: Schema["BET_DAGESH"];
  /** @category Consonants @default "g" */
  declare GIMEL: Schema["GIMEL"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare GIMEL_DAGESH: Schema["GIMEL_DAGESH"];
  /** @category Consonants @default "d" */
  declare DALET: Schema["DALET"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare DALET_DAGESH: Schema["DALET_DAGESH"];
  /** @category Consonants @default "h" */
  declare HE: Schema["HE"];
  /** @category Consonants @default "w" */
  declare VAV: Schema["VAV"];
  /** @category Consonants @default "z" */
  declare ZAYIN: Schema["ZAYIN"];
  /** @category Consonants @default "ḥ" */
  declare HET: Schema["HET"];
  /** @category Consonants @default "ṭ" */
  declare TET: Schema["TET"];
  /** @category Consonants @default "y" */
  declare YOD: Schema["YOD"];
  /** @category Consonants @default "k" */
  declare FINAL_KAF: Schema["FINAL_KAF"];
  /** @category Consonants @default "k" */
  declare KAF: Schema["KAF"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare KAF_DAGESH: Schema["KAF_DAGESH"];
  /** @category Consonants @default "l" */
  declare LAMED: Schema["LAMED"];
  /** @category Consonants @default "m" */
  declare FINAL_MEM: Schema["FINAL_MEM"];
  /** @category Consonants @default "m" */
  declare MEM: Schema["MEM"];
  /** @category Consonants @default "n" */
  declare FINAL_NUN: Schema["FINAL_NUN"];
  /** @category Consonants @default "n" */
  declare NUN: Schema["NUN"];
  /** @category Consonants @default "s" */
  declare SAMEKH: Schema["SAMEKH"];
  /** @category Consonants @default "ʿ" */
  declare AYIN: Schema["AYIN"];
  /** @category Consonants @default "p" */
  declare FINAL_PE: Schema["FINAL_PE"];
  /** @category Consonants @default "p" */
  declare PE: Schema["PE"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare PE_DAGESH: Schema["PE_DAGESH"];
  /** @category Consonants @default "ṣ" */
  declare FINAL_TSADI: Schema["FINAL_TSADI"];
  /** @category Consonants @default "ṣ" */
  declare TSADI: Schema["TSADI"];
  /** @category Consonants @default "q" */
  declare QOF: Schema["QOF"];
  /** @category Consonants @default "r" */
  declare RESH: Schema["RESH"];
  /** @category Consonants @category Orthographic Features @default "š" */
  declare SHIN: Schema["SHIN"];
  /** @category Consonants @category Orthographic Features @default "ś" */
  declare SIN: Schema["SIN"];
  /** @category Consonants @default "t" */
  declare TAV: Schema["TAV"];
  /** @category Consonants @category Orthographic Features @default undefined */
  declare TAV_DAGESH: Schema["TAV_DAGESH"];
  /** @category Orthographic Features @default "yhwh" */
  declare DIVINE_NAME: Schema["DIVINE_NAME"];
  /** @category Orthographic Features @default undefined */
  declare DIVINE_NAME_ELOHIM: Schema["DIVINE_NAME_ELOHIM"];
  /** @category Orthographic Features @default undefined */
  declare SYLLABLE_SEPARATOR: Schema["SYLLABLE_SEPARATOR"];
  /**
   * @category Orthographic Features
   * @default
   * ```js
   * [
   *  {
   *    FEATURE: "syllable",
   *    HEBREW: /[\u{05B4}\u{05BB}]/u,
   *    TRANSLITERATION: (syllable, heb, schema) => {
   *        // matches any syllable with a hiriq or qubuts,
   *        // and checks for a "long" vowel (i.e a hiriq or qubuts in an accented syllable without a mater)
   *        const hasMater = syllable.clusters.some((cluster) => cluster.isMater);
   *        if (syllable.isAccented && !hasMater) {
   *          const macron = "\u0304";
   *          const output = syllable.hasVowelName("HIRIQ") ? schema["HIRIQ"] + macron : schema["QUBUTS"] + macron;
   *          return syllable.text.replace(heb, output.normalize("NFC"));
   *        }
   *        return syllable.text;
   *      }
   *    },
   *    {
   *      FEATURE: "syllable",
   *      HEBREW: "\u{05BC}",
   *      TRANSLITERATION: (syllable, heb) => {
   *        // matches any word with a dagesh,
   *        // and checks for a euphonic dagesh
   *        const currWord = syllable?.word?.value;
   *        const prevWord = currWord?.prev?.value;
   *        if (!currWord || !prevWord || !prevWord.isInConstruct) {
   *          return syllable.text;
   *        }
   *
   *        if (syllable.prev) {
   *          return syllable.text;
   *        }
   *
   *        return syllable.text.replace(heb, "");
   *      }
   *    }
   * ]
   * ```
   *
   * @example
   * Extending SBL with a new feature and keeping the default features
   * ```js
   * import { SBL, transliterate } from "hebrew-transliteration";
   *
   * const sbl = new SBL();
   * const oldFeatures = sbl.ADDITIONAL_FEATURES;
   * const newFeature = {
   *  FEATURE: "word",
   *  HEBREW: "הָאָרֶץ",
   *  TRANSLITERATION: "The Earth"
   * }
   *
   * transliterate("הָאָרֶץ", {
   *  ADDITIONAL_FEATURES: [...oldFeatures, newFeature],
   * });
   * ```
   */
  declare ADDITIONAL_FEATURES: Schema["ADDITIONAL_FEATURES"];
  /** @category Orthographic Features @default undefined */
  declare STRESS_MARKER: Schema["STRESS_MARKER"];
  /** @category Syllabification @default true */
  declare longVowels: Schema["longVowels"];
  /** @category Syllabification @default true */
  declare qametsQatan: Schema["qametsQatan"];
  /** @category Syllabification @default true */
  declare shevaAfterMeteg: Schema["shevaAfterMeteg"];
  /** @category Syllabification @default false */
  declare shevaWithMeteg: Schema["shevaWithMeteg"];
  /** @category Syllabification @default true */
  declare sqnmlvy: Schema["sqnmlvy"];
  /** @category Syllabification @default true */
  declare wawShureq: Schema["wawShureq"];
  /** @category Syllabification @default true */
  declare article: Schema["article"];
  /** @category Syllabification @default true */
  declare allowNoNiqqud: Schema["allowNoNiqqud"];
  /** @category Syllabification @default false */
  declare strict: Schema["strict"];
  /** @category Syllabification @default "remove" */
  declare holemHaser: Schema["holemHaser"];
  /** @category Syllabification @default undefined */
  declare ketivQeres: Schema["ketivQeres"];
  constructor(schema: Partial<Schema>) {
    super({
      VOCAL_SHEVA: schema.VOCAL_SHEVA ?? "ə",
      HATAF_SEGOL: schema.HATAF_SEGOL ?? "ĕ",
      HATAF_PATAH: schema.HATAF_PATAH ?? "ă",
      HATAF_QAMATS: schema.HATAF_QAMATS ?? "ŏ",
      HIRIQ: schema.HIRIQ ?? "i",
      TSERE: schema.TSERE ?? "ē",
      SEGOL: schema.SEGOL ?? "e",
      PATAH: schema.PATAH ?? "a",
      QAMATS: schema.QAMATS ?? "ā",
      HOLAM: schema.HOLAM ?? "ō",
      HOLAM_HASER: schema.HOLAM_HASER ?? "ō",
      QUBUTS: schema.QUBUTS ?? "u",
      DAGESH: schema.DAGESH ?? "",
      DAGESH_CHAZAQ: schema.DAGESH_CHAZAQ ?? true,
      MAQAF: schema.MAQAF ?? "-",
      PASEQ: schema.PASEQ ?? "",
      SOF_PASUQ: schema.SOF_PASUQ ?? "",
      QAMATS_QATAN: schema.QAMATS_QATAN ?? "o",
      FURTIVE_PATAH: schema.FURTIVE_PATAH ?? "a",
      HIRIQ_YOD: schema.HIRIQ_YOD ?? "î",
      TSERE_YOD: schema.TSERE_YOD ?? "ê",
      SEGOL_YOD: schema.SEGOL_YOD ?? "ê",
      SHUREQ: schema.SHUREQ ?? "û",
      HOLAM_VAV: schema.HOLAM_VAV ?? "ô",
      QAMATS_HE: schema.QAMATS_HE ?? "â",
      PATAH_HE: schema.PATAH_HE ?? undefined,
      SEGOL_HE: schema.SEGOL_HE ?? undefined,
      TSERE_HE: schema.TSERE_HE ?? undefined,
      MS_SUFX: schema.MS_SUFX ?? "āyw",
      ALEF: schema.ALEF ?? "ʾ",
      BET: schema.BET ?? "b",
      BET_DAGESH: schema.BET_DAGESH ?? undefined,
      GIMEL: schema.GIMEL ?? "g",
      GIMEL_DAGESH: schema.GIMEL_DAGESH ?? undefined,
      DALET: schema.DALET ?? "d",
      DALET_DAGESH: schema.DALET_DAGESH ?? undefined,
      HE: schema.HE ?? "h",
      VAV: schema.VAV ?? "w",
      ZAYIN: schema.ZAYIN ?? "z",
      HET: schema.HET ?? "ḥ",
      TET: schema.TET ?? "ṭ",
      YOD: schema.YOD ?? "y",
      FINAL_KAF: schema.FINAL_KAF ?? "k",
      KAF: schema.KAF ?? "k",
      KAF_DAGESH: schema.KAF_DAGESH ?? undefined,
      LAMED: schema.LAMED ?? "l",
      FINAL_MEM: schema.FINAL_MEM ?? "m",
      MEM: schema.MEM ?? "m",
      FINAL_NUN: schema.FINAL_NUN ?? "n",
      NUN: schema.NUN ?? "n",
      SAMEKH: schema.SAMEKH ?? "s",
      AYIN: schema.AYIN ?? "ʿ",
      FINAL_PE: schema.FINAL_PE ?? "p",
      PE: schema.PE ?? "p",
      PE_DAGESH: schema.PE_DAGESH ?? undefined,
      FINAL_TSADI: schema.FINAL_TSADI ?? "ṣ",
      TSADI: schema.TSADI ?? "ṣ",
      QOF: schema.QOF ?? "q",
      RESH: schema.RESH ?? "r",
      SHIN: schema.SHIN ?? "š",
      SIN: schema.SIN ?? "ś",
      TAV: schema.TAV ?? "t",
      TAV_DAGESH: schema.TAV_DAGESH ?? undefined,
      DIVINE_NAME: schema.DIVINE_NAME ?? "yhwh",
      DIVINE_NAME_ELOHIM: schema.DIVINE_NAME_ELOHIM ?? undefined,
      SYLLABLE_SEPARATOR: schema.SYLLABLE_SEPARATOR ?? undefined,
      ADDITIONAL_FEATURES: schema.ADDITIONAL_FEATURES ?? undefined,
      STRESS_MARKER: schema.STRESS_MARKER ?? undefined,
      ON_COMPLETE: schema.ON_COMPLETE ?? undefined,
      longVowels: schema.longVowels ?? true,
      qametsQatan: schema.qametsQatan ?? true,
      shevaAfterMeteg: schema.shevaAfterMeteg ?? true,
      shevaWithMeteg: schema.shevaWithMeteg ?? false,
      sqnmlvy: schema.sqnmlvy ?? true,
      wawShureq: schema.wawShureq ?? true,
      article: schema.article ?? true,
      allowNoNiqqud: schema.allowNoNiqqud ?? true,
      strict: schema.strict ?? false,
      holemHaser: schema.holemHaser || "remove",
      ketivQeres: schema.ketivQeres || undefined
    });

    this.VOCAL_SHEVA = schema.VOCAL_SHEVA ?? "ə";
    this.HATAF_SEGOL = schema.HATAF_SEGOL ?? "ĕ";
    this.HATAF_PATAH = schema.HATAF_PATAH ?? "ă";
    this.HATAF_QAMATS = schema.HATAF_QAMATS ?? "ŏ";
    this.HIRIQ = schema.HIRIQ ?? "i";
    this.TSERE = schema.TSERE ?? "ē";
    this.SEGOL = schema.SEGOL ?? "e";
    this.PATAH = schema.PATAH ?? "a";
    this.QAMATS = schema.QAMATS ?? "ā";
    this.HOLAM = schema.HOLAM ?? "ō";
    this.HOLAM_HASER = schema.HOLAM_HASER ?? "ō";
    this.QUBUTS = schema.QUBUTS ?? "u";
    this.DAGESH = schema.DAGESH ?? "";
    this.DAGESH_CHAZAQ = schema.DAGESH_CHAZAQ ?? true;
    this.MAQAF = schema.MAQAF ?? "-";
    this.PASEQ = schema.PASEQ ?? "";
    this.SOF_PASUQ = schema.SOF_PASUQ ?? "";
    this.QAMATS_QATAN = schema.QAMATS_QATAN ?? "o";
    this.FURTIVE_PATAH = schema.FURTIVE_PATAH ?? "a";
    this.HIRIQ_YOD = schema.HIRIQ_YOD ?? "î";
    this.TSERE_YOD = schema.TSERE_YOD ?? "ê";
    this.SEGOL_YOD = schema.SEGOL_YOD ?? "ê";
    this.SHUREQ = schema.SHUREQ ?? "û";
    this.HOLAM_VAV = schema.HOLAM_VAV ?? "ô";
    this.QAMATS_HE = schema.QAMATS_HE ?? "â";
    this.PATAH_HE = schema.PATAH_HE ?? undefined;
    this.SEGOL_HE = schema.SEGOL_HE ?? undefined;
    this.TSERE_HE = schema.TSERE_HE ?? undefined;
    this.MS_SUFX = schema.MS_SUFX ?? "āyw";
    this.ALEF = schema.ALEF ?? "ʾ";
    this.BET = schema.BET ?? "b";
    this.BET_DAGESH = schema.BET_DAGESH ?? undefined;
    this.GIMEL = schema.GIMEL ?? "g";
    this.GIMEL_DAGESH = schema.GIMEL_DAGESH ?? undefined;
    this.DALET = schema.DALET ?? "d";
    this.DALET_DAGESH = schema.DALET_DAGESH ?? undefined;
    this.HE = schema.HE ?? "h";
    this.VAV = schema.VAV ?? "w";
    this.ZAYIN = schema.ZAYIN ?? "z";
    this.HET = schema.HET ?? "ḥ";
    this.TET = schema.TET ?? "ṭ";
    this.YOD = schema.YOD ?? "y";
    this.FINAL_KAF = schema.FINAL_KAF ?? "k";
    this.KAF = schema.KAF ?? "k";
    this.KAF_DAGESH = schema.KAF_DAGESH ?? undefined;
    this.LAMED = schema.LAMED ?? "l";
    this.FINAL_MEM = schema.FINAL_MEM ?? "m";
    this.MEM = schema.MEM ?? "m";
    this.FINAL_NUN = schema.FINAL_NUN ?? "n";
    this.NUN = schema.NUN ?? "n";
    this.SAMEKH = schema.SAMEKH ?? "s";
    this.AYIN = schema.AYIN ?? "ʿ";
    this.FINAL_PE = schema.FINAL_PE ?? "p";
    this.PE = schema.PE ?? "p";
    this.PE_DAGESH = schema.PE_DAGESH ?? undefined;
    this.FINAL_TSADI = schema.FINAL_TSADI ?? "ṣ";
    this.TSADI = schema.TSADI ?? "ṣ";
    this.QOF = schema.QOF ?? "q";
    this.RESH = schema.RESH ?? "r";
    this.SHIN = schema.SHIN ?? "š";
    this.SIN = schema.SIN ?? "ś";
    this.TAV = schema.TAV ?? "t";
    this.TAV_DAGESH = schema.TAV_DAGESH ?? undefined;
    this.DIVINE_NAME = schema.DIVINE_NAME ?? "yhwh";
    this.DIVINE_NAME_ELOHIM = schema.DIVINE_NAME_ELOHIM ?? undefined;
    this.SYLLABLE_SEPARATOR = schema.SYLLABLE_SEPARATOR ?? undefined;
    this.ADDITIONAL_FEATURES = schema.ADDITIONAL_FEATURES ?? [
      {
        FEATURE: "syllable",
        HEBREW: /[\u{05B4}\u{05BB}]/u,
        TRANSLITERATION: (syllable, heb, schema) => {
          // matches any syllable with a hiriq or qubuts,
          // and checks for a "long" vowel (i.e a hiriq or qubuts in an accented syllable without a mater)
          const hasMater = syllable.clusters.some((cluster) => cluster.isMater);
          if (syllable.isAccented && !hasMater) {
            const macron = "\u0304";
            const output = syllable.hasVowelName("HIRIQ") ? schema["HIRIQ"] + macron : schema["QUBUTS"] + macron;
            return syllable.text.replace(heb, output.normalize("NFC"));
          }
          return syllable.text;
        }
      },
      {
        FEATURE: "syllable",
        HEBREW: "\u{05BC}",
        TRANSLITERATION: (syllable, heb) => {
          // matches any word with a dagesh,
          // and checks for a euphonic dagesh
          const currWord = syllable?.word?.value;
          const prevWord = currWord?.prev?.value;
          if (!currWord || !prevWord || !prevWord.isInConstruct) {
            return syllable.text;
          }

          if (syllable.prev) {
            return syllable.text;
          }

          return syllable.text.replace(heb, "");
        }
      }
    ];
    this.STRESS_MARKER = schema.STRESS_MARKER ?? undefined;
    this.longVowels = schema.longVowels ?? true;
    this.qametsQatan = schema.qametsQatan ?? true;
    this.shevaAfterMeteg = schema.shevaAfterMeteg ?? true;
    this.shevaWithMeteg = schema.shevaWithMeteg ?? false;
    this.sqnmlvy = schema.sqnmlvy ?? true;
    this.wawShureq = schema.wawShureq ?? true;
    this.article = schema.article ?? true;
    this.allowNoNiqqud = schema.allowNoNiqqud ?? true;
    this.strict = schema.strict ?? false;
    this.holemHaser = schema.holemHaser ?? "remove";
    this.ketivQeres = schema.ketivQeres ?? undefined;
  }
}
