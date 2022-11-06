export declare interface AppProps {
  children?: React.ReactNode;
}

export type EmptyInput = string | undefined;

export type SuitTypes = "hearts" | "spades" | "diamonds" | "clubs";

export const suits: SuitTypes[] = ["hearts", "spades", "diamonds", "clubs"];

export type SuitSpecific = {
  type: SuitTypes;
  checked: boolean;
  bets: EmptyInput;
};

export type SuitType = {
  [key in SuitTypes]: SuitSpecific;
};

// export interface SuitType {
//   type: "Hearts" | "Spades" | "Diamonds" | "Clubs";
//   checked: boolean;
//   bets: EmptyInput;
// }

export interface PlayerType {
  id: number;
  name: string;
  suits: SuitType;
}

export interface GameContextInt {
  rows: EmptyInput;
  players: PlayerType[];
  displayForm: boolean;

  addRow: (enteredRows: EmptyInput) => void;
  addPlayer: (enteredPlayers: EmptyInput) => void;
  addName: (playerId: PlayerType["id"], playerName: PlayerType["name"]) => void;
  addSuit: (
    playerId: PlayerType["id"],
    playerSuit: Omit<SuitSpecific, "bets">
  ) => void;
  addBet: (
    playerId: PlayerType["id"],
    playerBet: Omit<SuitSpecific, "checked">
  ) => void;
  setMode: () => void;
}
