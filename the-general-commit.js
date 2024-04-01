function getLastCommonCommitMessage(commits, branches) {
  const bm = {};
  const cm = {};

  for (const commit of commits) {
    for (const branch of commit.branches ?? []) {
      bm[branch] = bm[branch] || [];
      bm[branch].push(commit);
    }
    cm[commit.id] = commit;
  }
  const q = [...sortCommits(branches.flatMap((branch) => bm[branch] ?? []))];
  const seen = new Set();

  while (q.length) {
    const c = q.shift();
    if (seen.has(c.id)) {
      return c.message ?? "";
    }
    seen.add(c.id);
    const next = (c.parents ?? []).map((id) => cm[id]);
    q.push(...sortCommits(next));
  }
  throw new Error("No common commit");
}

module.exports = { getLastCommonCommitMessage };

function sortCommits(commits) {
  commits.sort((a, b) => b.timestamp - a.timestamp);
  return commits;
}
