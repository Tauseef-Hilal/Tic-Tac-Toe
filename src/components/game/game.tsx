import styles from "@/components/game/game.module.css";

export default function Game() {
  return (
    <>
      <div className={styles.game}>
        <section className={styles.gameTop}>
          <div className={styles.gameLogo}>
            <img src="images/logo.svg" alt="Logo" />
          </div>
          <div className={styles.gameTurn}>
            <span className={styles.currentPlayer}>X</span> TURN
          </div>
          <button
            type="button"
            className={`${styles.restartBtn} push-button gray`}
          >
            <img src="images/icon-restart.svg" alt="Restart" />
          </button>
        </section>

        <section className={styles.gameBoard}>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
          <button type="button" className={styles.cell}></button>
        </section>

        <section className={styles.gameBottom}>
          <div className="player-x-score">
            <span className="score-label">X (CPU)</span>
            <span className="score">0</span>
          </div>
          <div className="ties">
            <span className="score-label">TIES</span>
            <span className="score">0</span>
          </div>
          <div className="player-o-score">
            <span className="score-label">O (YOU)</span>
            <span className="score">0</span>
          </div>
        </section>
      </div>
    </>
  );
}
