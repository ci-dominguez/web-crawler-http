const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currURLObj = new URL(currURL);

  //check if curr url is from the same website we are crawling
  if (baseURLObj.hostname !== currURLObj.hostname) return pages;

  const normalizedCurrURL = normalizeUrl(currURL);

  //Check if curr url has been crawled
  if (pages[normalizedCurrURL] > 0) {
    pages[normalizedCurrURL]++;
    return pages;
  }

  pages[normalizedCurrURL] = 1;

  console.log(`actively crawling: ${currURL}...`);

  try {
    const resp = await fetch(currURL);

    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page ${currURL}`
      );
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`non-html response: ${contentType} on page ${currURL}`);
      return pages;
    }

    const htmlBody = await resp.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    //Recursive crawl for every url in the html
    for (const nextURL of nextURLs)
      pages = await crawlPage(baseURL, nextURL, pages);
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page ${currURL}`);
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkEle of linkElements) {
    if (linkEle.href.slice(0, 1) === "/") {
      //relative urls
      try {
        const urlObj = new URL(`${baseUrl}${linkEle.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative url: ${err.message}`);
      }
    } else {
      //absolute urls
      try {
        const urlObj = new URL(linkEle.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute url: ${err.message}`);
      }
    }
  }

  return urls;
}

function normalizeUrl(urlString) {
  const urlObj = new URL(urlString);

  //trim protocol
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  //trim trailing '/'
  if (hostPath.length > 0 && hostPath.slice(-1) === "/")
    return hostPath.slice(0, -1);

  //return normalized url
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
};
