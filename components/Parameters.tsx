import { useRef, useState } from "react";

import PlayerList from "./PlayerList";

export default function Parameters() {
  // ref and state for selecting total number of players
  const [totalPlayers, setTotalPlayers] = useState<string[] | null>(null);
  const rowsRef = useRef<HTMLInputElement>(null);
  const totalPlayersRef = useRef<HTMLInputElement>(null);

  let enteredPlayers;

  // function to keep track of input value for total number of players
  const changeHandler = () => {
    // create an empty array and fill with default player ids based on total number of players
    enteredPlayers = totalPlayersRef.current?.value;
    if (enteredPlayers) {
      let filledArray = [];
      for (let i = 0; i < +enteredPlayers; i++) {
        filledArray.push(`Player ${i + 1}`);
      }
      setTotalPlayers(filledArray);
    } else {
      setTotalPlayers(null);
    }
  };

  function returnPlayerBets(playerBets: {}) {
    console.log(playerBets);
  }

  // submission handler
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    enteredPlayers = totalPlayersRef.current?.value;
    const rows = rowsRef.current?.value;

    console.log({
      rows: rows,
      totalPlayers: enteredPlayers,
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
      <ul>
        {totalPlayers && (
          <PlayerList
            unfilledBets={totalPlayers}
            returnBets={returnPlayerBets}
          />
        )}
      </ul>
      <button>Play</button>
    </form>
  );
}
