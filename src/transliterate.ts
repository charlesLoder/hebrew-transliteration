import { vowels } from "./sequence";
import { sylRules, wordRules } from "./rules";
import { mapChars } from "./mapChars";
import { SBL, Schema } from "./interfaces";
import { Text } from "havarotjs";
import { Word } from "havarotjs/dist/word";

export const transliterate = (text: string | Text, schema?: Partial<Schema> | Schema) => {
  const transSchema = schema instanceof Schema ? schema : new SBL(schema ?? {});
  const isText = text instanceof Text;
  // prevents Text from throwing error when no vowels
  if (!isText && !vowels.test(text)) return mapChars(text, transSchema);
  const newText = isText ? text : new Text(text, transSchema);
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
