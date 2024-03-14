const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const N = Number(line);
  const dp = Array.from({ length: N + 1 });
  // dp[i] = [x, y]
  //    ^ число до которого можно добраться
  //          ^ за какое минимальное количество шагов
  //             ^ какую операцию для этого совершили (1 => +1, 2 => *2, 3 => *3)
  dp[1] = [0, 1];
  dp[2] = [1, 2];
  dp[3] = [1, 3];
  for (let i = 4; i <= N; i++) {
    // какой из путей короче всего: -1, /2, /3
    switch (
      Math.min(
        dp[i - 1][0],
        i % 2 === 0 ? dp[i / 2][0] : Infinity,
        i % 3 === 0 ? dp[i / 3][0] : Infinity,
      )
    ) {
      case dp[i - 1][0]:
        dp[i] = [dp[i - 1][0] + 1, 1];
        break;
      case dp[i / 2]?.[0]:
        dp[i] = [dp[i / 2][0] + 1, 2];
        break;
      case dp[i / 3]?.[0]:
        dp[i] = [dp[i / 3][0] + 1, 3];
        break;
    }
  }
  // восстановим обратный путь по записанным операциям для каждого dp[i]
  let i = N;
  const path = [];
  while (i > 1) {
    path.push(i);
    switch (dp[i][1]) {
      case 1:
        i -= 1;
        break;
      case 2:
        i /= 2;
        break;
      case 3:
        i /= 3;
        break;
    }
  }
  path.push(1);
  console.log(dp[N][0]);
  console.log(path.reverse().join(" "));
  rl.close();
});
