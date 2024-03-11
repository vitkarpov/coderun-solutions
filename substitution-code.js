/**
 *
 * @typedef Replace
 *
 * @property {string} from
 * @property {string} to
 */

/**
 *
 * @param {string} message
 * @param {Replace[]} replaces
 * @returns {string}
 */

function decode(message, replaces) {
  // Намапим всем правила на вхождения from в строке, в качестве ключа -- индекс начала вхождения.
  // Важно читать слева направо, чтобы более поздние результаты для того же ключа перетирали предыдущие результаты.
  // Так мы гарантируем, что "более поздние правила имеют больший приоритет"
  const m = replaces.reduce((m, rule) => {
    let j = message.indexOf(rule.from);
    while (j > -1) {
      m.set(j, rule);
      j = message.indexOf(rule.from, j + 1);
    }
    return m;
  }, new Map());

  // смещение для индексов начала вхождений,
  // которое будет появляться за счет того, что строки замены не совпадают по длине с исходными подстроками
  let shift = 0;
  // где закончили предыдущую вставку в оригинальной строке,
  // это нужно чтобы избежать повторной замены (будем пропускать пересекающиеся интервалы)
  let end = 0;
  let r = message;
  // сортируем по началам вхождений так как по условию нужно заменять слева направо
  const entries = Array.from(m.entries()).sort((a, b) => a[0] - b[0]);

  // теперь аккуратно формируем результат
  for (const [start, value] of entries) {
    // skip overlapping intervals
    if (start < end) {
      continue;
    }
    // ...ab...cacb
    //    ^
    //     ^
    // прыгаем в измененной строке на указанный start и вырезаем все что было до + замена + все, что было после
    r =
      r.slice(0, start + shift) +
      value.to +
      r.slice(start + shift + value.from.length);
    // не забываем обновить смещение, чтобы следующий start был верным для уже измененной строки
    // (надо использовать новую строку, а не оригинальную, чтобы не потерять результаты предыдущих замен)
    shift += value.to.length - value.from.length;
    // не забываем обновить место где остановились, чтобы избежать пересечений в следующих заменах
    end = start + value.from.length;
  }
  return r;
}

module.exports = { decode };
