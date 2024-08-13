/**
 *
 * @param {*} urlString
 * @returns
 */
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
};
