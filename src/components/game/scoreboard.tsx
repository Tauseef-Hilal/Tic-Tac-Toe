import { GameMode } from "@/lib/abc";
import styles from "./styles/scoreboard.module.css";

type ScoreboardProps = {
  gameMode: GameMode;
  playerOneMark: string;
  scores: { x: number; o: number; ties: number };
};

export default function GameScoreboard({
  gameMode,
  playerOneMark,
  scores,
}: ScoreboardProps) {
  return (
    <section className={styles.scoreBoard}>
      <div className={styles.scoreContainer}>
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

      <div className={styles.scoreContainer}>
        <span className="score-label">TIES</span>
        <span className="score">{scores.ties}</span>
      </div>

      <div className={styles.scoreContainer}>
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
  );
}
