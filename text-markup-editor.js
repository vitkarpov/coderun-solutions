function format(s) {
  return s
    .split("\n\n")
    .filter(Boolean)
    .map((text) => {
      const [first, ...rest] = text.split("\n").filter(Boolean);

      if (first.startsWith("=")) {
        return `<h1>${formatLinks(first.replace("= ", ""))}</h1>`;
      }
      if (first.startsWith("*")) {
        return `<ul>${[first, ...rest]
          .map((item) => `<li>${formatLinks(item.replace("* ", ""))}</li>`)
          .join("")}</ul>`;
      }
      return `<p>${formatLinks(first)}</p>`;
    })
    .join("");
}

function formatLinks(s) {
  let start = s.indexOf("((");
  while (start > -1) {
    let end = s.indexOf("))", start);
    const [url, text] = s.slice(start + 2, end).split(" ");
    s = s.slice(0, start) + `<a href="${url}">${text}</a>` + s.slice(end + 2);
    start = s.indexOf("((", end);
  }
  return s;
}

module.exports = format;
