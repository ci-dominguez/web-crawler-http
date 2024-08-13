const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages - 2 Pages", () => {
  const input = {
    "https://blog.cidominguez.com/posts": 1,
    "https://blog.cidominguez.com": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.cidominguez.com", 3],
    ["https://blog.cidominguez.com/posts", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages - 5 Pages", () => {
  const input = {
    "https://blog.cidominguez.com/posts": 2,
    "https://blog.cidominguez.com": 3,
    "https://blog.cidominguez.com/tags": 7,
    "https://blog.cidominguez.com/posts/serverless-sql-comparison": 1,
    "https://blog.cidominguez.com/rss": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.cidominguez.com/rss", 9],
    ["https://blog.cidominguez.com/tags", 7],
    ["https://blog.cidominguez.com", 3],
    ["https://blog.cidominguez.com/posts", 2],
    ["https://blog.cidominguez.com/posts/serverless-sql-comparison", 1],
  ];
  expect(actual).toEqual(expected);
});
