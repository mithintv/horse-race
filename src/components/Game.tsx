import { useState, useReducer, useContext, useRef, useEffect } from "react";
import AppContext from "../context/app-context";
import { Card } from "./Card";
import { fullDeck, shuffleDeck, shuffledDeck } from "../models/deck";

import { Button, Flex, Heading } from "@chakra-ui/react";

export const deckReducer = (
  state: typeof shuffledDeck,
  action: { type: string }
) => {
  if (action.type === "shuffle") {
    const newDeck = shuffleDeck(fullDeck);
    return newDeck;
  }
  if (action.type === "draw") {
    const newDeck = [...state];
    newDeck.pop();
    return newDeck;
  }
  return state;
};

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

  const [deck, dispatchDeck] = useReducer(deckReducer, shuffledDeck);
  const [random, setRandom] = useState(<Card suit="joker" display="🃟" />);

  useEffect(() => {
    if (deck!.length === 0) {
      dispatchDeck({
        type: "shuffle",
      });
    }
  }, [deck!.length]);

  const randomCard = () => {
    console.log(deck);
    setRandom(
      <Card
        display={deck[deck.length - 1].display}
        suit={deck[deck.length - 1].suit}
      />
    );
    dispatchDeck({
      type: "draw",
    });
  };

  return (
    <Flex align={"center"} flexDir={"column"} justify={"center"}>
      <Heading as={"h2"} size="xl" mb={10} textAlign={"center"}>
        Game
      </Heading>
      <Flex wrap="wrap" flexDir="row">
        {random}
      </Flex>
      <Button onClick={randomCard}>Click</Button>
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
