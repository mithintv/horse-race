import { useRef, useState, useContext } from "react";
// context component
import GameContext from "../context/game-context";

type Props = {
  playerId: number;
  playerName: string;
};

export default function Bet(props: Props) {
  const gameCtx = useContext(GameContext);

  // state and ref hook to update and extract name field per player
  const [name, setName] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const betInputRef = useRef<HTMLInputElement>(null);

  let enteredName;
  let enteredBet;
  // onChange handler for name input
  function changeHandler() {
    enteredName = nameInputRef.current?.value;
    if (enteredName) {
      setName(enteredName);
    } else setName(null);
  }

  function blurHandler() {
    enteredName = nameInputRef.current?.value;
    enteredBet = betInputRef.current?.value;
    gameCtx?.addBet(props.playerId, {
      name: enteredName,
      bet: enteredBet,
    });
    // props.sendData({
    //   name: enteredName,
    //   bet: enteredBet,
    // });
  }

  return (
    <li>
      <label htmlFor={`${props.playerName} Name`}>Name</label>
      <input
        type="text"
        id={`${props.playerName} Name`}
        name={`${props.playerName} Name`}
        ref={nameInputRef}
        onChange={changeHandler}
      />
      <label htmlFor={`${props.playerName} Bet`}>
        {/* display name of player conditionally based on entered name otherwise default to instantiated player id */}
        {name ? `${name}'s Bet` : `${props.playerName} Bet`}
      </label>
      <input
        onBlur={blurHandler}
        ref={betInputRef}
        type="text"
        id={`${props.playerName} Bet`}
        name={`${props.playerName} Bet`}
      />
    </li>
  );
}
