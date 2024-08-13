const { normalizeUrl } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl - Strip Protocol", () => {
  const input = "https://blog.cidominguez/posts";
  const actual = normalizeUrl(input);
  const expected = "blog.cidominguez/posts";
  expect(actual).toEqual(expected);
});

test("normalizeUrl - Trim Slashes", () => {
  const input = "https://blog.cidominguez/posts/";
  const actual = normalizeUrl(input);
  const expected = "blog.cidominguez/posts";
  expect(actual).toEqual(expected);
});

test("normalizeUrl - Normalize Capitalization", () => {
  const input = "https://BLOG.cidominguez/posts";
  const actual = normalizeUrl(input);
  const expected = "blog.cidominguez/posts";
  expect(actual).toEqual(expected);
});

test("normalizeUrl - Strip Http", () => {
  const input = "http://blog.cidominguez/posts";
  const actual = normalizeUrl(input);
  const expected = "blog.cidominguez/posts";
  expect(actual).toEqual(expected);
});
