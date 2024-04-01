import { expect, test } from "vitest";
import { getLastCommonCommitMessage } from "./the-general-commit";

test.each([
  [
    {
      commits: [
        {
          id: "1",
          timestamp: 1625055166428,
          message: "add layout",
          parents: ["0"],
        },
        {
          id: "2",
          timestamp: 1625055166429,
          message: "fix bugs",
          branches: ["master", "bugfix"],
          parents: ["1"],
        },
        {
          id: "3",
          timestamp: 1625055166430,
          message: "add link",
          branches: ["feature/link"],
          parents: ["1"],
        },
        { id: "0", timestamp: 1625055166427, message: "initial commit" },
      ],
      branches: ["bugfix", "feature/link"],
    },
    { message: "add layout" },
  ],
  [
    {
      commits: [
        {
          id: "0",
          timestamp: 1625055166428,
          message: "initial commit",
          branches: ["master"],
        },
      ],
      branches: ["master", "master"],
    },
    { message: "initial commit" },
  ],
  [{ commits: [], branches: ["a", "b"] }, { error: true }],
  [
    {
      commits: [
        {
          id: "commit1",
          timestamp: 1648838400000,
          message: "Initial commit",
          branches: ["master"],
        },
        {
          id: "commit2",
          timestamp: 1648924800000,
          parents: ["commit1"],
          message: "Feature A implemented",
          branches: ["feature-A"],
        },
        {
          id: "commit3",
          timestamp: 1649011200000,
          parents: ["commit1"],
          message: "Feature B implemented",
          branches: ["feature-B"],
        },
        {
          id: "commit4",
          timestamp: 1649097600000,
          parents: ["commit2", "commit3"],
          message: "Merge feature-A and feature-B",
          branches: ["feature-A", "feature-B"],
        },
        {
          id: "commit5",
          timestamp: 1649184000000,
          parents: ["commit4"],
          message: "Fix bug in feature-A",
          branches: ["feature-A"],
        },
        {
          id: "commit6",
          timestamp: 1649270400000,
          parents: ["commit4"],
          message: "Fix bug in feature-B",
          branches: ["feature-B"],
        },
        {
          id: "commit7",
          timestamp: 1649356800000,
          parents: ["commit5", "commit6"],
          message: "Merge feature-A and feature-B bug fixes",
          branches: ["feature-A", "feature-B"],
        },
        {
          id: "commit8",
          timestamp: 1649443200000,
          parents: ["commit7"],
          message: "Release version 1.0",
          branches: ["master"],
        },
      ],
      branches: ["feature-A", "feature-B"],
    },
    { message: "Merge feature-A and feature-B bug fixes" },
  ],
])("%j", (input, output) => {
  if (output.error) {
    expect(() =>
      getLastCommonCommitMessage(input.commits, input.branches),
    ).toThrow("No common commit");
  } else {
    expect(getLastCommonCommitMessage(input.commits, input.branches)).toBe(
      output.message,
    );
  }
});
