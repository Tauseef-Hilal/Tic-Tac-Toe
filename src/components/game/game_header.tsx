import styles from "./styles/game_header.module.css";

type GameHeaderProps = {
  currentPlayerMark: string;
  restartBtnHandler: () => void;
};

export default function GameHeader({
  currentPlayerMark,
  restartBtnHandler,
}: GameHeaderProps) {
  return (
    <section className={styles.gameTop}>
      <div className={styles.gameLogo}>
        <img src="images/logo.svg" alt="Logo" />
      </div>
      <div className={styles.gameTurn}>
        <span className={styles.currentPlayer}>
          {currentPlayerMark.toUpperCase()}
        </span>{" "}
        TURN
      </div>
      <button
        onClick={restartBtnHandler}
        type="button"
        className={`${styles.restartBtn} push-button gray`}
      >
        <img src="images/icon-restart.svg" alt="Restart" />
      </button>
    </section>
  );
}
