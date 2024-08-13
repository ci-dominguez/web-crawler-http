const { JSDOM } = require("jsdom");

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
};
