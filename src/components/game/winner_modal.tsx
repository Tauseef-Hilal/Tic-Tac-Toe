import styles from "./styles/winner_modal.module.css";

type WinnerModalProps = {
  title: string;
  winner: "x" | "o";
  onNextBtnClicked: () => void;
  onQuitBtnClicked: () => void;
};

export default function WinnerModal({
  title,
  winner,
  onNextBtnClicked,
  onQuitBtnClicked,
}: WinnerModalProps) {
  return (
    <>
      <div className={`${styles.winnerModal} modal`}>
        <span className={`${styles.modalTitle}`}>{title}</span>

        <div className={`${styles.modalContent}`}>
          <div
            className={`${styles.winner} ${
              winner == "x" ? styles.markX : styles.markO
            }`}
          ></div>
          <span
            className={`${styles.contentHeading} ${
              winner == "x" ? styles.green : styles.gold
            }`}
          >
            TAKES THE ROUND
          </span>
        </div>

        <div className="modal-buttons">
          <button
            onClick={onQuitBtnClicked}
            type="button"
            className="push-button gray"
          >
            QUIT
          </button>
          <button
            onClick={onNextBtnClicked}
            type="button"
            className="push-button gold"
          >
            NEXT ROUND
          </button>
        </div>
      </div>
    </>
  );
}
