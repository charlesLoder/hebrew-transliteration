import { sequence } from "./sequence";
import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

interface Options {
  isSequenced?: boolean;
  qametsQatan?: boolean;
  isSimple?: boolean;
}

export const transliterate = (
  text: string,
  { isSequenced = true, qametsQatan = false, isSimple = false }: Options = {}
) => {
  let newSeq = isSequenced ? sequence(text) : text;
  let titTat = titForTat(newSeq);
  let array = titTat.split(" ");
  let modArray = testEach(array, { qametsQatan: qametsQatan, isSimple: isSimple });
  let transliteration = modArray.join(" ");
  return transliteration;
};
