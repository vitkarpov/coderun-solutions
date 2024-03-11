import { expect, test } from "vitest";
import solve from "./yandexformers";

test.each([
  [{ N: 8, staff: [5, 13, 8, 4, 4, 15, 1, 9], K: 8 }, { ans: 59 }],
  [
    { N: 11, staff: [14, 8, 15, 19, 2, 21, 13, 21, 12, 10, 8], K: 5 },
    { ans: 90 },
  ],
  [
    { N: 15, staff: [19, 20, 5, 10, 2, 20, 7, 9, 1, 3, 13, 14, 3, 3, 4], K: 1 },
    { ans: 20 },
  ],
  [
    { N: 12, staff: [22, 7, 24, 24, 11, 22, 24, 3, 9, 16, 2, 19], K: 7 },
    { ans: 151 },
  ],
  [{ N: 7, staff: [10, 3, 21, 23, 6, 3, 8], K: 4 }, { ans: 62 }],
])("%s", ({ N, staff, K }, { ans }) => {
  expect(solve(N, staff, K)).toBe(ans);
});
