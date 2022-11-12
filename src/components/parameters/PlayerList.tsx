import { useContext } from "react";
// context component
import AppContext from "../../context/app-context";
// custom components
import Player from "./Player";

export default function PlayerList() {
  const ctx = useContext(AppContext);

  return (
    // for each entry in the array created in gameCtx.playerForm, return a Player component
    <>
      {ctx.players?.map((player, index) => {
        return <Player key={index} id={player.id} name={player.name} />;
      })}
    </>
  );
}
