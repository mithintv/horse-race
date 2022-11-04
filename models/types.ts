export declare interface AppProps {
  children?: React.ReactNode;
}

export type Player = {
  id: number;
  name: string;
  suits: {
    type: "Hearts" | "Spades" | "Diamonds" | "Clubs" | null;
    bets: string | null;
  }[];
};

export interface GameContextInt {
  rows: string | undefined;
  players: Player[];
  displayForm: boolean;

  addRows: (enteredRows: GameContextInt["rows"]) => void;
  addPlayerForm: (enteredPlayers: string | undefined) => void;
  addName: (playerId: number, playerName: string) => void;
  addBet: (playerId: number, playerBet: {}) => void;
  setMode: () => void;
}
