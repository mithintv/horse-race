import { useContext } from "react";
import GameContext from "../src/context/game-context";

import Game from "../src/components/Game";
import Parameters from "../src/components/Parameters";
import Summary from "../src/components/Summary";

import { Heading, Wrap } from "@chakra-ui/react";

export default function Home() {
  const gameCtx = useContext(GameContext);

  return (
    <>
      <Heading as={"h1"} size="3xl" p={20} textAlign={"center"}>
        Horse Race
      </Heading>
      {gameCtx?.mode.parameters && <Parameters />}
      {gameCtx?.mode.game && <Game />}
      {gameCtx?.mode.summary && <Summary />}
    </>
  );
}
