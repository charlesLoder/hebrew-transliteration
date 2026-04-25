import { describe, expect, test } from "vitest";
import { remove, sequence } from "../src/index";
import { accents, all, vowels } from "../src/remove";

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

test("remove custom", () => {
  const test = "שָׂרַ֣י אִשְׁתְּךָ֔";
  const result = sequence("שָרַ֣י אִשְתְּךָ֔");
  expect(remove(test, { SHIN_DOT: true, SIN_DOT: true })).toBe(result);
});

test("remove maqqef", () => {
  const test = "עַֽל־פַּלְגֵ֫י־מָ֥יִם";
  const result = sequence("עַֽל פַּלְגֵ֫י מָ֥יִם");
  expect(remove(test, { MAQAF: true })).toBe(result);
});

describe("ON_COMPLETE callback", () => {
  test("modifies result string with result argument", () => {
    expect(
      remove("שָׂרַ֣י", {
        ...accents,
        ...vowels,
        ON_COMPLETE: (result) => result.replace("ר", "r")
      })
    ).toBe("שׂrי");
  });

  test("accesses original Hebrew text via callback arguments", () => {
    let capturedOriginal: string | undefined;
    remove("שָׂרַ֣י", {
      ...accents,
      ...vowels,
      ON_COMPLETE: (_result, { original }) => {
        capturedOriginal = original;
        return _result;
      }
    });
    expect(capturedOriginal).toBe("שָׂרַ֣י");
  });

  test("accesses options via callback arguments", () => {
    let capturedOptions: { ETNAHTA?: boolean } | undefined;
    remove("שָׂרַ֣י", {
      ...accents,
      ...vowels,
      ON_COMPLETE: (_result, { options }) => {
        capturedOptions = options;
        return _result;
      }
    });
    expect(capturedOptions?.ETNAHTA).toBe(true);
  });

  test("works with default options when callback returns result unchanged", () => {
    expect(
      remove("שָׂרַ֣י", {
        ...accents,
        ...vowels,
        ON_COMPLETE: (result) => result
      })
    ).toBe("שׂרי");
  });
});
