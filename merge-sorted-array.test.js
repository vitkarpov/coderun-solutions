import { test, expect, describe } from "vitest";
import sort from "./merge-sorted-array";

test("sanity check", () => {
  const arr1 = [46, 55, 88, 0, 0, 0, 0];
  sort(arr1, 3, [18, 29, 80, 90], 4);
  expect(arr1).toEqual([18, 29, 46, 55, 80, 88, 90]);
});

describe("fuzzy", () => {
  test.each(Array.from({ length: 10 }).map(() => [mkArray(), mkArray()]))(
    "sort(%s, %s)",
    (arr1, arr2) => {
      const m = arr1.length;
      const n = arr2.length;
      const expected = [...arr1].concat(arr2).sort((a, b) => a - b);
      for (let i = 0; i < n; i++) {
        arr1.push(0);
      }
      sort(arr1, m, arr2, n);
      expect(arr1).toEqual(expected);
    },
  );
});

function mkArray() {
  const r = [];
  for (let i = 0, len = Math.floor(Math.random() * 11); i < len; i++) {
    r.push(Math.floor(Math.random() * 201) - 100);
  }
  r.sort((a, b) => a - b);
  return r;
}
