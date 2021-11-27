import { vowels } from "./sequence";
import { sylRules, wordRules } from "./rules";
import { mapChars } from "./mapChars";
import { SBL, Schema } from "./interfaces";
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
  return options;
};

export const transliterate = (text: string | Text, schema?: Partial<Schema> | Schema) => {
  const transSchema = schema instanceof Schema ? schema : new SBL(schema ?? {});
  const isText = text instanceof Text;
  // prevents Text from throwing error when no vowels
  if (!isText && !vowels.test(text)) return mapChars(text, transSchema);
  const sylOptions = getSylOpts(schema ?? {});
  const newText = isText ? text : new Text(text, sylOptions);
  return newText.words
    .map((word) => {
      let transliteration = wordRules(word, transSchema);
      if (transliteration instanceof Word) {
        transliteration = word.syllables.map((s) => sylRules(s, transSchema)).join("");
      }
      return `${transliteration}${word.whiteSpaceAfter}`;
    })
    .join("");
};
