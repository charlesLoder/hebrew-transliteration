import { TransOptions } from "./interfaces";
import { Sequence } from "./sequence";
import { Remove } from "./remove";
import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

export const Transliterate = (
  text: string,
  { isSequenced = true, qametsQatan = false, isSimple = false }: TransOptions = {}
) => {
  const newSeq = isSequenced ? Sequence(text) : text;
  const rmvCantillation = Remove(newSeq);
  const titTat = titForTat(rmvCantillation);
  const array = titTat.split(" ");
  const modArray = testEach(array, { qametsQatan: qametsQatan, isSimple: isSimple });
  const transliteration = modArray.join(" ");
  return transliteration;
};
