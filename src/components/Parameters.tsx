import { useContext, useRef } from "react";
import AppContext from "../context/app-context";
import PlayerList from "./PlayerList";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

export default function Parameters() {
  const ctx = useContext(AppContext);

  // refs for selecting total number of players and total number of rows
  const totalRowsRef = useRef<HTMLInputElement>(null);
  const totalPlayersRef = useRef<HTMLInputElement>(null);

  // function to keep track of input value for total number of rows
  const rowChangeHandler = () => {
    const enteredRows = totalRowsRef.current
      ? totalRowsRef.current.value
      : null;
    ctx.addRow(enteredRows);
  };

  // function to keep track of input value for total number of players
  const playerChangeHandler = () => {
    const enteredPlayers = totalPlayersRef.current
      ? totalPlayersRef.current.value
      : null;
    ctx.addPlayer(enteredPlayers);
  };

  // submission handler
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ctx.setMode("PLAY_GAME");
  };

  const stateHandler = () => {
    ctx.setMode("PLAY_GAME");
  };

  return (
    <Flex align="center" flexDir={"column"} justify="center">
      {/* <Button mb={10} onClick={stateHandler}>
        Next
      </Button> */}
      <Heading as={"h2"} size="xl" mb={10} textAlign={"center"}>
        Players & Wagers
      </Heading>
      <form css={{ width: "325px" }} onSubmit={submitHandler}>
        <Flex mb={4}>
          {/* <FormControl mr={2} variant="floating" id="rows">
            <Input
              type="number"
              id="rows"
              name="rows"
              ref={totalRowsRef}
              onChange={rowChangeHandler}
              placeholder=" "
            />
            <FormLabel>Number of Rows</FormLabel>
          </FormControl> */}
          <FormControl variant="floating" id="participants" isRequired>
            <Input
              type="number"
              id="participants"
              name="participants"
              ref={totalPlayersRef}
              onChange={playerChangeHandler}
              placeholder=" "
            />
            <FormLabel htmlFor="participants">Number of Players</FormLabel>
          </FormControl>
        </Flex>
        <div>{ctx?.players && <PlayerList />}</div>
        <Button type="submit" width={"100%"} mt={3}>
          Play
        </Button>
      </form>
    </Flex>
  );
}
