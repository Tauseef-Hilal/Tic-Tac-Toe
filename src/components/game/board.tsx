import styles from "./styles/board.module.css";

type GameBoardProps = {
  boardClasses: string[];
  isAIsTurn: boolean;
  onClickCell: (index: number) => void;
  onMouseEnterCell: (index: number) => void;
  onMouseLeaveCell: (index: number) => void;
};

export default function GameBoard({
  boardClasses,
  isAIsTurn,
  onClickCell,
  onMouseEnterCell,
  onMouseLeaveCell,
}: GameBoardProps) {
  return (
    <section className={styles.gameBoard}>
      {boardClasses.map((className: string, index: number) => {
        return (
          <button
            disabled={isAIsTurn}
            key={index}
            onMouseEnter={() => onMouseEnterCell(index)}
            onMouseLeave={() => onMouseLeaveCell(index)}
            onClick={() => onClickCell(index)}
            type="button"
            className={className}
          />
        );
      })}
    </section>
  );
}
