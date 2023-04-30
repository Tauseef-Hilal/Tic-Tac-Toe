import styles from "@/components/menu/menu.module.css";
import PlayerPicker from "./player_picker";
import { useState } from "react";
import { GameMode } from "@/lib/abc";

type MenuProps = {
  activeMark: string;
  onStart: (mode: GameMode) => void;
  pickerHandler: (picked: string) => void;
};

export default function Menu({
  activeMark,
  onStart,
  pickerHandler,
}: MenuProps) {
  return (
    <>
      <div className={styles.gameMenu}>
        <section className={styles.logo}>
          <img src="images/logo.svg" alt="Logo" />
        </section>

        <PlayerPicker activeBtn={activeMark} pickerBtnHandler={pickerHandler} />

        <section className={styles.menuButtons}>
          <button
            onClick={() => onStart(GameMode.VsHuman)}
            type="button"
            className="vs-player push-button gold"
          >
            NEW GAME (VS PLAYER)
          </button>
          <button
            onClick={() => onStart(GameMode.VsAI)}
            type="button"
            className="vs-cpu push-button green"
          >
            NEW GAME (VS CPU)
          </button>
        </section>
      </div>
    </>
  );
}
