import { TransOptions, RemoveOptions } from "./interfaces";
import { Transliterate } from "./transliterate";
import { Sequence } from "./sequence";
import { Remove } from "./remove";

export const transliterate = (
  text: string,
  { isSequenced = true, qametsQatan = false, isSimple = false }: TransOptions = {}
) => {
  let normalized = text.normalize("NFKD");
  return Transliterate(normalized, { isSequenced: isSequenced, qametsQatan: qametsQatan, isSimple: isSimple });
};

export const remove = (text: string, { removeVowels = false }: RemoveOptions = {}) => {
  let normalized = text.normalize("NFKD");
  let removed = Remove(normalized, { removeVowels: removeVowels });
  let noMetheg = removed.replace(/\u{05BD}/gu, "");
  return noMetheg;
};

export const sequence = (text: string) => {
  let normalized = text.normalize("NFKD");
  return Sequence(normalized);
};
