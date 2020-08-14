import { remove } from "../src/index";
import { sequence } from "../src/index";

test("remove ONLY the cantillation, keep shin dot", () => {
  let test = "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים הָאָֽרֶץ׃";
  let result = sequence("בְּרֵאשִׁית בָּרָא אֱלֹהִים הָאָרֶץ");
  expect(remove(test)).toBe(result);
});

test("remove ONLY the cantillation, and shin dot", () => {
  let test = "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים הָאָֽרֶץ׃";
  let result = sequence("בְּרֵאשִית בָּרָא אֱלֹהִים הָאָרֶץ");
  expect(remove(test, { removeShinDot: true })).toBe(result);
});

test("remove cantillation AND vowels, keep shin dot", () => {
  let test = "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים הָאָֽרֶץ׃";
  let result = sequence("בראשׁית ברא אלהים הארץ");
  expect(remove(test, { removeVowels: true })).toBe(result);
});

test("remove cantillation AND vowels, and shin dot", () => {
  let test = "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים הָאָֽרֶץ׃";
  let result = sequence("בראשית ברא אלהים הארץ");
  expect(remove(test, { removeVowels: true, removeShinDot: true })).toBe(result);
});
