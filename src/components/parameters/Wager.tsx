import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import AppContext from "../../context/app-context";
import type { SuitTypes } from "../../models/types";

export default function Wager(props: {
  playerId: number;
  suit: SuitTypes;
  text: string;
  id: number;
}) {
  const ctx = useContext(AppContext);

  function removeHandler() {
    ctx.removeWager(props.playerId, {
      type: props.suit,
      id: props.id,
    });
  }
  return (
    <Flex minW={350} justifyContent={"center"} flexDir="row">
      <Text textAlign={"center"} mr={2}>
        {props.text}
      </Text>
      <button onClick={removeHandler}>
        <MdOutlineRemoveCircleOutline size={"1.5em"} />
      </button>
    </Flex>
  );
}
