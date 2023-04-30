import styles from "@/components/game/game.module.css";
import { winner } from "@/lib/abc";
import { useState } from "react";
import WinnerModal from "./winner_modal";
import Modal from "./generic_modal";

type GameProps = { playerOneMark: string; onEnd: () => void };

export default function Game({ playerOneMark, onEnd }: GameProps) {
  const [mark, setMark] = useState("x");
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  const [showEndModal, setShowEndModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);

  const [board, setBoard] = useState(Array(9).fill(""));
  const [boardClasses, setBoardClasses] = useState<string[]>(
    Array(9).fill(styles.cell)
  );

  // const playerTwoMark = playerOneMark == "x" ? "o" : "x";

  const boardRes = winner(board);
  if (boardRes.res != "" && !showEndModal) {
    handleEndState(boardRes);
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
    const newBoardClasses = boardClasses.slice();
    newBoardClasses[line[0]] += ` ${styles.winning}`;
    newBoardClasses[line[1]] += ` ${styles.winning}`;
    newBoardClasses[line[2]] += ` ${styles.winning}`;

    setBoardClasses(newBoardClasses);
    setShowEndModal(true);
    setScores({
      ...scores,
      [winningMark]: scores[winningMark] + 1,
    });
  }

  function handleTieState() {
    setShowEndModal(true);
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

    const newBoard = board.slice();
    newBoard[cellIdx] = mark;
    setBoard(newBoard);

    const newBoardClasses = boardClasses.slice();
    newBoardClasses[cellIdx] = `${styles.cell} ${styles.marked} ${
      mark == "x" ? styles.markX : styles.markO
    }`;
    setBoardClasses(newBoardClasses);

    setMark(mark == "x" ? "o" : "x");
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setBoardClasses(Array(9).fill(styles.cell));
  }

  return (
    <>
      <div className={styles.game}>
        <section className={styles.gameTop}>
          <div className={styles.gameLogo}>
            <img src="images/logo.svg" alt="Logo" />
          </div>
          <div className={styles.gameTurn}>
            <span className={styles.currentPlayer}>{mark.toUpperCase()}</span>{" "}
            TURN
          </div>
          <button
            onClick={() => setShowRestartModal(true)}
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
            <span className="score-label">X (CPU)</span>
            <span className="score">{scores.x}</span>
          </div>
          <div>
            <span className="score-label">TIES</span>
            <span className="score">{scores.ties}</span>
          </div>
          <div>
            <span className="score-label">O (YOU)</span>
            <span className="score">{scores.o}</span>
          </div>
        </section>
      </div>

      {showRestartModal && (
        <>
          <div id="overlay"></div>
          <Modal
            modalTitle="RESTART GAME?"
            btnOneTitle="CANCEL"
            btnTwoTitle="RESTART"
            btnOneHandler={() => {
              setShowRestartModal(false);
            }}
            btnTwoHandler={() => {
              setShowRestartModal(false);
              resetGame();
            }}
          />
        </>
      )}

      {showEndModal && (
        <>
          <div id="overlay"></div>
          {boardRes.res == "draw" ? (
            <Modal
              modalTitle="ROUND TIED!"
              btnOneTitle="QUIT"
              btnTwoTitle="NEXT ROUND"
              btnOneHandler={onEnd}
              btnTwoHandler={() => {
                setShowEndModal(false);
                resetGame();
              }}
            />
          ) : (
            <WinnerModal
              title={
                playerOneMark == boardRes.res
                  ? "PLAYER 1 WINS"
                  : "PLAYER 2 WINS"
              }
              winner={boardRes.res as "x" | "o"}
              onNextBtnClicked={() => {
                setShowEndModal(false);
                resetGame();
              }}
              onQuitBtnClicked={onEnd}
            />
          )}
        </>
      )}
    </>
  );
}
