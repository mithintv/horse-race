import { useContext } from "react";
import AppContext from "../src/context/app-context";

import Game from "../src/components/Game";
import Parameters from "../src/components/Parameters";
import Summary from "../src/components/Summary";

import { Heading, Wrap } from "@chakra-ui/react";

export default function Home() {
  const ctx = useContext(AppContext);

  return (
    <>
      <Heading as={"h1"} size="3xl" p={20} textAlign={"center"}>
        Horse Race
      </Heading>
      {ctx.mode.parameters && <Parameters />}
      {ctx.mode.game && <Game />}
      {ctx.mode.summary && <Summary />}
    </>
  );
}
