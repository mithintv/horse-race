import { useRef, useState } from "react";

import Bets from "./Bets";

export default function Parameters() {
  const [bets, setBets] = useState<string[] | null>(null);
  const participantsRef = useRef<HTMLInputElement>(null);

  let enteredParticipants;
  const changeHandler = () => {
    enteredParticipants = participantsRef.current?.value;
    if (enteredParticipants) {
      console.log(enteredParticipants)
      let filledArray = [];
      for (let i = 0; i < +enteredParticipants; i++) {
        filledArray.push(`Player ${i + 1}`)
      }
      setBets(filledArray);
    }
  };

  return (
    <form>
      <label htmlFor="rows">Number of Rows</label>
      <input id="rows" type="number" />
      <label htmlFor="participants">Number of Players</label>
      <input
        onChange={changeHandler}
        id="participants"
        type="number"
        ref={participantsRef}
      />
      <ul>
        {bets && <Bets bets={bets} />}
      </ul>
      <button>Play</button>
    </form>
  );
}
