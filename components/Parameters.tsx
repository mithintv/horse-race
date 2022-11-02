import { useContext, useRef, useState } from "react";
import GameContext from "../context/game-context";
import { BetsType } from "../models/types";

import PlayerList from "./PlayerList";

export default function Parameters() {
  const gameCtx = useContext(GameContext);

  // ref and state for selecting total number of players
  const [totalPlayers, setTotalPlayers] = useState<string[] | null>(null);
  const rowsRef = useRef<HTMLInputElement>(null);
  const totalPlayersRef = useRef<HTMLInputElement>(null);

  // state for filled bets returned after inputting total number of players and their bets
  const [filledBets, setFilledBets] = useState<BetsType | null>(null);

  let enteredPlayers: string | undefined;
  // function to keep track of input value for total number of players
  const changeHandler = () => {
    enteredPlayers = totalPlayersRef.current?.value;
    gameCtx?.addPlayerForm(enteredPlayers);
  };

  function returnPlayerBets(playerBets: BetsType) {
    setFilledBets(playerBets);
  }

  // submission handler
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    enteredPlayers = totalPlayersRef.current?.value;
    const rows = rowsRef.current?.value;

    console.log({
      rows: rows,
      totalPlayers: enteredPlayers,
      playerBets: filledBets,
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="rows">Number of Rows</label>
      <input id="rows" type="number" name="rows" ref={rowsRef} />
      <label htmlFor="participants">Number of Players</label>
      <input
        value={enteredPlayers}
        onChange={changeHandler}
        name="participants"
        id="participants"
        type="number"
        ref={totalPlayersRef}
      />
      <ul>{gameCtx?.playerForm && <PlayerList />}</ul>
      <button>Play</button>
    </form>
  );
}
