import type { PlayerType } from "../../models/types";
import React, { useContext } from "react";
import AppContext from "../../context/app-context";
import Wager from "./Wager";

import { icons } from "../../models/default";
import { Flex } from "@chakra-ui/react";

export default function CurrentWagers(props: Pick<PlayerType, "id" | "name">) {
  const ctx = useContext(AppContext);
  const player = ctx.players[props.id - 1];

  return (
    <Flex flexDir="column" mb={3}>
      {icons.map((icon, index) => {
        return (
          player.suits[icon.type].wagers.length > 0 && (
            <Flex key={index} flexDir="column" alignItems={"center"} mb={2}>
              {icon.icon}
              <Flex flexDir="column" mb={2}>
                {player!.suits![icon.type]!.wagers.map((wager, index) => {
                  return (
                    <Wager
                      key={index}
                      suit={icon.type}
                      text={wager}
                      id={index}
                      playerId={props.id}
                    />
                  );
                })}
              </Flex>
            </Flex>
          )
        );
      })}
    </Flex>
  );
}
