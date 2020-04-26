import { removeCantillation, removeVowels } from "./hebCharsTrans";

const remCant = (char: string) => (char in removeCantillation ? removeCantillation[char] : char);
const remVow = (char: string) => (char in removeVowels ? removeVowels[char] : char);

interface OptionsRemove {
  removeVowels?: boolean;
}

export const remove = (text: string, { removeVowels = false }: OptionsRemove = {}) =>
  [...text].map((char: string) => (!removeVowels ? remCant(char) : remVow(char))).reduce((a, c) => a + c);
