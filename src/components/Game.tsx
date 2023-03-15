import { useState, useReducer, useContext, useEffect } from "react";
import AppContext from "../context/app-context";
import { Card } from "./Card";
import { hearts, spades, diamonds, clubs, joker, back } from "../models/deck";

import { Button, Flex, GridItem, Heading } from "@chakra-ui/react";
import { icons } from "../models/default";
import { moveBackward, moveForward } from "../utils/moveHorse";
import { animationCSS } from "../utils/animations";

export default function Game() {
  const ctx = useContext(AppContext);

  const [playCard, setPlayCard] = useState(
    <Card suit={joker.suit} display={joker.display} />
  );

  const [heartsHorse, setheartsHorse] = useState("0px");
  const [spadesHorse, setspadesHorse] = useState("0px");
  const [diamondsHorse, setdiamondsHorse] = useState("0px");
  const [clubsHorse, setclubsHorse] = useState("0px");

  const [animateHearts, setAnimatehearts] = useState("forward");
  const [animateSpades, setAnimatespades] = useState("forward");
  const [animateDiamonds, setAnimatediamonds] = useState("forward");
  const [animateClubs, setAnimateclubs] = useState("forward");

  const [rungReveal, setRungReveal] = useState(false);

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
    if (ctx.deck.order.length === 0) {
      ctx.setDeck("SHUFFLE");
    }
  }, [ctx.deck.order]);

  // move horses forward based on card drawn
  useEffect(() => {
    if (playCard.props.suit === "hearts") {
      setheartsHorse((prevState) => {
        return moveForward(prevState);
      });
      setAnimatehearts("forward");
    }
    if (playCard.props.suit === "spades") {
      setspadesHorse((prevState) => {
        return moveForward(prevState);
      });
      setAnimatespades("forward");
    }
    if (playCard.props.suit === "diamonds") {
      setdiamondsHorse((prevState) => {
        return moveForward(prevState);
      });
      setAnimatediamonds("forward");
    }
    if (playCard.props.suit === "clubs") {
      setclubsHorse((prevState) => {
        return moveForward(prevState);
      });
      setAnimateclubs("forward");
    }
  }, [playCard.props]);

  let end = "600px";
  // set winner when a horse reaches threshold
  useEffect(() => {
    if (heartsHorse === end) {
      ctx.setMode("END_GAME");
      ctx.setWinner("hearts");
      clearTimeout(timeoutId);
    }
    if (spadesHorse === end) {
      ctx.setMode("END_GAME");
      ctx.setWinner("spades");
      clearTimeout(timeoutId);
    }
    if (diamondsHorse === end) {
      ctx.setMode("END_GAME");
      ctx.setWinner("diamonds");
      clearTimeout(timeoutId);
    }
    if (clubsHorse === end) {
      ctx.setMode("END_GAME");
      ctx.setWinner("clubs");
      clearTimeout(timeoutId);
    }
  }, [end, timeoutId, heartsHorse, spadesHorse, diamondsHorse, clubsHorse]);

  // move horse back based on rung reveal
  useEffect(() => {
    if (
      heartsHorse >= "100px" &&
      spadesHorse >= "100px" &&
      diamondsHorse >= "100px" &&
      clubsHorse >= "100px" &&
      !showRung1
    ) {
      setTimeout(() => {
        setRungReveal(true);
        setRung1(ctx.deck.rungs[0].display);
        eval("set" + ctx.deck.rungs[0].suit + "Horse")((prevState: string) => {
          return moveBackward(prevState);
        });
        eval("setAnimate" + ctx.deck.rungs[0].suit)("backward");
        setShowRung1(true);
        setRungReveal(false);
      }, 1000);
    }
    if (
      heartsHorse >= "200px" &&
      spadesHorse >= "200px" &&
      diamondsHorse >= "200px" &&
      clubsHorse >= "200px" &&
      !showRung2
    ) {
      setTimeout(() => {
        setRungReveal(true);
        setRung2(ctx.deck.rungs[1].display);
        eval("set" + ctx.deck.rungs[1].suit + "Horse")((prevState: string) => {
          return moveBackward(prevState);
        });
        eval("setAnimate" + ctx.deck.rungs[1].suit)("backward");
        setShowRung2(true);
        setRungReveal(false);
      }, 1000);
    }
    if (
      heartsHorse >= "300px" &&
      spadesHorse >= "300px" &&
      diamondsHorse >= "300px" &&
      clubsHorse >= "300px" &&
      !showRung3
    ) {
      setTimeout(() => {
        setRungReveal(true);
        setRung3(ctx.deck.rungs[2].display);
        eval("set" + ctx.deck.rungs[2].suit + "Horse")((prevState: string) => {
          return moveBackward(prevState);
        });
        eval("setAnimate" + ctx.deck.rungs[2].suit)("backward");
        setShowRung3(true);
        setRungReveal(false);
      }, 1000);
    }
    if (
      heartsHorse >= "400px" &&
      spadesHorse >= "400px" &&
      diamondsHorse >= "400px" &&
      clubsHorse >= "400px" &&
      !showRung4
    ) {
      setTimeout(() => {
        setRungReveal(true);
        setRung4(ctx.deck.rungs[3].display);
        eval("set" + ctx.deck.rungs[3].suit + "Horse")((prevState: string) => {
          return moveBackward(prevState);
        });
        eval("setAnimate" + ctx.deck.rungs[3].suit)("backward");
        setShowRung4(true);
        setRungReveal(false);
      }, 1000);
    }
    if (
      heartsHorse >= "500px" &&
      spadesHorse >= "500px" &&
      diamondsHorse >= "500px" &&
      clubsHorse >= "500px" &&
      !showRung5
    ) {
      setTimeout(() => {
        setRungReveal(true);
        setRung5(ctx.deck.rungs[4].display);
        eval("set" + ctx.deck.rungs[4].suit + "Horse")((prevState: string) => {
          return moveBackward(prevState);
        });
        eval("setAnimate" + ctx.deck.rungs[4].suit)("backward");
        setShowRung5(true);
        setRungReveal(false);
      }, 1000);
    }
  }, [
    ctx.deck.rungs,
    showRung1,
    showRung2,
    showRung3,
    showRung4,
    showRung5,
    heartsHorse,
    spadesHorse,
    diamondsHorse,
    clubsHorse,
  ]);

  // Drawing card behaviour
  useEffect(() => {
    if (!ctx.game.winner && !rungReveal) {
      let timeoutId: any = setTimeout(() => {
        setPlayCard(
          <Card
            display={ctx.deck.order[ctx.deck.order.length - 1].display}
            suit={ctx.deck.order[ctx.deck.order.length - 1].suit}
          />
        );
        ctx.setDeck("DRAW");
      }, 2000);
      setTimeoutId(timeoutId);
    }
  }, [ctx.deck.order.length, ctx.game.winner, rungReveal]);

  const randomCard = () => {
    setPlayCard(
      <Card
        display={ctx.deck.order[ctx.deck.order.length - 1].display}
        suit={ctx.deck.order[ctx.deck.order.length - 1].suit}
      />
    );
    ctx.setDeck("DRAW");
  };

  const viewResults = () => {
    ctx.setMode("VIEW_RESULTS");
    // dispatchDeck({ type: "shuffle" });
  };

  return (
    <Flex align={"center"} flexDir={"column"} justify={"center"}>
      <Flex
        width="500px"
        flexDir="row"
        justifyContent="space-evenly"
        alignItems="end"
      >
        {ctx.game.winner && <Button onClick={viewResults}>Results</Button>}
        <Heading
          as={"h2"}
          margin={"1rem auto 0"}
          size="xl"
          textAlign={"center"}
        >
          {ctx.game.winner &&
            icons.find((icon) => icon.type === ctx.game.winner)!.icon}
          {ctx.game.winner && " Wins"}
          {!ctx.game.winner && "Game"}
        </Heading>
        {ctx.game.winner && <Button onClick={viewResults}>Results</Button>}
      </Flex>
      <Flex flexDir="column" alignItems="center">
        {/* rungs flex container */}
        <Flex gridGap={"10px"} lineHeight="125px">
          {ctx.deck.rungs.map((card, index) => {
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
        {/* horses flex container */}
        <Flex
          width="690px"
          flexDir="column"
          lineHeight="110px"
          justifyContent="flex-start"
        >
          <GridItem css={animationCSS(spadesHorse, animateSpades)}>
            <Card display={spades[12].display} suit={spades[12].suit} />
          </GridItem>
          <GridItem css={animationCSS(heartsHorse, animateHearts)}>
            <Card display={hearts[12].display} suit={hearts[12].suit} />
          </GridItem>
          <GridItem css={animationCSS(clubsHorse, animateClubs)}>
            <Card display={clubs[12].display} suit={clubs[12].suit} />
          </GridItem>
          <GridItem css={animationCSS(diamondsHorse, animateDiamonds)}>
            <Card display={diamonds[12].display} suit={diamonds[12].suit} />
          </GridItem>
        </Flex>
        <div css={{ position: "relative", top: "-25px" }}>{playCard}</div>
      </Flex>

      {/* {!ctx.game.winner && <Button onClick={randomCard}>Click</Button>} */}
    </Flex>
  );
}
