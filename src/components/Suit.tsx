import { PlayerType, SuitTypes } from "../models/types";
import { useContext, useRef, useState } from "react";
import GameContext from "../context/game-context";

// chakra components
import { Box, FormLabel, Input, Switch } from "@chakra-ui/react";

interface Props extends Pick<PlayerType, "id" | "name"> {
  icon: JSX.Element;
  suit: SuitTypes;
}

export default function Suit(props: Props) {
  const gameCtx = useContext(GameContext);
  const enteredBets = gameCtx?.players[props.id - 1].suits[props.suit].bets;

  // state to control if a suit is checked or not and ref to extract bet input
  const [checked, setChecked] = useState(false);
  const betInputRef = useRef<HTMLInputElement>(null);

  // function to handle onChange event (interacting with checkbox)
  function checkHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    console.log(event.target.checked);
    gameCtx?.addSuit(props.id, {
      type: props.suit,
      checked: event.target.checked,
    });
  }

  // onChange handler to reflect most recent entered bet for particular suit
  function changeHandler() {
    const enteredBet = betInputRef.current?.value;
    gameCtx?.addBet(props.id, {
      type: props.suit,
      bets: enteredBet,
    });
  }

  return (
    <>
      <Box>
        <FormLabel
          display={"inline-block"}
          ml={2}
          mt={2.5}
          mr={2}
          htmlFor={`${props.name} ${props.suit}`}
        >
          {props.icon}
        </FormLabel>
        <Switch
          mb={2}
          type="checkbox"
          id={`${props.name} ${props.suit}`}
          name={`${props.name} ${props.suit}`}
          onChange={checkHandler}
          checked={checked}
        />
        {checked && (
          <Input
            ml={2}
            maxW={300}
            onChange={changeHandler}
            ref={betInputRef}
            type="text"
            id={`${props.name} ${props.suit} Bet`}
            name={`${props.name} ${props.suit} Bet`}
            // display name of player conditionally based on entered name, otherwise default to instantiated player id
            placeholder={
              enteredBets
                ? enteredBets
                : `${props.suit[0].toUpperCase() + props.suit.slice(1)} Bet`
            }
            value={enteredBets}
          />
        )}
      </Box>
    </>
  );
}
