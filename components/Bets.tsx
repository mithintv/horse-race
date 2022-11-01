
type Props = {
  bets: string[];
};

export default function Bets({ bets }: Props) {

  return (
    <>
    {bets.map((bet) => {
      return (
        <li key={Math.random()}>
          <label htmlFor={`${bet} Bet`}>{`${bet} Bet`}</label>
          <input type="text" id={`${bet} Bet`} name={`${bet} Bet`}/>
        </li>
      );
    })}
    </>
  );
}
