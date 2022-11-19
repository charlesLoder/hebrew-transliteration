import { remove } from "../src/index";
import { accents, all, vowels } from "../src/remove";
import { sequence } from "../src/index";

test("default", () => {
  const test = "שָׂרַ֣י אִשְׁתְּךָ֔, וַֽיִּמְצְא֗וּ";
  const result = sequence("שָׂרַי אִשְׁתְּךָ, וַיִּמְצְאוּ");
  expect(remove(test)).toBe(result);
});

test("remove only accents", () => {
  const test = "שָׂרַ֣י אִשְׁתְּךָ֔, וַֽיִּמְצְא֗וּ";
  const result = sequence("שָׂרַי אִשְׁתְּךָ, וַֽיִּמְצְאוּ");
  expect(remove(test, accents)).toBe(result);
});

test("remove accents and vowels, but not shin/sin dots", () => {
  const test = "שָׂרַ֣י אִשְׁתְּךָ֔, וַֽיִּמְצְא֗וּ";
  const result = sequence("שׂרי אשׁתך, וימצאו");
  expect(remove(test, { ...accents, ...vowels, METEG: true })).toBe(result);
});

test("remove all", () => {
  const test = "שָׂרַ֣י אִשְׁתְּךָ֔, וַֽיִּמְצְא֗וּ";
  const result = sequence("שרי אשתך, וימצאו");
  expect(remove(test, all)).toBe(result);
});
