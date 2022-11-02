import Bet from "./Bet";

type Props = {
  totalBets: string[];
};

export default function Bets({ totalBets }: Props) {
  return (
    // for each entry in the array created in PlayerList (totalBets), return a Bet component
    <>
      {totalBets.map((bet) => {
        return <Bet key={bet} playerId={bet} />;
      })}
    </>
  );
}
