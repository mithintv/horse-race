import { useContext, useRef } from "react";
import GameContext from "../context/game-context";
import PlayerList from "./PlayerList";

import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Parameters() {
  const gameCtx = useContext(GameContext);

  // refs for selecting total number of players and total number of rows
  const totalRowsRef = useRef<HTMLInputElement>(null);
  const totalPlayersRef = useRef<HTMLInputElement>(null);

  // function to keep track of input value for total number of rows
  const rowChangeHandler = () => {
    const enteredRows = totalRowsRef.current?.value;
    gameCtx?.addRow(enteredRows);
  };

  // function to keep track of input value for total number of players
  const playerChangeHandler = () => {
    const enteredPlayers = totalPlayersRef.current?.value;
    gameCtx?.addPlayer(enteredPlayers);
  };

  // submission handler
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    gameCtx?.setMode();
  }

  return (
    <Flex align="center" justify="center">
      <form onSubmit={submitHandler}>
        <Flex mb={4}>
          <FormControl mr={2} variant="floating" id="rows" isRequired>
            <Input
              type="number"
              id="rows"
              name="rows"
              ref={totalRowsRef}
              onChange={rowChangeHandler}
              placeholder=" "
            />
            <FormLabel>Number of Rows</FormLabel>
          </FormControl>
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
        <div>{gameCtx?.players && <PlayerList />}</div>
        <Button width={"100%"} mt={3}>
          Play
        </Button>
      </form>
    </Flex>
  );
}
