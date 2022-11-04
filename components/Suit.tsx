import { useContext, useRef, useState } from "react";
import GameContext from "../context/game-context";

type Props = {
  suit: string;
  playerId: number;
  playerName: string;
};

function Suit(props: Props) {
  const gameCtx = useContext(GameContext);

  // state to control if a suit is checked or not and ref to extract bet input
  const [checked, setChecked] = useState(false);
  const betInputRef = useRef<HTMLInputElement>(null);

  // function to handle onChange event (interacting with checkbox)
  function checkHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  // onBlur handler to reflect most recent name and bet to context api
  function blurHandler() {
    // const enteredName = nameInputRef.current?.value;
    // const enteredBet = betInputRef.current?.value;
    // gameCtx?.addBet(props.playerId, {
    //   name: enteredName,
    //   bet: enteredBet,
    // });
  }

  return (
    <>
      <label htmlFor={`${props.playerName} ${props.suit}`}>{props.suit}</label>
      <input
        type="checkbox"
        id={`${props.playerName} ${props.suit}`}
        name={`${props.playerName} ${props.suit}`}
        onChange={checkHandler}
        checked={checked}
      />
      {checked && (
        <input
          onBlur={blurHandler}
          ref={betInputRef}
          type="text"
          id={`${props.playerName} ${props.suit} Bet`}
          name={`${props.playerName} ${props.suit} Bet`}
          // display name of player conditionally based on entered name, otherwise default to instantiated player id
          placeholder={`${props.suit} Bet`}
        />
      )}
    </>
  );
}

export default Suit;

`${"hi"}`;
