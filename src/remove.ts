import { RemoveOptions } from "./interfaces";
const cantillation = /[\u{0591}-\u{05AF}\u{05BF}\u{05C0}\u{05C3}-\u{05C6}\u{05F3}\u{05F4}]/gu;
const vowels = /[\u{05B0}-\u{05BD}\u{05BF}\u{05C7}]/gu;
const shinDot = /\u{05C1}/gu;
const sinDot = /\u{05C2}/gu;

const removeItem = (text: string, item: RegExp) => text.replace(item, "");

export const Remove = (
  text: string,
  { removeVowels = false, removeShinDot = false, removeSinDot = false }: RemoveOptions = {}
) => {
  const remCantillation = removeItem(text, cantillation);
  const remVowels = removeVowels ? removeItem(remCantillation, vowels) : remCantillation;
  const remShin = removeShinDot ? removeItem(remVowels, shinDot) : remVowels;
  const remSin = removeSinDot ? removeItem(remShin, sinDot) : remShin;
  return remSin;
};
