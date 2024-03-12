const { getHashByData, fetchData } = require("./utils");

module.exports = async function (urls, retryCount) {
  return Promise.all(urls.map((url) => processUrl(url, retryCount))).then(
    (data) =>
      data
        .filter((fetchResult) => fetchResult.data)
        .map((fetchResult) => fetchResult.data)
  );
};

function processUrl(url, retryCount) {
  if (retryCount < 0) {
    return { data: undefined, hashSum: undefined };
  }
  return fetchData(url)
    .then((fetchResult) =>
      Promise.all([
        fetchResult,
        new Promise((resolve) => getHashByData(fetchResult.data, resolve)),
      ])
    )
    .then(([fetchResult, expected]) => {
      if (fetchResult.hashSum && fetchResult.hashSum !== expected) {
        throw "Bad data";
      }
      return Promise.resolve(fetchResult);
    })
    .catch(() => processUrl(url, retryCount - 1));
}
