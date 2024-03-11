import { expect, test } from "vitest";
import { decode } from "./substitution-code";

test.each([
  ["Aa", [{ from: "a", to: "b" }], "Ab"],
  ["ab", [{ from: "a", to: "b" }], "bb"],
  [
    "ab",
    [
      { from: "a", to: "ba" },
      { from: "b", to: "r" },
    ],
    "bar",
  ],
  [
    "ab",
    [
      { from: "b", to: "bar" },
      { from: "ab", to: "foo" },
    ],
    "foo",
  ],
  [
    "ab",
    [
      { from: "a", to: "bar" },
      { from: "ab", to: "foo" },
    ],
    "foo",
  ],
  [
    "abca",
    [
      { from: "abc", to: "bar" },
      { from: "a", to: "b" },
    ],
    "bbcb",
  ],
  [
    "babca",
    [
      { from: "bab", to: "foo" },
      { from: "abc", to: "bar" },
    ],
    "fooca",
  ],
  [
    "bab",
    [
      { from: "bab", to: "baz" },
      { from: "ba", to: "foo" },
    ],
    "foob",
  ],
  [
    "babab",
    [
      { from: "ba", to: "foo" },
      { from: "bab", to: "baz" },
    ],
    "bazab",
  ],
  [
    "babba",
    [
      { from: "ba", to: "foo" },
      { from: "bab", to: "baz" },
    ],
    "bazfoo",
  ],
  [
    "babbab",
    [
      { from: "ba", to: "foo" },
      { from: "bab", to: "baz" },
    ],
    "bazbaz",
  ],
])("decode(%s, %s)", (message, rules, expected) => {
  expect(decode(message, rules)).toBe(expected);
});
