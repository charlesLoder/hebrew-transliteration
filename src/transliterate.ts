import { sequence } from "./sequence";
import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

interface Options {
  isSequenced?: boolean;
  qametsQatan?: boolean;
}

export const transliterate = (text: string, { isSequenced = true, qametsQatan = false }: Options = {}) => {
  let newSeq = isSequenced ? sequence(text) : text;
  let titTat = titForTat(newSeq);
  let array = titTat.split(" ");
  let modArray = testEach(array, { qametsQatan: qametsQatan });
  let transliteration = modArray.join(" ");
  return transliteration;
};
