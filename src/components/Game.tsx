import { useContext, useRef } from "react";
import AppContext from "../context/app-context";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { SuitTypes } from "../models/types";
import { icons } from "../models/default";

export default function Game() {
  const ctx = useContext(AppContext);

  // temp game summary handler
  const heartsRef = useRef<HTMLButtonElement>(null);
  const spadesRef = useRef<HTMLButtonElement>(null);
  const diamondsRef = useRef<HTMLButtonElement>(null);
  const clubsRef = useRef<HTMLButtonElement>(null);
  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.target as HTMLButtonElement;
    ctx?.setMode("END_GAME");
    ctx.setWinner(target.name);
  };

  return (
    <Flex align={"center"} flexDir={"column"} justify={"center"}>
      <Heading as={"h2"} size="xl" mb={10} textAlign={"center"}>
        Game
      </Heading>
      <Flex justifyContent={"space-between"}>
        <Button
          onClick={clickHandler.bind(heartsRef)}
          ref={heartsRef}
          name="hearts"
          type="submit"
          width={"24%"}
          mt={3}
        >
          Hearts
        </Button>
        <Button
          onClick={clickHandler.bind(spadesRef)}
          ref={spadesRef}
          name="spades"
          type="submit"
          width={"24%"}
          mt={3}
        >
          Spades
        </Button>
        <Button
          onClick={clickHandler.bind(diamondsRef)}
          ref={diamondsRef}
          name="diamonds"
          type="submit"
          width={"24%"}
          mt={3}
        >
          Diamonds
        </Button>
        <Button
          onClick={clickHandler.bind(clubsRef)}
          ref={clubsRef}
          name="clubs"
          type="submit"
          width={"24%"}
          mt={3}
        >
          Clubs
        </Button>
      </Flex>
    </Flex>
  );
}
