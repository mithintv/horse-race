import { useContext } from "react";
// context component
import GameContext from "../context/game-context";
// custom components
import Player from "./Player";

export default function PlayerList() {
  const gameCtx = useContext(GameContext);

  return (
    // for each entry in the array created in gameCtx.playerForm, return a Player component
    <>
      {gameCtx?.playerForm?.map((player, index) => {
        return <Player key={player} playerId={index} playerName={player} />;
      })}
    </>
  );
}
