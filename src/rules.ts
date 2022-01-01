import { Cluster } from "havarotjs/dist/cluster";
import { Syllable } from "havarotjs/dist/syllable";
import { Word } from "havarotjs/dist/word";
import { Schema } from "./schema";
import { mapChars } from "./mapChars";

const taamim = /[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]/u;

const changeElementSplit = (input: string, split: RegExp, join: string) => input.split(split).join(join);

const consonantFeatures = (clusterText: string, syl: Syllable, cluster: Cluster, schema: Schema) => {
  if (schema.ADDITIONAL_FEATURES?.length) {
    const clusterSeqs = schema.ADDITIONAL_FEATURES.filter((s) => s.FEATURE === "cluster");
    for (const seq of clusterSeqs) {
      const heb = new RegExp(seq.HEBREW, "u");
      if (heb.test(clusterText)) {
        const sylSeq = changeElementSplit(clusterText, heb, seq.TRANSLITERATION);
        return [...sylSeq].map((char) => mapChars(char, schema)).join("");
      }
    }
  }

  // mappiq he
  if (/ה\u{05BC}$/mu.test(clusterText)) {
    return changeElementSplit(clusterText, /ה\u{05BC}/u, schema.HE);
  }

  if (syl.isFinal && !syl.isClosed) {
    const furtiveChet = /\u{05D7}\u{05B7}$/mu;
    if (furtiveChet.test(clusterText)) {
      return changeElementSplit(clusterText, furtiveChet, "\u{05B7}\u{05D7}");
    }

    const furtiveAyin = /\u{05E2}\u{05B7}$/mu;
    if (furtiveAyin.test(clusterText)) {
      return changeElementSplit(clusterText, furtiveAyin, "\u{05B7}\u{05E2}");
    }

    const furtiveHe = /\u{05D4}\u{05BC}\u{05B7}$/mu;
    if (furtiveHe.test(clusterText)) {
      return changeElementSplit(clusterText, furtiveHe, "\u{05B7}\u{05D4}\u{05BC}");
    }
  }

  // dagesh chazaq
  const prevHasVowel = cluster.prev instanceof Cluster ? cluster.prev.hasVowel : false;
  if (schema.DAGESH_CHAZAQ && prevHasVowel && /\u{05BC}/u.test(clusterText)) {
    const consonant = cluster.chars[0].text;
    const consonantDagesh = new RegExp(consonant + "\u{05BC}", "u");
    return changeElementSplit(clusterText, consonantDagesh, `${consonant + consonant}`);
  }

  if (schema.BET_DAGESH && /ב\u{05BC}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /ב\u{05BC}/u, schema.BET_DAGESH);
  }

  if (schema.GIMEL_DAGESH && /ג\u{05BC}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /ג\u{05BC}/u, schema.GIMEL_DAGESH);
  }

  if (schema.DALET_DAGESH && /ד\u{05BC}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /ד\u{05BC}/u, schema.DALET_DAGESH);
  }

  if (schema.KAF_DAGESH && /כ\u{05BC}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /כ\u{05BC}/u, schema.KAF_DAGESH);
  }

  if (schema.KAF_DAGESH && /ך\u{05BC}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /ך\u{05BC}/u, schema.KAF_DAGESH);
  }

  if (schema.PE_DAGESH && /פ\u{05BC}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /פ\u{05BC}/u, schema.PE_DAGESH);
  }

  if (schema.TAV_DAGESH && /ת\u{05BC}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /ת\u{05BC}/u, schema.TAV_DAGESH);
  }

  if (/ש\u{05C1}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /ש\u{05C1}/u, schema.SHIN);
  }

  if (/ש\u{05C2}/u.test(clusterText)) {
    return changeElementSplit(clusterText, /ש\u{05C2}/u, schema.SIN);
  }

  if (cluster.isShureq) {
    return schema.SHUREQ;
  }

  if (cluster.hasShewa && syl.isClosed) {
    const shewa = /\u{05B0}/u;
    return clusterText.replace(shewa, "");
  }

  return clusterText;
};

