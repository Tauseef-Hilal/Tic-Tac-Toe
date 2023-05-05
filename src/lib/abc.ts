export const enum GameMode {
  VsHuman,
  VsAI,
}
export const enum ModalType {
  RestartModal = 1,
  WinnerModal,
  TiedModal,
}

export function winner(board: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let isWinner = false;
  let winning_mark = "";
  let line = lines[0];

  for (line of lines) {
    if (
      board[line[0]] == board[line[1]] &&
      board[line[1]] == board[line[2]] &&
      board[line[0]] != ""
    ) {
      winning_mark = board[line[0]];
      isWinner = true;
      break;
    }
  }

  let isTie = false;
  if (!isWinner) {
    isTie = true;

    for (let cell of board) {
      if (cell == "") {
        isTie = false;
        break;
      }
    }
  }

  return { res: isTie ? "draw" : winning_mark, line };
}
