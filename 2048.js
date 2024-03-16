module.exports = function solution(input, moves) {
  let field = input.map((row) => [...row].map(Number));

  function zeroesFirst(vals) {
    const values = vals.filter((v) => v > 0);
    const zeroes = Array.from({ length: 4 - values.length }).fill(0);
    return zeroes.concat(values);
  }

  function valuesFirst(vals) {
    const values = vals.filter((v) => v > 0);
    const zeroes = Array.from({ length: 4 - values.length }).fill(0);
    return values.concat(zeroes);
  }

  function moveLeft() {
    field = field.map((row) => valuesFirst(combine(row)));
  }

  function moveRight() {
    field = field.map((row) => zeroesFirst(combine(row)));
  }

  function moveUp() {
    for (let x = 0; x < 4; x++) {
      toField(
        x,
        valuesFirst(
          combine([field[0][x], field[1][x], field[2][x], field[3][x]])
        )
      );
    }
  }

  function moveDown() {
    for (let x = 0; x < 4; x++) {
      toField(
        x,
        zeroesFirst(
          combine([field[0][x], field[1][x], field[2][x], field[3][x]])
        )
      );
    }
  }

  function combine(vals) {
    return vals
      .filter((v) => v > 0)
      .reduce((acc, v) => {
        if (acc.at(-1) === v) {
          acc.pop();
          acc.push(v + v);
          acc.push(0);
        } else {
          acc.push(v);
        }
        return acc;
      }, []);
  }

  function toField(x, vals) {
    const [v1, v2, v3, v4] = vals;
    field[0][x] = v1;
    field[1][x] = v2;
    field[2][x] = v3;
    field[3][x] = v4;
  }

  for (const move of moves.split(" ")) {
    if (move === "L") {
      moveLeft();
    } else if (move === "R") {
      moveRight();
    } else if (move === "U") {
      moveUp();
    } else if (move === "D") {
      moveDown();
    }
  }
  return field;
};
