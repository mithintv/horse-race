import { useContext } from "react";
import GameContext from "../context/game-context";

import Game from "../components/Game";
import Parameters from "../components/Parameters";

export default function Home() {
  const gameCtx = useContext(GameContext);

  return (
    <>
      <div>HORSE RACE</div>
      {!gameCtx?.displayForm && <Game />}
      {gameCtx?.displayForm && <Parameters />}
    </>
  );
}
