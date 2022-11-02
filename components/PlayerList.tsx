import { BetType, BetsType } from "../models/types";

import { useEffect, useState } from "react";
import Bet from "./Bet";

type Props = {
  unfilledBets: string[];
  returnBets: (playerBets: BetsType) => void;
};

export default function Bets(props: Props) {
  const [filledBets, setFilledBets] = useState<BetsType>([]);

  function returnData(playerData: BetType) {
    setFilledBets([...filledBets, playerData]);
  }

  useEffect(() => {
    props.returnBets(filledBets);
  }, [filledBets]);

  return (
    // for each entry in the array created in PlayerList (totalBets), return a Bet component
    <>
      {props.unfilledBets.map((bet) => {
        return <Bet key={bet} playerId={bet} sendData={returnData} />;
      })}
    </>
  );
}
