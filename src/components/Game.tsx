import { useState, useReducer, useContext, useRef, useEffect } from "react";
import AppContext from "../context/app-context";
import { Card } from "./Card";
import {
  hearts,
  spades,
  diamonds,
  clubs,
  joker,
  fullDeck,
  shuffleDeck,
  shuffledDeck,
} from "../models/deck";

import { Button, Flex, GridItem, Heading } from "@chakra-ui/react";

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
  const [playCard, setPlayCard] = useState(
    <Card suit={joker.suit} display={joker.display} />
  );
  const [spadesHorse, setSpadesHorse] = useState("0");
  const [heartsHorse, setHeartsHorse] = useState("0");
  const [diamondsHorse, setDiamondsHorse] = useState("0");
  const [clubsHorse, setClubsHorse] = useState("0");

  useEffect(() => {
    if (deck!.length === 0) {
      dispatchDeck({
        type: "shuffle",
      });
    }
  }, [deck!.length]);

  useEffect(() => {
    if (playCard.props.suit === "clubs") {
      setClubsHorse((prevState) => {
        return (parseInt(prevState) + 100).toString() + "px";
      });
    }
    if (playCard.props.suit === "diamonds") {
      setDiamondsHorse((prevState) => {
        return (parseInt(prevState) + 100).toString() + "px";
      });
    }
    if (playCard.props.suit === "hearts") {
      setHeartsHorse((prevState) => {
        return (parseInt(prevState) + 100).toString() + "px";
      });
    }
    if (playCard.props.suit === "spades") {
      setSpadesHorse((prevState) => {
        return (parseInt(prevState) + 100).toString() + "px";
      });
    }
  }, [playCard.props.suit]);

  const randomCard = () => {
    console.log(deck);
    setPlayCard(
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
      <Flex
        wrap="wrap"
        width="100%"
        flexDir="column"
        lineHeight="120px"
        justifyContent="flex-start"
      >
        <GridItem
          css={{
            marginLeft: heartsHorse,
          }}
        >
          <Card display={hearts[12].display} suit={hearts[12].suit} />
        </GridItem>
        <GridItem
          css={{
            marginLeft: spadesHorse,
          }}
        >
          <Card display={spades[12].display} suit={spades[12].suit} />
        </GridItem>
        <GridItem
          css={{
            marginLeft: diamondsHorse,
          }}
        >
          <Card display={diamonds[12].display} suit={diamonds[12].suit} />
        </GridItem>
        <GridItem
          css={{
            marginLeft: clubsHorse,
          }}
        >
          <Card display={clubs[12].display} suit={clubs[12].suit} />
        </GridItem>
      </Flex>
      <Flex wrap="wrap" flexDir="row">
        {playCard}
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
