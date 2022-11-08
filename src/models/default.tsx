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
    icon: <Icon fill="#D50001" as={BsSuitHeartFill} />,
  },
  {
    type: "spades",
    icon: <Icon fill="#000000" as={BsSuitSpadeFill} />,
  },
  {
    type: "diamonds",
    icon: <Icon fill="#D50001" as={BsSuitDiamondFill} />,
  },
  {
    type: "clubs",
    icon: <Icon fill="#000000" as={BsSuitClubFill} />,
  },
];
