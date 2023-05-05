import { useState } from "react";
import { GameMode, ModalType, winner } from "@/lib/abc";
import getAIsMove from "@/lib/ai";
import styles from "./styles/game.module.css";
import GameScoreboard from "./scoreboard";
import GameHeader from "./game_header";
import GameBoard from "./board";
import boardStyles from "./styles/board.module.css";
import ModalView from "./model_view";

type GameProps = {
  gameMode: GameMode;
  playerOneMark: string;
  onEnd: () => void;
};

type ModalState = {
  type?: ModalType;
  value?: string;
};

export default function Game({ gameMode, playerOneMark, onEnd }: GameProps) {
  const [mark, setMark] = useState("x");
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  const [modalState, setModalState] = useState<ModalState>({});

  const [board, setBoard] = useState(Array(9).fill(""));
  const [boardClasses, setBoardClasses] = useState<string[]>(
    Array(9).fill(boardStyles.cell)
  );

  const isAIsTurn = gameMode == GameMode.VsAI && playerOneMark != mark;
  if (!modalState.type && isAIsTurn) {
    setTimeout(handleAIsTurn, 500);
  }

  function handleAIsTurn() {
    const cellIdx = getAIsMove(board, mark);
    makeMove(cellIdx!);
  }

  function handleEndState(res: { res: string; line: number[] }) {
    switch (res.res) {
      case "x":
        handleWinState("x", res.line);
        break;
      case "o":
        handleWinState("o", res.line);
        break;
      case "draw":
        handleTieState();
    }
  }

  function handleWinState(winningMark: "x" | "o", line: number[]) {
    setBoardClasses((prev) => {
      const newBoardClasses = prev.slice();
      newBoardClasses[line[0]] += ` ${boardStyles.winning}`;
      newBoardClasses[line[1]] += ` ${boardStyles.winning}`;
      newBoardClasses[line[2]] += ` ${boardStyles.winning}`;

      return newBoardClasses;
    });
    setModalState({ type: ModalType.WinnerModal, value: winningMark });
    setMark(winningMark);
    setScores({
      ...scores,
      [winningMark]: scores[winningMark] + 1,
    });
  }

  function handleTieState() {
    setModalState({ type: ModalType.TiedModal });
    setMark(mark == "x" ? "o" : "x");
    setScores({
      ...scores,
      ties: scores.ties + 1,
    });
  }

  function handleMouseEnterCell(cellIdx: number) {
    if (boardClasses[cellIdx].includes("marked")) return;

    const newBoardClasses = boardClasses.slice();
    newBoardClasses[cellIdx] = `${boardStyles.cell} ${
      mark == "x" ? boardStyles.outlineX : boardStyles.outlineO
    }`;
    setBoardClasses(newBoardClasses);
  }

  function handleMouseLeaveCell(cellIdx: number) {
    if (boardClasses[cellIdx].includes("marked")) return;

    const newBoardClasses = boardClasses.slice();
    newBoardClasses[cellIdx] = boardStyles.cell;
    setBoardClasses(newBoardClasses);
  }

  function handleMouseClickCell(cellIdx: number) {
    if (boardClasses[cellIdx].includes("marked")) return;
    makeMove(cellIdx);
  }

  function makeMove(cellIdx: number) {
    const newBoard = board.slice();
    newBoard[cellIdx] = mark;
    setBoard(newBoard);

    const newBoardClasses = boardClasses.slice();
    newBoardClasses[cellIdx] = `${boardStyles.cell} ${boardStyles.marked} ${
      mark == "x" ? boardStyles.markX : boardStyles.markO
    }`;
    setBoardClasses(newBoardClasses);

    const boardRes = winner(newBoard);
    if (boardRes.res != "") {
      handleEndState(boardRes);
      return;
    }

    setMark(mark == "x" ? "o" : "x");
  }

  function resetGame({ resetMark = false }) {
    if (resetMark) {
      setMark("x");
    }

    setBoard(Array(9).fill(""));
    setBoardClasses(Array(9).fill(boardStyles.cell));
  }

  return (
    <>
      <div className={styles.game}>
        <span
          className={`${styles.thinking} ${isAIsTurn && styles.showThinking}`}
        >
          AI is thinking
        </span>

        <GameHeader
          restartBtnHandler={() =>
            setModalState({ type: ModalType.RestartModal })
          }
          currentPlayerMark={mark}
        />
        <GameBoard
          boardClasses={boardClasses}
          isAIsTurn={isAIsTurn}
          onClickCell={handleMouseClickCell}
          onMouseEnterCell={handleMouseEnterCell}
          onMouseLeaveCell={handleMouseLeaveCell}
        />
        <GameScoreboard
          gameMode={gameMode}
          playerOneMark={playerOneMark}
          scores={scores}
        />
      </div>

      {modalState.type && (
        <ModalView
          type={modalState.type}
          value={modalState.value!}
          playerOneMark={playerOneMark}
          modalStateUpdater={setModalState}
          resetGameFunc={resetGame}
          gameEndCallback={onEnd}
        />
      )}
    </>
  );
}
