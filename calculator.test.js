import { test, expect, describe } from "vitest";

import path from "path";
import { spawn } from "child_process";

describe("sanity check", () => {
  test.each([
    ["1", "0\n1\n"],
    ["5", "3\n1 3 4 5\n"],
    ["10", "3\n1 3 9 10\n"],
    ["20", "4\n1 3 9 10 20\n"],
    ["64", "6\n1 3 6 7 21 63 64\n"],
  ])("input: %s", async (input, output) => {
    expect(await run(input)).toBe(output);
  });
});

function run(input) {
  return new Promise((resolve) => {
    const testAppFilePath = path.join(__dirname, "calculator.js");
    const testApp = spawn("node", [testAppFilePath]);
    const lines = [];
    testApp.stdout.on("data", (data) => {
      lines.push(data.toString());
    });
    testApp.stdout.on("end", () => {
      testApp.kill("SIGINT");
      resolve(lines.join(""));
    });
    testApp.stdin.setDefaultEncoding("utf-8");
    testApp.stdin.write(input);
    testApp.stdin.end();
  });
}
