import { remove } from "../src/index";
import { sequence } from "../src/index";

test("remove only the cantillation", () => {
  let test = "שָׂרַ֣י אִשְׁתְּךָ֔";
  let result = sequence("שָׂרַי אִשְׁתְּךָ");
  expect(remove(test)).toBe(result);
});

test("remove cantillation and vowels, keep shin/sin dot", () => {
  let test = "שָׂרַ֣י אִשְׁתְּךָ֔";
  let result = sequence("שׂרי אשׁתך");
  expect(remove(test, { removeVowels: true })).toBe(result);
});

test("remove cantillation and vowels, and shin/sin dot", () => {
  let test = "שָׂרַ֣י אִשְׁתְּךָ֔";
  let result = sequence("שרי אשתך");
  expect(remove(test, { removeVowels: true, removeShinDot: true, removeSinDot: true })).toBe(result);
});
