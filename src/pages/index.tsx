import Head from "next/head";
import Menu from "@/components/menu/menu";
import Game from "@/components/game/game";
import { GameMode } from "@/lib/abc";
import { useRef, useState } from "react";

export default function Home() {
  const [home, setHome] = useState(true);
  const [activeMark, setActiveMark] = useState("o");
  const gameMode = useRef(GameMode.VsHuman);

  function startGame(mode: GameMode) {
    gameMode.current = mode;
    setHome(false);
  }

  function playerPickerhandler(picked: string) {
    setActiveMark(picked);
  }

  return (
    <>
      <Head>
        <title>Tic-Tac-Toe</title>
        <meta name="description" content="Tic-Tac-Toe multiplayer with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {home ? (
          <Menu
            pickerHandler={playerPickerhandler}
            activeMark={activeMark}
            onStart={startGame}
          />
        ) : (
          <Game
            gameMode={gameMode.current}
            playerOneMark={activeMark}
            onEnd={() => setHome(true)}
          />
        )}
      </main>
    </>
  );
}
