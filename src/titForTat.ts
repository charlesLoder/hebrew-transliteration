import { hebCharsTrans } from "./hebCharsTrans";

export const titForTat = (text: string) =>
  [...text].map((char: string) => (char in hebCharsTrans ? hebCharsTrans[char] : char)).reduce((a, c) => a + c);
