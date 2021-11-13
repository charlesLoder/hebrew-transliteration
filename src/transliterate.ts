import { TransOptions } from "./interfaces";
import { sequence } from "./sequence";
import { remove } from "./remove";
import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

export const transliterate = (
  text: string,
  { isSequenced = true, qametsQatan = false, isSimple = false }: TransOptions = {}
) => {
  const newSeq = isSequenced ? sequence(text, qametsQatan) : text;
  const rmvCantillation = remove(newSeq, { removeShinDot: true });
  const titTat = titForTat(rmvCantillation);
  const array = titTat.split(/(\s|\S*\-)/);
  const modArray = testEach(array, { isSimple });
  return modArray.join("");
};
