const cantillation = /[\u{0591}-\u{05AF}\u{05BF}\u{05C0}\u{05C1}\u{05C3}-\u{05C6}\u{05F3}\u{05F4}]/gu;
const vowels = /[\u{05B0}-\u{05BD}\u{05BF}\u{05C7}]/gu;

const remCant = (text: string) => text.replace(cantillation, "");
const remVow = (text: string) => remCant(text).replace(vowels, "");

interface OptionsRemove {
  removeVowels?: boolean;
}

export const Remove = (text: string, { removeVowels = false }: OptionsRemove = {}) =>
  removeVowels ? remVow(text) : remCant(text);
