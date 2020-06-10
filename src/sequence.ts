const consonants = /[\u{05D0}-\u{05F2}]/u;
const ligature = /[\u{05C1}-\u{05C2}]/u;
const dagesh = /[\u{05BC},\u{05BF}]/u; // includes rafe
const vowels = /[\u{05B0}-\u{05BB},\u{05C7}]/u;
const accents = /[\u{0590}-\u{05AF},\u{05BD}-\u{05BE},\u{05C0},\u{05C3}]/u;

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

export const Sequence = (text: string) => {
  const splits = /(?=[\u{05D0}-\u{05F2}])/u;
  const charClusters = text.split(splits);
  const mapClusters = charClusters.map((cluster) => [...cluster].map((char) => new Char(char)));
  const sortClusters = mapClusters.map((cluster) => cluster.sort((a, b) => a.posIndex - b.posIndex));
  const redClusters = sortClusters.map((cluster) => cluster.reduce((a, c) => a + c.char, ""));
  const seqText = redClusters.reduce((a, c) => a + c);
  return seqText;
};
