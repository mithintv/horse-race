import { useRef, useState, useContext } from "react";
// context component
import GameContext from "../context/game-context";
// children components
import Suit from "./Suit";

const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

type Props = {
  playerId: number;
  playerName: string;
};

export default function Bet(props: Props) {
  const gameCtx = useContext(GameContext);

  // ref hook to update and extract name field per player
  const nameInputRef = useRef<HTMLInputElement>(null);

  // onChange handler for name input
  function changeHandler() {
    let enteredName = nameInputRef.current?.value;
    if (enteredName) {
      gameCtx?.addName(props.playerId, enteredName);
    } else {
      gameCtx?.addName(props.playerId, `Player ${props.playerId}`);
    }
  }

  // extracting entered name for frontend from context api
  const playerName = gameCtx?.players[props.playerId - 1].name;

  return (
    <li>
      <input
        type="text"
        id={`${props.playerName} Name`}
        name={`${props.playerName} Name`}
        ref={nameInputRef}
        onChange={changeHandler}
        placeholder={playerName ? playerName : `Player ${props.playerId}`}
      />
      <div>
        Which suit would {playerName ? playerName : `Player ${props.playerId}`}{" "}
        like to bet on?
      </div>
      {suits.map((suit, index) => {
        return (
          <Suit
            key={index}
            suit={suit}
            playerId={props.playerId}
            playerName={props.playerName}
          />
        );
      })}

      {/* <input
        onBlur={blurHandler}
        ref={betInputRef}
        type="text"
        id={`${props.playerName} Bet`}
        name={`${props.playerName} Bet`}
        // display name of player conditionally based on entered name otherwise default to instantiated player id
        placeholder={name ? `${name}'s Bet` : `${props.playerName} Bet`}
      /> */}
    </li>
  );
}
