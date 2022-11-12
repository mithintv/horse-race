import { useContext } from "react";
import AppContext from "../../context/app-context";
import type { PlayerType } from "../../models/types";
// chakra components
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { icons } from "../../models/default";

export default function CurrentWagers(props: Pick<PlayerType, "id" | "name">) {
  const ctx = useContext(AppContext);

  return (
    <Flex flexDir="column" align="center">
      <Divider mb={5} />
      <Heading as={"h3"} size="md" mb={5} textAlign={"center"}>
        Current Wagers
      </Heading>
      {ctx.players[props.id].suits![icons[0].type]?.checked && (
        <Heading as={"h4"} size="sm" mb={10} textAlign={"center"}>
          Hearts
        </Heading>
      )}

      <Text>{ctx.players[props.id].suits!.hearts!.bets}</Text>
    </Flex>
  );
}
