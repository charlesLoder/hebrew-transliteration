import { vowels } from "./sequence";
import { sylRules, wordRules } from "./rules";
import { mapChars } from "./mapChars";
import { SBL, Schema } from "./schema";
import { Text } from "havarotjs";
import { Word } from "havarotjs/dist/word";
import { SylOpts } from "havarotjs/dist/text";

/**
 *
 * @param schema
 * @returns syllable options passed into havarotjs
 * @description sanitizes the SylOpts of the schema so as to not pass in undefined
 */
const getSylOpts = (schema: Partial<SylOpts>) => {
  const options: SylOpts = {};
  if ("longVowels" in schema) options.longVowels = schema.longVowels;
  if ("qametsQatan" in schema) options.qametsQatan = schema.qametsQatan;
  if ("sqnmlvy" in schema) options.sqnmlvy = schema.sqnmlvy;
  if ("wawShureq" in schema) options.wawShureq = schema.wawShureq;
  if ("article" in schema) options.article = schema.article;
  if ("allowNoNiqqud" in schema) options.allowNoNiqqud = schema.allowNoNiqqud;
  return options;
};

/**
 * transliterates Hebrew text
 *
 * @param text - a string or {@link https://charlesloder.github.io/havarot/classes/text.Text.html | Text} of Hebrew characters
 * @param schema - a {@link Schema} for transliterating the text
 * @returns a transliterated text
 *
 * @example Default
 * ```ts
 * import { transliterate } from "hebrew-transliteration";
 *
 * transliterate("אֱלֹהִים");
 * // "ʾĕlōhîm";
 * ```
 *
 * ---
 *
 * @remarks
 *
 * If no {@link Schema} is passed, then the package defaults to SBL's academic style
 *
 * You can pass in a partial schema that will modify SBL's academic style:
 *
 * ```ts
 * transliterate("שָׁלוֹם", { SHIN: "sh" })
 * // shālôm
 * ```
 *
 * ---
 *
 * If you need a fully custom schema, it is best to use the {@link Schema} constructor:
 *
 * ```ts
 * import { transliterate, Schema } from "hebrew-transliteration";
 *
 * const schema = new Schema({ ALEF: "'", BET: "B", ... QAMETS: "A", ... }) // truncated for brevity
 *
 * transliterate("אָ֣ב", schema)
 * // 'AB
 * ```
 *
 */
export const transliterate = (text: string | Text, schema?: Partial<Schema> | Schema) => {
  const transSchema = schema instanceof Schema ? schema : new SBL(schema ?? {});
  const isText = text instanceof Text;
  // prevents Text from throwing error when no vowels
  if (!isText && !vowels.test(text)) {
    const sin = new RegExp(transSchema.SHIN + "\u{05C2}", "gu");
    return mapChars(text, transSchema)
      .replace(sin, transSchema.SIN)
      .replace(/[\u{0590}-\u{05AF}\u{05BD}-\u{05C6}]/gu, "");
  }
  const sylOptions = getSylOpts(transSchema ?? {});
  const newText = isText ? text : new Text(text, sylOptions);
  return newText.words
    .map((word) => {
      let transliteration = wordRules(word, transSchema);
      if (transliteration instanceof Word) {
        transliteration = word.syllables
          .map((s) => sylRules(s, transSchema))
          .join(transSchema.SYLLABLE_SEPARATOR ?? "");
      }
      return `${transliteration}${word.whiteSpaceAfter ?? ""}`;
    })
    .join("");
};
