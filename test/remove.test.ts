import { remove } from "../src/index";

test("remove ONLY the cantillation", () => {
  expect(remove("בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים")).toBe("בְּרֵאשִׁית בָּרָא אֱלֹהִים");
});

test("remove cantillation AND vowels", () => {
  expect(remove("בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים", { removeVowels: true })).toBe("בראשׁית ברא אלהים");
});
