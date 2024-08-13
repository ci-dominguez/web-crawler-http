const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");
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

test("getUrlsFromHTML - Absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.cidominguez.com/posts/">
                Blog Built with HTMX and Go
            </a>
        </body>
    </html>
    `;

  const inputBaseURL = "https://blog.cidominguez.com/posts/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.cidominguez.com/posts/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML - Relative", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/posts/">
                  Blog Built with HTMX and Go
              </a>
          </body>
      </html>
      `;

  const inputBaseURL = "https://blog.cidominguez.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.cidominguez.com/posts/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML - Relative & Absolute", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.cidominguez/posts/serverless-postgresql-comparison">
                    August 2024 Serverless PostgreSQL Hosting Comparison
                </a>
                <a href="/posts/">
                    Blog Built with HTMX and Go
                </a>
            </body>
        </html>
        `;

  const inputBaseURL = "https://blog.cidominguez.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.cidominguez/posts/serverless-postgresql-comparison",
    "https://blog.cidominguez.com/posts/",
  ];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML - Invalid URL", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                    August 2024 Serverless PostgreSQL Hosting Comparison
                </a>
            </body>
        </html>
        `;

  const inputBaseURL = "https://blog.cidominguez.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
