import { useContext } from "react";
import AppContext from "../src/context/app-context";

import Game from "../src/components/modes/Game";
import Parameters from "../src/components/modes/Parameters";
import Summary from "../src/components/modes/Summary";

import { Heading, Wrap } from "@chakra-ui/react";

export default function Home() {
  const ctx = useContext(AppContext);

  return (
    <>
      <Heading as={"h1"} size="3xl" p={20} textAlign={"center"}>
        Horse Race
      </Heading>
      {ctx?.mode.parameters && <Parameters />}
      {ctx?.mode.game && <Game />}
      {ctx?.mode.summary && <Summary />}
    </>
  );
}
