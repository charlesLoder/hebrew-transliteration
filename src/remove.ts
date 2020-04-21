import { hebCharsRC, hebCharsRV } from "./hebCharsTrans";

const remCant = (char: string) => (char in hebCharsRC ? hebCharsRC[char] : char);
const remVow = (char: string) => (char in hebCharsRV ? hebCharsRV[char] : char);

interface OptionsRemove {
  removeVowels?: boolean;
}

export const remove = (text: string, { removeVowels = false }: OptionsRemove = {}) => {
  return [...text].map((char: string) => (!removeVowels ? remCant(char) : remVow(char))).reduce((a, c) => a + c);
};
