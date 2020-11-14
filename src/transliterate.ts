import { TransOptions } from "./interfaces";
import { Sequence } from "./sequence";
import { Remove } from "./remove";
import { qametsQ } from "./qametsQatan";
import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

export const Transliterate = (
  text: string,
  { isSequenced = true, qametsQatan = false, isSimple = false }: TransOptions = {}
) => {
  const newSeq = isSequenced ? Sequence(text) : text;
  const rmvCantillation = Remove(newSeq, { removeShinDot: true });
  const titTat = titForTat(rmvCantillation);
  const array = titTat.split(/(\s|\S*\-)/);
  const sanitized = qametsQatan ? qametsQ(array) : array;
  const modArray = testEach(sanitized, { isSimple });
  const transliteration = modArray.reduce((a, c) => a + c, "");
  return transliteration;
};
