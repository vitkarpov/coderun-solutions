const { getHashByData, fetchData } = require("./utils");

module.exports = async function (urls, retryCount) {
  return Promise.all(urls.map((url) => processUrl(url, retryCount))).then(
    (data) => data.filter((fetchResult) => fetchResult.data)
  );
};

function processUrl(url, retryCount) {
  return withRetry(fetchData(url), retryCount)
    .then((fetchResult) =>
      Promise.all([
        fetchResult,
        new Promise((resolve) => getHashByData(fetchResult.data, resolve)),
      ])
    )
    .then(([fetchResult, expected]) => {
      if (fetchResult.hashSum && fetchResult.hashSum !== expected) {
        return processUrl(url, 1);
      }
      return Promise.resolve(fetchResult);
    });
}

async function withRetry(promise, retryCount) {
  if (retryCount > 0) {
    return promise.catch(() => withRetry(promise, retryCount - 1));
  }
  return {
    data: undefined,
    hashSum: undefined,
  };
}
