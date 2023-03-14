import { SuitIcons } from "./types";
// chakra components
import { Icon } from "@chakra-ui/react";
import {
  BsSuitHeartFill,
  BsSuitSpadeFill,
  BsSuitDiamondFill,
  BsSuitClubFill,
} from "react-icons/bs";

export const icons: SuitIcons[] = [
  {
    type: "hearts",
    icon: (
      <Icon
        css={{ verticalAlign: "text-top" }}
        fill="#D50001"
        as={BsSuitHeartFill}
      />
    ),
  },
  {
    type: "spades",
    icon: (
      <Icon
        css={{ verticalAlign: "text-top" }}
        fill="#000000"
        as={BsSuitSpadeFill}
      />
    ),
  },
  {
    type: "diamonds",
    icon: (
      <Icon
        css={{ verticalAlign: "text-top" }}
        fill="#D50001"
        as={BsSuitDiamondFill}
      />
    ),
  },
  {
    type: "clubs",
    icon: (
      <Icon
        css={{ verticalAlign: "text-top" }}
        fill="#000000"
        as={BsSuitClubFill}
      />
    ),
  },
];
