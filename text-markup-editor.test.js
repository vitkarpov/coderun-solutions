import { expect, test } from "vitest";
import solve from "./text-markup-editor";

test.each([
  [
    `text ((https://ya.ru link)) text text ((https://ya.ru link)) text`,
    '<p>text <a href="https://ya.ru">link</a> text text <a href="https://ya.ru">link</a> text</p>',
  ],
  [`test`, "<p>test</p>"],
  [
    `

* test

`,
    "<ul><li>test</li></ul>",
  ],
  [
    `

* item
* item

`,
    "<ul><li>item</li><li>item</li></ul>",
  ],
  [
    `

* test

* test 2

`,
    "<ul><li>test</li></ul><ul><li>test 2</li></ul>",
  ],
  [`test`, "<p>test</p>"],
  [
    `
= head

text ((https://ya.ru link)) text.

* item
* item

`,
    '<h1>head</h1><p>text <a href="https://ya.ru">link</a> text.</p><ul><li>item</li><li>item</li></ul>',
  ],
  [
    `
= hello ((https://ya.ru ya.ru))!
`,
    '<h1>hello <a href="https://ya.ru">ya.ru</a>!</h1>',
  ],
])("%j", (s, expected) => {
  expect(solve(s)).toBe(expected);
});
