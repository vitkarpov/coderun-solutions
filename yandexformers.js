/**
 * @param {number} N - целое число, количество сотрудников готовых к объединению
 * @param {number[]} staff - массив длины N с грейдами доступных сотрудников
 * @param {number} K - целое число, количество доступных клавиатур
 * @returns {number}
 */
module.exports = function (N, staff, K) {
  const m = [];
  for (let i = 0; i <= 25; i++) {
    m[i] = 0;
  }
  for (const v of staff) {
    m[v]++;
  }
  let r = 0;
  for (let i = 0; i <= 25; i++) {
    if (K <= 0) {
      break;
    }
    r += (25 - i) * Math.min(K, m[25 - i]);
    K -= m[25 - i];
  }
  return r;
};
