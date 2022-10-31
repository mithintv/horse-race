import { useEffect, useState } from "react";

type Props = {
  bets: string[];
};

export default function Bets({ bets }: Props) {
  const [betsArray, setBetsArray] = useState<string[] | null>(null);
  useEffect(() => {
    setBetsArray(bets);
  }, [bets]);
  return (
    <ul>
      {betsArray &&
        betsArray.map((bet) => {
          return (
            <li key={Math.random()}>
              <input type="text" />
            </li>
          );
        })}
    </ul>
  );
}
