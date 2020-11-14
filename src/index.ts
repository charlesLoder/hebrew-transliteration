import { TransOptions, RemoveOptions } from "./interfaces";
import { Transliterate } from "./transliterate";
import { Sequence } from "./sequence";
import { Remove } from "./remove";

export const transliterate = (
  text: string,
  { isSequenced = true, qametsQatan = false, isSimple = false }: TransOptions = {}
) => {
  const normalized = text.normalize("NFKD");
  return Transliterate(normalized, { isSequenced, qametsQatan, isSimple });
};

export const remove = (
  text: string,
  { removeVowels = false, removeShinDot = false, removeSinDot = false }: RemoveOptions = {}
) => {
  const normalized = text.normalize("NFKD");
  const removed = Remove(normalized, { removeVowels, removeShinDot, removeSinDot });
  const noMetheg = removed.replace(/\u{05BD}/gu, "");
  const sequenced = Sequence(noMetheg);
  return sequenced;
};

export const sequence = (text: string) => {
  const normalized = text.normalize("NFKD");
  return Sequence(normalized);
};
