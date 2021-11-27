import { transliterateMap as map } from "./hebCharsTrans";
import { Schema } from "./interfaces";

/**
 *
 * @param text
 * @param schema
 * @returns transliteration of single characters according to the schema
 * @description maps single Hebrew characters to transliteration characters according to the schema
 */
export const mapChars = (text: string, schema: Schema) =>
  [...text].map((char: string) => (char in map ? schema[map[char]] : char)).join("");
