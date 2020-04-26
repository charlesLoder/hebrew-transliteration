const consonants = /[\u05D0-\u05F2,\uFB20-\uFB4F]/;
const ligature = /[\u05C1-\u05C2]/;
const dagesh = /[\u05BC,\u05BF]/; // includes rafe
const vowels = /[\u05B0-\u05BB,\u05C7]/;
const accents = /[\u0590-\u05AF,\u05BD-\u05BE,\u05C0,\u05C3]/;

class Char {
  public char: string;
  public posIndex: number;

  constructor(char: string) {
    this.char = char;
    this.posIndex = this.findPos(this.char);
  }

  findPos(char: string) {
    if (consonants.test(char)) {
      return 0;
    }
    if (ligature.test(char)) {
      return 1;
    }
    if (dagesh.test(char)) {
      return 2;
    }
    if (vowels.test(char)) {
      return 3;
    }
    if (accents.test(char)) {
      return 4;
    }
    return 10;
  }
}

export const sequence = (text: string) => {
  const splits = /(?=[\u05D0-\u05F2, \uFB20-\uFB4F])/;
  const charClusters = text.split(splits);
  const mapClusters = charClusters.map((cluster) => {
    return [...cluster].map((char) => new Char(char));
  });
  const sortClusters = mapClusters.map((cluster) => cluster.sort((a, b) => a.posIndex - b.posIndex));
  const redClusters = sortClusters.map((cluster) => cluster.reduce((a, c) => a + c.char, ""));
  const seqText = redClusters.reduce((a, c) => a + c);
  return seqText;
};