const materFeatures = (syl: Syllable, schema: Schema) => {
  const mater = syl.clusters.filter((c) => c.isMater)[0];
  const prev = mater.prev instanceof Cluster ? mater.prev : null;
  const materText = mater.text;
  const prevText = (prev?.text || "").replace(taamim, "");
  // string comprised of all non-mater clusters in a syl with a mater
  let noMaterText = syl.clusters
    .filter((c) => !c.isMater)
    .map((c) => consonantFeatures(c.text.replace(taamim, ""), syl, c, schema))
    .join("");

  // workaround for maqaf
  const hasMaqaf = mater.text.includes("־");
  noMaterText = hasMaqaf ? noMaterText.concat("־") : noMaterText;

  if (/י/.test(materText)) {
    // hiriq
    if (/\u{05B4}/u.test(prevText)) {
      return changeElementSplit(noMaterText, /\u{05B4}/u, schema.HIRIQ_YOD);
    }
    // tsere
    if (/\u{05B5}/u.test(prevText)) {
      return changeElementSplit(noMaterText, /\u{05B5}/u, schema.TSERE_YOD);
    }
    // segol
    if (/\u{05B6}/u.test(prevText)) {
      return changeElementSplit(noMaterText, /\u{05B6}/u, schema.SEGOL_YOD);
    }
  }

  if (/ו/u.test(materText)) {
    // holam
    if (/\u{05B9}/u.test(prevText)) {
      return changeElementSplit(noMaterText, /\u{05B9}/u, schema.HOLAM_VAV);
    }
  }

  if (/ה/.test(materText)) {
    // qamets
    if (/\u{05B8}/u.test(prevText)) {
      return changeElementSplit(noMaterText, /\u{05B8}/u, schema.QAMATS_HE);
    }

    // seghol
    if (/\u{05B6}/u.test(prevText)) {
      return changeElementSplit(noMaterText, /\u{05B6}/u, schema.SEGOL_HE);
    }

    // tsere
    if (/\u{05B5}/u.test(prevText)) {
      return changeElementSplit(noMaterText, /\u{05B5}/u, schema.SEGOL_HE);
    }
  }

  return materText;
};

export const sylRules = (syl: Syllable, schema: Schema): string => {
  const sylTxt = syl.text.replace(taamim, "");

  if (schema.ADDITIONAL_FEATURES?.length) {
    const sylSeqs = schema.ADDITIONAL_FEATURES.filter((s) => s.FEATURE === "syllable");
    for (const seq of sylSeqs) {
      const heb = new RegExp(seq.HEBREW, "u");
      if (heb.test(sylTxt)) {
        const wordSeq = changeElementSplit(sylTxt, heb, seq.TRANSLITERATION);
        return [...wordSeq].map((char) => mapChars(char, schema)).join("");
      }
    }
  }

  // syllable is 3ms sufx
  const mSSuffix = /\u{05B8}\u{05D9}\u{05D5}/u;
  if (syl.isFinal && mSSuffix.test(sylTxt)) {
    const sufxSyl = changeElementSplit(sylTxt, mSSuffix, schema.MS_SUFX);
    return [...sufxSyl].map((char) => mapChars(char, schema)).join("");
  }

  // syllable has a mater
  // unsure why eslint throwing error here, but not other places...
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const hasMater = syl.clusters.map((c) => c.isMater).includes(true);
  if (hasMater) {
    const materSyl = materFeatures(syl, schema);
    return [...materSyl].map((char) => mapChars(char, schema)).join("");
  }

  // regular syllables
  const returnTxt = syl.clusters.map((cluster) => {
    const clusterText = cluster.text.replace(taamim, "");
    return consonantFeatures(clusterText, syl, cluster, schema);
  });

  return returnTxt.map((char) => mapChars(char, schema)).join("");
};

export const wordRules = (word: Word, schema: Schema): string | Word => {
  if (word.isDivineName) return schema.DIVINE_NAME;
  if (word.hasDivineName) return `${sylRules(word.syllables[0], schema)}-${schema.DIVINE_NAME}`;
  if (schema.ADDITIONAL_FEATURES?.length) {
    const wordSeqs = schema.ADDITIONAL_FEATURES.filter((s) => s.FEATURE === "word");
    for (const seq of wordSeqs) {
      const heb = new RegExp(seq.HEBREW, "u");
      const wordText = word.text.replace(taamim, "");
      if (heb.test(wordText)) {
        const wordSeq = changeElementSplit(wordText, heb, seq.TRANSLITERATION);
        return [...wordSeq].map((char) => mapChars(char, schema)).join("");
      }
    }
  }
  return word;
};
