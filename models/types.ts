export declare interface AppProps {
  children?: React.ReactNode;
}

export type EmptyInput = string | undefined;

export type Suit = {
  type: "Hearts" | "Spades" | "Diamonds" | "Clubs";
  bets: EmptyInput;
};

export type Player = {
  id: number;
  name: string;
  suits: Suit[];
};

export interface GameContextInt {
  rows: EmptyInput;
  players: Player[];
  displayForm: boolean;

  addRow: (enteredRows: EmptyInput) => void;
  addPlayer: (enteredPlayers: EmptyInput) => void;
  addName: (playerId: Player["id"], playerName: Player["name"]) => void;
  addBet: (playerId: Player["id"], playerBet: Suit) => void;
  setMode: () => void;
}
