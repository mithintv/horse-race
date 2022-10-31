import { useRef, useState } from "react";

import Bets from "./Bets";

export default function Parameters() {
  const [bets, setBets] = useState<string[] | null>(null);
  const participantsRef = useRef<HTMLInputElement>(null);

  let enteredParticipants;
  const changeHandler = () => {
    console.log("change handler running");
    enteredParticipants = participantsRef.current?.value;
    if (enteredParticipants) {
      setBets(new Array(+enteredParticipants));
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
        {bets &&
          bets.map((bet) => {
            return (
              <li key={Math.random()}>
                <input type="text" />
              </li>
            );
          })}
      </ul>
      <button>Play</button>
    </form>
  );
}
