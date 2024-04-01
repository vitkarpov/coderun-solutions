import { expect, test } from "vitest";
import solve from "./search-for-numbers";

test.each([
  [[10, 15, 3, 7], 17, true],
  [[5, 9, 3, 6], 10, false],
])("solve(%s, %s)", (nums, k, expected) => {
  expect(solve(nums, k)).toBe(expected);
});
