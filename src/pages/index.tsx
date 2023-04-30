import Head from "next/head";
import Menu from "@/components/menu/menu";
import { GameMode } from "@/lib/abc";
import { useState } from "react";
import Game from "@/components/game/game";

export default function Home() {
  const [home, setHome] = useState(true);

  function startGame(mode: GameMode) {
    setHome(false);
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
        {home ? <Menu onStart={startGame}></Menu> : <Game />}
      </main>
    </>
  );
}
