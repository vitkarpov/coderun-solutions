/** @returns Boolean */
module.exports = function (nums, k) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], i);
  }
  return nums.some((v, i) => m.has(k - v) && m.get(k - v) !== i);
};
