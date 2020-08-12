import { remove } from "../src/index";

test("remove ONLY the cantillation", () => {
  expect(remove("בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים הָאָֽרֶץ׃")).toBe("בְּרֵאשִית בָּרָא אֱלֹהִים הָאָרֶץ");
});

test("remove cantillation AND vowels", () => {
  expect(remove("בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים", { removeVowels: true })).toBe("בראשית ברא אלהים");
});
