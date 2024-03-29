// Варианты решения:
// - сортировка займет N * log N, для 10 миллионов чисел не влезает в 3 секунды на 44 тесте (TLE)
// - пробовал улучшить с помощью кучи (max heap), что в теории улучшает сложность до K * log N, но на практике K довольно большие (близкие к N), поэтому так же TLE на 44 тесте
// - хорошо работает bucketsort так как всего 25 грейдов, соответственно надо просто посчитать сколько каких грейдов (столько-то 1, столько-то 2, столько-то 3, и тд до 25), а после просто один раз пройтись по массиву из 25 чисел. Сложность O(N) для подсчета количества разных грейдов

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
