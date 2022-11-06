import { PlayerType, suits } from "../models/types";
import { useRef, useContext } from "react";
// context component
import GameContext from "../context/game-context";
// children components
import Suit from "./Suit";

import { Box, Button, Flex, Input } from "@chakra-ui/react";

export default function Player(props: Pick<PlayerType, "id" | "name">) {
  const gameCtx = useContext(GameContext);

  // ref hook to update and extract name field per player
  const nameInputRef = useRef<HTMLInputElement>(null);

  // onChange handler for name input
  function changeHandler() {
    const enteredName = nameInputRef.current?.value;
    if (enteredName) {
      gameCtx?.addName(props.id, enteredName);
    } else {
      gameCtx?.addName(props.id, `Player ${props.id}`);
    }
  }

  // extracting entered name for frontend from context api
  const playerName = gameCtx?.players[props.id - 1].name;

  return (
    <>
      <Input
        type="text"
        id={`${props.name} Name`}
        name={`${props.name} Name`}
        ref={nameInputRef}
        onChange={changeHandler}
        placeholder={playerName ? playerName : `Player ${props.id}`}
      />
      <div>
        Which suit would {playerName ? playerName : `Player ${props.id}`} like
        to bet on?
      </div>
      {suits.map((suit, index) => {
        return (
          <Suit
            key={index}
            suitId={index}
            suit={suit}
            id={props.id}
            name={props.name}
          />
        );
      })}
    </>
  );
}
