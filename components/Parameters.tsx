import { useContext, useRef } from "react";
import GameContext from "../context/game-context";

import PlayerList from "./PlayerList";

export default function Parameters() {
  const gameCtx = useContext(GameContext);

  // refs for selecting total number of players and total number of rows
  const totalRowsRef = useRef<HTMLInputElement>(null);
  const totalPlayersRef = useRef<HTMLInputElement>(null);

  // function to keep track of input value for total number of rows
  const rowsChangeHandler = () => {
    const enteredRows = totalRowsRef.current?.value;
    gameCtx?.addRow(enteredRows);
  };

  // function to keep track of input value for total number of players
  const playersChangeHandler = () => {
    const enteredPlayers = totalPlayersRef.current?.value;
    gameCtx?.addPlayer(enteredPlayers);
  };

  // submission handler
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    gameCtx?.setMode();
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="rows">Number of Rows</label>
      <input
        type="number"
        id="rows"
        name="rows"
        ref={totalRowsRef}
        onChange={rowsChangeHandler}
      />
      <label htmlFor="participants">Number of Players</label>
      <input
        type="number"
        id="participants"
        name="participants"
        ref={totalPlayersRef}
        onChange={playersChangeHandler}
      />
      <ul>{gameCtx?.players && <PlayerList />}</ul>
      <button>Play</button>
    </form>
  );
}
