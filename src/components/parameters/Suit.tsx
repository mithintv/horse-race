import { PlayerType, SuitTypes } from "../../models/types";
import React, { useContext, useRef, useState } from "react";
import AppContext from "../../context/app-context";

// chakra components
import { Box, Flex, FormLabel, Input, Switch } from "@chakra-ui/react";
// icons
import { MdOutlineAddCircleOutline } from "react-icons/md";

interface Props extends Pick<PlayerType, "id" | "name"> {
  icon: JSX.Element;
  suit: SuitTypes;
}

export default function Suit(props: Props) {
  const ctx = useContext(AppContext);
  const player = ctx.players[props.id - 1];
  const checked = player.suits![props.suit]!.checked;

  // ref to extract bet input
  const [show, setShow] = useState(checked);
  const wagerInputRef = useRef<HTMLInputElement>(null);

  // function to handle onChange event (interacting with checkbox)
  function checkHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setShow(true);
      ctx.addSuit(props.id, {
        type: props.suit,
        checked: event.target.checked,
      });
    } else {
      setShow(false);
      ctx.addSuit(props.id, {
        type: props.suit,
        checked: event.target.checked,
      });
    }
  }

  function addHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const enteredWager = wagerInputRef.current
      ? wagerInputRef.current.value
      : "";
    ctx.addWager(props.id, {
      type: props.suit,
      text: enteredWager,
    });
    wagerInputRef.current!.value = "";
  }

  return (
    <>
      <Flex alignItems={"center"}>
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
          mb={0}
          type="checkbox"
          id={`${props.name} ${props.suit}`}
          name={`${props.name} ${props.suit}`}
          onChange={checkHandler}
          isChecked={checked}
        />

        {show && (
          <Flex alignContent={"center"}>
            <Input
              ml={2}
              mr={2}
              size="sm"
              minW={260}
              ref={wagerInputRef}
              type="text"
              id={`${props.name} ${props.suit} Bet`}
              name={`${props.name} ${props.suit} Bet`}
              // display name of player conditionally based on entered name, otherwise default to instantiated player id
              placeholder={`${
                props.suit[0].toUpperCase() + props.suit.slice(1)
              } Bet`}
            />
            <button onClick={addHandler}>
              <MdOutlineAddCircleOutline size={"1.5em"} />
            </button>
          </Flex>
        )}
      </Flex>
    </>
  );
}
