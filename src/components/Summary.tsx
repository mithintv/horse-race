import { useContext } from "react";
import AppContext from "../context/app-context";

import {
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { icons } from "../models/default";

export default function Summary() {
  const ctx = useContext(AppContext);
  const type = icons.find((icon) => icon.type === ctx?.game.winner);
  const winners = ctx.players.filter(
    (player) =>
      player.suits[type!.type].checked && player.suits[type!.type].bets
  );

  // losers
  const losers = [];
  const losingSuits = icons.filter((icon) => icon.type !== ctx?.game.winner);

  const suitOne = ctx.players.filter(
    (player) =>
      player.suits[losingSuits[0].type].checked &&
      player.suits[losingSuits[0].type].bets
  );
  const suitTwo = ctx.players.filter(
    (player) =>
      player.suits[losingSuits[1].type].checked &&
      player.suits[losingSuits[1].type].bets
  );
  const suitThree = ctx.players.filter(
    (player) =>
      player.suits[losingSuits[2].type].checked &&
      player.suits[losingSuits[2].type].bets
  );

  const clickHandler = () => {
    ctx.setMode("RESET_GAME");
  };
  return (
    <Flex flexDir={"column"} align={"center"}>
      <Button onClick={clickHandler} width={"150px"} mb={20}>
        New Game
      </Button>

      <Heading
        as={"h2"}
        size="xl"
        mb={10}
        textAlign={"center"}
        justifyContent={"center"}
      >
        {type!.icon} Wins!
      </Heading>
      <Flex flexDir={"column"} justifyContent={"center"}>
        <Heading
          as={"h3"}
          size="lg"
          mb={3}
          textAlign={"center"}
          justifyContent={"center"}
        >
          Winners
        </Heading>
        <Flex mb={10} justifyContent={"center"}>
          <TableContainer minW={"480px"}>
            <Table>
              <TableCaption>Winning Wagers</TableCaption>
              <Thead>
                <Tr>
                  <Th textAlign={"center"}>Players</Th>
                  <Th textAlign={"center"}>Wagers</Th>
                </Tr>
              </Thead>
              <Tbody>
                {winners.map((winner, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign={"center"}>{winner.name}</Td>
                      <Td textAlign={"center"}>
                        {winner.suits[type!.type].bets}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        <Heading
          as={"h3"}
          size="lg"
          mb={3}
          textAlign={"center"}
          justifyContent={"center"}
        >
          Losers
        </Heading>
        <Flex justifyContent={"center"}>
          <TableContainer minW={"480px"}>
            <Table>
              <TableCaption>Losing Wagers</TableCaption>
              <Thead>
                <Tr>
                  <Th textAlign={"center"}>Players</Th>
                  <Th textAlign={"center"}>Wagers</Th>
                </Tr>
              </Thead>
              <Tbody>
                {suitOne.map((suit, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign={"center"}>{suit.name}</Td>
                      <Td textAlign={"center"}>
                        {suit.suits[losingSuits[0].type].bets}
                      </Td>
                    </Tr>
                  );
                })}

                {suitTwo.map((suit, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign={"center"}>{suit.name}</Td>
                      <Td textAlign={"center"}>
                        {suit.suits[losingSuits[1].type].bets}
                      </Td>
                    </Tr>
                  );
                })}

                {suitThree.map((suit, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign={"center"}>{suit.name}</Td>
                      <Td textAlign={"center"}>
                        {suit.suits[losingSuits[2].type].bets}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
