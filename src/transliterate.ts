import { sequence } from "./sequence";
import { remove } from "./remove";
import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

export const transliterate = (text: string, qametsQatan = false) => {
  const newSeq = sequence(text, qametsQatan);
  const rmvCantillation = remove(newSeq, { removeShinDot: true });
  const titTat = titForTat(rmvCantillation);
  const array = titTat.split(/(\s|\S*\-)/);
  const modArray = testEach(array);
  return modArray.join("");
};
