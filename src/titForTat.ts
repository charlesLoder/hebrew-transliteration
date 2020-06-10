import { transliterateMap } from "./hebCharsTrans";

export const titForTat = (text: string) =>
  [...text]
    .map((char: string) => (char in transliterateMap ? transliterateMap[char] : char))
    .reduce((a, c) => a + c, "");
