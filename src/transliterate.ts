import { vowels } from "./sequence";
import { sylRules, wordRules } from "./rules";
import { mapChars } from "./mapChars";
import { SBL, Schema } from "./interfaces";
import { Text } from "havarotjs";
import { SylOpts } from "havarotjs/dist/text";
import { Word } from "havarotjs/dist/word";

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

export const transliterate = (text: string, schema?: Partial<Schema & SylOpts>) => {
  const sbl = new SBL(schema ?? {});
  if (!vowels.test(text)) return mapChars(text, sbl);
  const sylOptions = getSylOpts(schema ?? {});
  return new Text(text, sylOptions).words
    .map((word) => {
      let transliteration = wordRules(word, sbl);
      if (transliteration instanceof Word) {
        transliteration = word.syllables.map((s) => sylRules(s, sbl)).join("");
      }
      return `${transliteration}${word.whiteSpaceAfter}`;
    })
    .join("");
};
