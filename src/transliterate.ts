import { vowels } from "./sequence";
import { sylRules, wordRules } from "./rules";
import { mapChars } from "./mapChars";
import { Schema } from "./interfaces";
import { sbl } from "./sbl";
import { Text } from "havarotjs";
import { SylOpts } from "havarotjs/dist/text";
import { Word } from "havarotjs/dist/word";

/**
 *
 * @param userSchema
 * @param defaultSchema
 * @returns a schema with defaults added
 * @description modifies the userSchema according to the defaultSchema
 */
const setSchemaDefaults = (userSchema: Schema, defaultSchema: Schema) => {
  for (const key of Object.keys(defaultSchema)) {
    if (!userSchema[key]) {
      userSchema[key] = defaultSchema[key];
    }
  }
  return userSchema;
};

/**
 *
 * @param schema
 * @returns syllable options passed into havarotjs
 * @description sanitizes the SylOpts of the schema so as to not pass in undefined
 */
const getSylOpts = (schema: SylOpts) => {
  const options: SylOpts = {};
  if (schema.longVowels) options.longVowels = schema.longVowels;
  if (schema.qametsQatan) options.qametsQatan = schema.qametsQatan;
  if (schema.sqnmlvy) options.sqnmlvy = schema.sqnmlvy;
  if (schema.wawShureq) options.wawShureq = schema.wawShureq;
  return options;
};

export const transliterate = (text: string, schema?: Schema & SylOpts) => {
  const sanitizedSchema: Schema & SylOpts = !schema ? sbl : setSchemaDefaults(schema, sbl);
  if (!vowels.test(text)) return mapChars(text, sanitizedSchema);
  const sylOptions = getSylOpts(sanitizedSchema);
  return new Text(text, sylOptions).words
    .map((word) => {
      let transliteration = wordRules(word, sanitizedSchema);
      if (transliteration instanceof Word) {
        transliteration = word.syllables.map((s) => sylRules(s, sanitizedSchema)).join("");
      }
      return `${transliteration}${word.whiteSpaceAfter}`;
    })
    .join("");
};
