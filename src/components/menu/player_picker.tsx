import styles from "@/components/menu/player_picker.module.css";

type PlayerPickerProps = {
  activeBtn: string;
  pickerBtnHandler: (picked: string) => void;
};

export default function PlayerPicker({
  activeBtn,
  pickerBtnHandler,
}: PlayerPickerProps) {
  return (
    <>
      <div className={styles.playerPicker}>
        <header className={styles.pickerHeader}>PICK PLAYER 1'S MARK</header>
        <section className={styles.pickerContent}>
          <div className={styles.pickerButtons}>
            <button
              type="button"
              onClick={() => pickerBtnHandler("x")}
              className={
                activeBtn == "x"
                  ? `${styles.pickXBtn} ${styles.active}`
                  : styles.pickXBtn
              }
            ></button>
            <button
              type="button"
              onClick={() => pickerBtnHandler("o")}
              className={
                activeBtn == "o"
                  ? `${styles.pickOBtn} ${styles.active}`
                  : styles.pickOBtn
              }
            ></button>
          </div>
          <span className={`${styles.pickerNote} ${styles.note}`}>
            REMEMBER: X GOES FIRST
          </span>
        </section>
      </div>
    </>
  );
}
