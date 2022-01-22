import { transliterateMap as map } from "./hebCharsTrans";
import { Schema } from "./schema";

/**
 * maps single Hebrew characters to transliteration characters according to the schema
 *
 * @param text - a single character
 * @param schema - a {@link Schema} for transliterating the text
 * @returns transliteration of single characters according to the schema
 *
 */
export const mapChars = (text: string, schema: Schema) =>
  [...text].map((char: string) => (char in map ? schema[map[char]] : char)).join("");
