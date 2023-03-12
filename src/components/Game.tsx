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
import { icons } from "../models/default";

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
    console.log(playCard.props.suit);
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
  }, [playCard]);

  useEffect(() => {
    if (heartsHorse === "500px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("hearts");
    }
    if (spadesHorse === "500px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("spades");
    }
    if (diamondsHorse === "500px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("diamonds");
    }
    if (clubsHorse === "500px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("clubs");
    }
  }, [heartsHorse, spadesHorse, diamondsHorse, clubsHorse]);

  const randomCard = () => {
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

  const viewResults = () => {
    ctx.setMode("VIEW_RESULTS");
  };

  return (
    <Flex align={"center"} flexDir={"column"} justify={"center"}>
      <Heading as={"h2"} size="xl" mb={10} textAlign={"center"}>
        {ctx.game.winner &&
          icons.find((icon) => icon.type === ctx.game.winner)!.icon}
        {ctx.game.winner && "Wins"}
        {!ctx.game.winner && "Game"}
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
      {!ctx.game.winner && <Button onClick={randomCard}>Click</Button>}
      {ctx.game.winner && <Button onClick={viewResults}>Results</Button>}
      <Flex justifyContent={"space-between"}>
        <Button
          onClick={clickHandler.bind(heartsRef)}
          ref={heartsRef}
          name="hearts"
          type="submit"
          width={"22%"}
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
          width={"28%"}
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
