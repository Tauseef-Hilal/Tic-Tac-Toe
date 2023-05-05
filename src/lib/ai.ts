import { winner } from "./abc";

export default function getAIsMove(
  board: string[],
  mark: string
): number | null {
  if (winner(board).res) return null;

  if (mark == "x") {
    let best_value = -2;
    let best_action = -1;

    for (let action of actions(board)) {
      let value = minimize(
        result(board, action, "x"),
        "o",
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY
      );
      if (value > best_value) {
        best_value = value;
        best_action = action;
      }
    }

    return best_action;
  } else {
    let best_value = 2;
    let best_action = -1;

    for (let action of actions(board)) {
      let value = maximize(
        result(board, action, "o"),
        "x",
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY
      );

      if (value < best_value) {
        best_value = value;
        best_action = action;
      }
    }

    return best_action;
  }
}

function minimize(
  board: string[],
  current: string,
  alpha: number,
  beta: number
) {
  switch (winner(board).res) {
    case "x":
      return 1;
    case "o":
      return -1;
    case "draw":
      return 0;
  }

  let min = 2;
  for (let action of actions(board)) {
    const value = maximize(
      result(board, action, current),
      current == "x" ? "o" : "x",
      alpha,
      beta
    );

    min = Math.min(value, min);
    beta = Math.min(beta, min);
    if (beta <= alpha) break;
  }

  return min;
}

function maximize(
  board: string[],
  current: string,
  alpha: number,
  beta: number
) {
  switch (winner(board).res) {
    case "x":
      return 1;
    case "o":
      return -1;
    case "draw":
      return 0;
  }

  let max = -2;
  for (let action of actions(board)) {
    const value = minimize(
      result(board, action, current),
      current == "x" ? "o" : "x",
      alpha,
      beta
    );

    max = Math.max(value, max);
    alpha = Math.max(alpha, max);
    if (beta <= alpha) break;
  }

  return max;
}

function actions(board: string[]) {
  let res: Set<number> = new Set();

  for (let [i, value] of board.entries()) {
    if (value == "") {
      res.add(i);
    }
  }

  return res;
}

function result(board: string[], action: number, current: string) {
  let copy = board.slice();
  copy[action] = current;
  return copy;
}
