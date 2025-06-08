import { Text } from "havarotjs";
import { SylOpts } from "havarotjs/text";
import { Word } from "havarotjs/word";
import { sylRules, wordRules } from "./rules";
import { SBL, Schema } from "./schema";

/**
 *  Gets the syllable options from a partial schema
 *
 * @private
 * @param schema
 * @returns syllable options passed into havarotjs
 *
 * @remarks
 * Sanitizes the SylOpts of the schema so as to not pass in undefined
 */
const getSylOpts = (schema: Partial<Schema>) => {
  const options: SylOpts = {};
  if ("longVowels" in schema) options.longVowels = schema.longVowels;
  if ("qametsQatan" in schema) options.qametsQatan = schema.qametsQatan;
  if ("sqnmlvy" in schema) options.shevaAfterMeteg = schema.shevaAfterMeteg;
  if ("sqnmlvy" in schema) options.sqnmlvy = schema.sqnmlvy;
  if ("wawShureq" in schema) options.wawShureq = schema.wawShureq;
  if ("article" in schema) options.article = schema.article;
  if ("allowNoNiqqud" in schema) options.allowNoNiqqud = schema.allowNoNiqqud;
  if ("strict" in schema) options.strict = schema.strict;
  return options;
};

/**
 * Transliterates Hebrew text according to a given schema
 *
 * @param text - a string or {@link https://charlesloder.github.io/havarotjs/classes/text.Text.html | Text} of Hebrew characters
 * @param schema - a {@link Schema} for transliterating the text
 * @returns a transliterated text
 *
 * @example
 * Default
 * ```ts
 * import { transliterate } from "hebrew-transliteration";
 *
 * transliterate("אֱלֹהִים");
 * // "ʾĕlōhîm";
 * ```
 *
 * @example
 * Using `Partial<Schema>`
 * ```ts
 * import { transliterate } from "hebrew-transliteration";
 *
 * transliterate("שָׁלוֹם", { SHIN: "sh" })
 * // shālôm
 * ```
 *
 * @example
 * Using a custom `Schema`
 * ```ts
 * import { transliterate, Schema } from "hebrew-transliteration";
 *
 * const schema = new Schema({ ALEF: "'", BET: "B", ... QAMETS: "A", ... }) // truncated for brevity
 *
 * transliterate("אָ֣ב", schema)
 * // 'AB
 * ```
 *
 * @remarks
 * If no {@link Schema} is passed, then the package defaults to SBL's academic style. You can pass in a partial schema that will modify SBL's academic style.
 * If you need a fully custom schema, it is best to use the {@link Schema} constructor.
 *
 */
export const transliterate = (text: string | Text, schema?: Partial<Schema> | Schema) => {
  const transSchema = schema instanceof Schema ? schema : new SBL(schema ?? {});
  const newText = text instanceof Text ? text : new Text(text, getSylOpts(transSchema ?? {}));
  return newText.words
    .map((word) => {
      const transliteration = wordRules(word, transSchema);

      if (!(transliteration instanceof Word)) {
        return `${transliteration}${word.whiteSpaceAfter ?? ""}`;
      }

      const syllableTransliteration = transliteration.syllables
        .map((s) => sylRules(s, transSchema))
        .reduce((a, c, i) => {
          if (!i) {
            return a + c;
          }

          if (!transSchema.SYLLABLE_SEPARATOR) {
            return a + c;
          }

          if (c.includes(transSchema.SYLLABLE_SEPARATOR)) {
            return a + c;
          }

          return a + transSchema.SYLLABLE_SEPARATOR + c;
        }, "");

      return `${syllableTransliteration}${word.whiteSpaceAfter ?? ""}`;
    })
    .join("");
};
