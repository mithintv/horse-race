import { useContext } from "react";
import AppContext from "../../context/app-context";
import type { PlayerType } from "../../models/types";
// chakra components
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { icons } from "../../models/default";

export default function CurrentWagers(props: Pick<PlayerType, "id" | "name">) {
  const ctx = useContext(AppContext);
  const player = ctx.players[props.id - 1];

  return (
    <Flex flexDir="column" align="center">
      <Divider mt={2} mb={5} />
      <Heading as={"h3"} size="md" mb={5} textAlign={"center"}>
        Current Wagers
      </Heading>
      {player.suits![icons[0].type]!.bets && (
        <Flex flexDir="column" mb={3}>
          <Heading as={"h4"} size="sm" mb={2} textAlign={"center"}>
            Hearts
          </Heading>
          <Text textAlign={"center"}>{player!.suits!.hearts!.bets}</Text>
        </Flex>
      )}
      {player.suits![icons[1].type]!.bets && (
        <Flex flexDir="column" mb={3}>
          <Heading as={"h4"} size="sm" mb={2} textAlign={"center"}>
            Spades
          </Heading>
          <Text textAlign={"center"}>{player!.suits!.spades!.bets}</Text>
        </Flex>
      )}
      {player.suits![icons[2].type]!.bets && (
        <Flex flexDir="column" mb={3}>
          <Heading as={"h4"} size="sm" mb={2} textAlign={"center"}>
            Diamonds
          </Heading>
          <Text textAlign={"center"}>{player!.suits!.diamonds!.bets}</Text>
        </Flex>
      )}
      {player.suits![icons[3].type]!.bets && (
        <Flex flexDir="column" mb={3}>
          <Heading as={"h4"} size="sm" mb={2} textAlign={"center"}>
            Clubs
          </Heading>
          <Text textAlign={"center"}>{player!.suits!.clubs!.bets}</Text>
        </Flex>
      )}
    </Flex>
  );
}
