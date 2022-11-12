import { PlayerType, SuitTypes } from "../../models/types";
import { useContext, useRef, useState } from "react";
import AppContext from "../../context/app-context";

// chakra components
import { Box, FormLabel, Input, Switch } from "@chakra-ui/react";

interface Props extends Pick<PlayerType, "id" | "name"> {
  icon: JSX.Element;
  suit: SuitTypes;
}

export default function Suit(props: Props) {
  const ctx = useContext(AppContext);
  const enteredBets = ctx.players[props.id - 1].suits![props.suit]!.bets;
  const checked = ctx.players[props.id - 1].suits![props.suit]!.checked;

  // ref to extract bet input
  const betInputRef = useRef<HTMLInputElement>(null);

  // function to handle onChange event (interacting with checkbox)
  function checkHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      ctx.addSuit(props.id, {
        type: props.suit,
        checked: event.target.checked,
      });
    } else
      ctx.addSuit(props.id, {
        type: props.suit,
        checked: event.target.checked,
      });
  }

  // onChange handler to reflect most recent entered bet for particular suit
  function changeHandler() {
    const enteredBet = betInputRef.current ? betInputRef.current.value : null;
    ctx.addBet(props.id, {
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
          isChecked={checked}
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
          />
        )}
      </Box>
    </>
  );
}
