import { BetType } from "../models/types";

import { useRef, useState } from "react";

type Props = {
  playerId: string;
  sendData: (data: BetType) => void;
};

export default function Bet(props: Props) {
  // state and ref hook to update and extract name field per player
  const [name, setName] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const betInputRef = useRef<HTMLInputElement>(null);

  let enteredName;
  let enteredBet;
  // onChange handler for name input
  function changeHandler() {
    enteredName = nameInputRef.current?.value;
    if (enteredName) setName(enteredName);
    else setName(null);
  }

  function blurHandler() {
    enteredName = nameInputRef.current?.value;
    enteredBet = betInputRef.current?.value;
    props.sendData({
      name: enteredName,
      bet: enteredBet,
    });
  }

  return (
    <li>
      <label htmlFor={`${props.playerId} Name`}>Name</label>
      <input
        type="text"
        id={`${props.playerId} Name`}
        name={`${props.playerId} Name`}
        ref={nameInputRef}
        onChange={changeHandler}
      />
      <label htmlFor={`${props.playerId} Bet`}>
        {/* display name of player conditionally based on entered name otherwise default to instantiated player id */}
        {name ? `${name}'s Bet` : `${props.playerId} Bet`}
      </label>
      <input
        onBlur={blurHandler}
        ref={betInputRef}
        type="text"
        id={`${props.playerId} Bet`}
        name={`${props.playerId} Bet`}
      />
    </li>
  );
}
