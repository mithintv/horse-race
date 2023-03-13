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
  back,
  rungs,
} from "../models/deck";

import { Button, Flex, GridItem, Heading } from "@chakra-ui/react";
import { icons } from "../models/default";
import { moveBackward, moveForward } from "../utils/moveHorse";

export const deckReducer = (
  state: typeof shuffledDeck,
  action: { type: string }
) => {
  if (action.type === "shuffle") {
    const { deck: newDeck } = shuffleDeck(fullDeck);
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
  const [spadesHorse, setspadesHorse] = useState("0px");
  const [heartsHorse, setheartsHorse] = useState("0px");
  const [diamondsHorse, setdiamondsHorse] = useState("0px");
  const [clubsHorse, setclubsHorse] = useState("0px");

  const [rung1, setRung1] = useState(back.display);
  const [rung2, setRung2] = useState(back.display);
  const [rung3, setRung3] = useState(back.display);
  const [rung4, setRung4] = useState(back.display);
  const [rung5, setRung5] = useState(back.display);

  const [showRung1, setShowRung1] = useState(false);
  const [showRung2, setShowRung2] = useState(false);
  const [showRung3, setShowRung3] = useState(false);
  const [showRung4, setShowRung4] = useState(false);
  const [showRung5, setShowRung5] = useState(false);

  const [timeoutId, setTimeoutId] = useState();

  // shuffle deck if ran out of cards
  useEffect(() => {
    if (deck!.length === 0) {
      dispatchDeck({
        type: "shuffle",
      });
    }
  }, [deck!.length]);

  // move horses forward based on card drawn
  useEffect(() => {
    if (playCard.props.suit === "clubs") {
      setclubsHorse((prevState) => {
        return moveForward(prevState);
      });
    }
    if (playCard.props.suit === "diamonds") {
      setdiamondsHorse((prevState) => {
        return moveForward(prevState);
      });
    }
    if (playCard.props.suit === "hearts") {
      setheartsHorse((prevState) => {
        return moveForward(prevState);
      });
    }
    if (playCard.props.suit === "spades") {
      setspadesHorse((prevState) => {
        return moveForward(prevState);
      });
    }
  }, [playCard]);

  // set winner when a horse reaches threshold
  useEffect(() => {
    if (heartsHorse === "600px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("hearts");
      clearTimeout(timeoutId);
    }
    if (spadesHorse === "600px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("spades");
      clearTimeout(timeoutId);
    }
    if (diamondsHorse === "600px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("diamonds");
      clearTimeout(timeoutId);
    }
    if (clubsHorse === "600px") {
      ctx.setMode("END_GAME");
      ctx.setWinner("clubs");
      clearTimeout(timeoutId);
    }
  }, [heartsHorse, spadesHorse, diamondsHorse, clubsHorse]);

  // Rung behavior
  useEffect(() => {
    if (
      heartsHorse >= "100px" &&
      spadesHorse >= "100px" &&
      diamondsHorse >= "100px" &&
      clubsHorse >= "100px" &&
      !showRung1
    ) {
      setRung1(rungs[0].display);
      eval("set" + rungs[0].suit + "Horse")((prevState: string) => {
        return moveBackward(prevState);
      });
      setShowRung1(true);
    }
    if (
      heartsHorse >= "200px" &&
      spadesHorse >= "200px" &&
      diamondsHorse >= "200px" &&
      clubsHorse >= "200px" &&
      !showRung2
    ) {
      setRung2(rungs[1].display);
      eval("set" + rungs[1].suit + "Horse")((prevState: string) => {
        return moveBackward(prevState);
      });
      setShowRung2(true);
    }
    if (
      heartsHorse >= "300px" &&
      spadesHorse >= "300px" &&
      diamondsHorse >= "300px" &&
      clubsHorse >= "300px" &&
      !showRung3
    ) {
      setRung3(rungs[2].display);
      eval("set" + rungs[2].suit + "Horse")((prevState: string) => {
        return moveBackward(prevState);
      });
      setShowRung3(true);
    }
    if (
      heartsHorse >= "400px" &&
      spadesHorse >= "400px" &&
      diamondsHorse >= "400px" &&
      clubsHorse >= "400px" &&
      !showRung4
    ) {
      setRung4(rungs[3].display);
      eval("set" + rungs[3].suit + "Horse")((prevState: string) => {
        return moveBackward(prevState);
      });
      setShowRung4(true);
    }
    if (
      heartsHorse >= "500px" &&
      spadesHorse >= "500px" &&
      diamondsHorse >= "500px" &&
      clubsHorse >= "500px" &&
      !showRung5
    ) {
      setRung5(rungs[4].display);
      eval("set" + rungs[4].suit + "Horse")((prevState: string) => {
        return moveBackward(prevState);
      });
      setShowRung5(true);
    }
  }, [heartsHorse, spadesHorse, diamondsHorse, clubsHorse]);

  // Drawing card behaviour
  useEffect(() => {
    if (!ctx.game.winner) {
      let timeoutId: any = setTimeout(() => {
        setPlayCard(
          <Card
            display={deck[deck.length - 1].display}
            suit={deck[deck.length - 1].suit}
          />
        );
        dispatchDeck({
          type: "draw",
        });
      }, 3000);
      setTimeoutId(timeoutId);
    }
  }, [deck]);
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
      <Flex width="100%" marginLeft="200px" gridGap={"10px"}>
        {rungs.map((card, index) => {
          return (
            <GridItem key={index}>
              <Card
                display={eval("rung" + `${index + 1}`)}
                suit={
                  eval("rung" + `${index + 1}`) !== back.display
                    ? card.suit
                    : back.suit
                }
              />
            </GridItem>
          );
        })}
      </Flex>
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
