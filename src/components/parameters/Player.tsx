import type { PlayerType } from "../../models/types";
import { useRef, useContext } from "react";
// context component
import AppContext from "../../context/app-context";
// children & variable components
import Suit from "./Suit";
import CurrentWagers from "./CurrentWagers";
import { icons } from "../../models/default";
// chakra components
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

export default function Player(props: Pick<PlayerType, "id" | "name">) {
  const ctx = useContext(AppContext);
  const player = ctx.players[props.id - 1];
  const showCurrentWagers =
    player?.suits?.hearts?.bets ||
    player?.suits?.spades?.bets ||
    player?.suits?.diamonds?.bets ||
    player?.suits?.clubs?.bets;

  // ref hook to update and extract name field per player
  const nameInputRef = useRef<HTMLInputElement>(null);

  // onChange handler for name input
  function changeHandler() {
    const enteredName = nameInputRef.current
      ? nameInputRef.current.value
      : null;
    if (enteredName) {
      ctx?.addName(props.id, enteredName);
    } else {
      ctx?.addName(props.id, `Player ${props.id}`);
    }
  }

  // extracting entered name for frontend from context api
  const playerName = ctx.players[props.id - 1].name;

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton _expanded={{ backgroundColor: "#F9F9F9" }}>
            <Box flex="1" textAlign="left">
              {`Select Bets for ${playerName}`}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel backgroundColor={"#F9F9F9"} pb={0}>
            <FormControl mr={2} variant="accordion" id="rows" isRequired>
              <Input
                type="text"
                id={`${props.name} Name`}
                name={`${props.name} Name`}
                ref={nameInputRef}
                onChange={changeHandler}
                placeholder={`${playerName} Name`}
              />
              <FormLabel
                sx={{ backgroundColor: "#F9F9F9" }}
              >{`What is the name of Player ${props.id}?`}</FormLabel>
            </FormControl>
            <Box p={3}>
              <FormLabel ml={1}>
                Which suit would{" "}
                <em>
                  <b>{playerName}</b>
                </em>{" "}
                like to bet on?
              </FormLabel>
              {icons.map((icon, index) => {
                return (
                  <Suit
                    key={index}
                    suit={icon.type}
                    icon={icon.icon}
                    id={props.id}
                    name={props.name}
                  />
                );
              })}
            </Box>
            {showCurrentWagers && (
              <CurrentWagers id={props.id} name={props.name} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
