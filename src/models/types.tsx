export declare interface AppProps {
  children?: React.ReactNode;
}

export type EmptyInput = string | null;

export type SuitTypes = "hearts" | "spades" | "diamonds" | "clubs";

export interface SuitIcons {
  type: SuitTypes;
  icon: JSX.Element;
}
[];

export interface SuitSpecific {
  type: SuitTypes;
  checked: boolean;
  wagers: string[];
}

export type SuitType = {
  [key in SuitTypes]: SuitSpecific;
};

export interface PlayerType {
  id: number;
  name: string;
  suits: SuitType;
}

export interface ContextInt {
  mode: {
    parameters: boolean;
    game: boolean;
    summary: boolean;
  };
  game: {
    rows: EmptyInput;
    winner: EmptyInput;
  };
  players: PlayerType[];

  addRow: (enteredRows: EmptyInput) => void;
  addPlayer: (enteredPlayers: EmptyInput) => void;
  addName: (playerId: PlayerType["id"], playerName: PlayerType["name"]) => void;
  addSuit: (
    playerId: PlayerType["id"],
    playerSuit: Omit<SuitSpecific, "wagers">
  ) => void;
  addWager: (
    playerId: PlayerType["id"],
    wager: { type: SuitTypes; text: string }
  ) => void;
  removeWager: (
    playerId: PlayerType["id"],
    wager: { type: SuitTypes; id: number }
  ) => void;

  setWinner: (winningSuit: string) => void;
  setMode: (type: "RESET_GAME" | "PLAY_GAME" | "END_GAME") => void;
}

// reducer types
export type ModeActionType =
  | { type: "RESET_GAME" }
  | { type: "PLAY_GAME" }
  | { type: "END_GAME" };

export type PlayersBetsActionType =
  | { type: "UPDATE_PLAYERS"; payload: EmptyInput }
  | {
      type: "UPDATE_NAME";
      payload: {
        playerId: PlayerType["id"];
        playerName: PlayerType["name"];
      };
    }
  | {
      type: "UPDATE_SUIT";
      payload: {
        playerId: PlayerType["id"];
        suit: SuitSpecific["type"];
        checked: SuitSpecific["checked"];
      };
    }
  | {
      type: "ADD_WAGER";
      payload: {
        playerId: PlayerType["id"];
        suit: SuitTypes;
        wager: string;
      };
    }
  | {
      type: "REMOVE_WAGER";
      payload: {
        playerId: PlayerType["id"];
        suit: SuitTypes;
        wagerId: number;
      };
    };

export type GameActionType = {
  type: "SET_WINNER";
  payload: {
    winner: ContextInt["game"]["winner"];
  };
};
