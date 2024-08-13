const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many arguments");
    process.exit(1);
  }

  const baseURL = process.argv[2];

  console.log(`starting crawl of ${baseURL}`);

  //start with empty obj because we haven't crawled
  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
}

main();
