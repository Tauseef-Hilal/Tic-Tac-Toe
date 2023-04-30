import styles from "@/components/game/game.module.css";
import WinnerModal from "./winner_modal";
import Modal from "./generic_modal";
import getAIsMove from "@/lib/ai";
import { GameMode, winner } from "@/lib/abc";
import { useEffect, useState } from "react";

type GameProps = {
  gameMode: GameMode;
  playerOneMark: string;
  onEnd: () => void;
};

enum ModalType {
  RestartModal,
  WinnerModal,
  TiedModal,
}

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
    Array(9).fill(styles.cell)
  );

  const isAIsTurn = gameMode == GameMode.VsAI && playerOneMark != mark;
  if (isAIsTurn) {
    handleAIsTurn();
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
      newBoardClasses[line[0]] += ` ${styles.winning}`;
      newBoardClasses[line[1]] += ` ${styles.winning}`;
      newBoardClasses[line[2]] += ` ${styles.winning}`;

      return newBoardClasses;
    });
    setModalState({ type: ModalType.WinnerModal, value: winningMark });
    setMark(mark == "x" ? "o" : "x");
    // setMark(winningMark);
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
    newBoardClasses[cellIdx] = `${styles.cell} ${
      mark == "x" ? styles.outlineX : styles.outlineO
    }`;
    setBoardClasses(newBoardClasses);
  }

  function handleMouseLeaveCell(cellIdx: number) {
    if (boardClasses[cellIdx].includes("marked")) return;

    const newBoardClasses = boardClasses.slice();
    newBoardClasses[cellIdx] = styles.cell;
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
    newBoardClasses[cellIdx] = `${styles.cell} ${styles.marked} ${
      mark == "x" ? styles.markX : styles.markO
    }`;
    setBoardClasses(newBoardClasses);

    const boardRes = winner(newBoard);
    if (boardRes.res != "") {
      handleEndState(boardRes);
      return;
    }

    setMark(mark == "x" ? "o" : "x");
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setBoardClasses(Array(9).fill(styles.cell));
  }

  return (
    <>
      <div className={styles.game}>
        {isAIsTurn && <span className={styles.thinking}>AI is thinking</span>}

        <section className={styles.gameTop}>
          <div className={styles.gameLogo}>
            <img src="images/logo.svg" alt="Logo" />
          </div>
          <div className={styles.gameTurn}>
            <span className={styles.currentPlayer}>{mark.toUpperCase()}</span>{" "}
            TURN
          </div>
          <button
            onClick={() => setModalState({ type: ModalType.RestartModal })}
            type="button"
            className={`${styles.restartBtn} push-button gray`}
          >
            <img src="images/icon-restart.svg" alt="Restart" />
          </button>
        </section>

        <section className={styles.gameBoard}>
          {boardClasses.map((className: string, index: number) => {
            return (
              <button
                disabled={isAIsTurn}
                key={index}
                onMouseEnter={() => handleMouseEnterCell(index)}
                onMouseLeave={() => handleMouseLeaveCell(index)}
                onClick={() => handleMouseClickCell(index)}
                type="button"
                className={className}
              />
            );
          })}
        </section>

        <section className={styles.scoreBoard}>
          <div>
            <span className="score-label">
              X
              {gameMode == GameMode.VsAI
                ? playerOneMark == "x"
                  ? " (YOU)"
                  : " (AI)"
                : playerOneMark == "x"
                ? " (P1)"
                : " (P2)"}
            </span>
            <span className="score">{scores.x}</span>
          </div>
          <div>
            <span className="score-label">TIES</span>
            <span className="score">{scores.ties}</span>
          </div>
          <div>
            <span className="score-label">
              O{" "}
              {gameMode == GameMode.VsAI
                ? playerOneMark == "o"
                  ? " (YOU)"
                  : " (AI)"
                : playerOneMark == "o"
                ? " (P1)"
                : " (P2)"}
            </span>
            <span className="score">{scores.o}</span>
          </div>
        </section>
      </div>

      {modalState.type == ModalType.RestartModal && (
        <>
          <div id="overlay"></div>
          <Modal
            modalTitle="RESTART GAME?"
            btnOneTitle="CANCEL"
            btnTwoTitle="RESTART"
            btnOneHandler={() => {
              setModalState({});
            }}
            btnTwoHandler={() => {
              setModalState({});
              resetGame();
            }}
          />
        </>
      )}

      {modalState.type == ModalType.WinnerModal && (
        <>
          <div id="overlay"></div>
          <WinnerModal
            title={
              playerOneMark == modalState.value
                ? "PLAYER 1 WINS"
                : "PLAYER 2 WINS"
            }
            winner={modalState.value as "x" | "o"}
            onNextBtnClicked={() => {
              setModalState({});
              resetGame();
            }}
            onQuitBtnClicked={onEnd}
          />
        </>
      )}

      {modalState.type == ModalType.TiedModal && (
        <>
          <div id="overlay"></div>
          <Modal
            modalTitle="ROUND TIED!"
            btnOneTitle="QUIT"
            btnTwoTitle="NEXT ROUND"
            btnOneHandler={onEnd}
            btnTwoHandler={() => {
              setModalState({});
              resetGame();
            }}
          />
        </>
      )}
    </>
  );
}
