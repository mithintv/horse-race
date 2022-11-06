export declare interface AppProps {
  children?: React.ReactNode;
}

export type EmptyInput = string | undefined;

export interface SuitType {
  type: "Hearts" | "Spades" | "Diamonds" | "Clubs";
  bets: EmptyInput;
}

export interface PlayerType {
  id: number;
  name: string;
  suits: SuitType[];
}

export interface GameContextInt {
  rows: EmptyInput;
  players: PlayerType[];
  displayForm: boolean;

  addRow: (enteredRows: EmptyInput) => void;
  addPlayer: (enteredPlayers: EmptyInput) => void;
  addName: (playerId: PlayerType["id"], playerName: PlayerType["name"]) => void;
  addBet: (playerId: PlayerType["id"], playerBet: SuitType) => void;
  setMode: () => void;
}
