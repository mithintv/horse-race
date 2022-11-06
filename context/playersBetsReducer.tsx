import { EmptyInput, PlayerType, SuitType, suits } from "../models/types";

export const initialState: [] = [];

export type ActionType =
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
        suit: SuitType["type"];
        checked: boolean;
      };
    }
  | {
      type: "UPDATE_BETS";
      payload: {
        playerId: PlayerType["id"];
        suit: SuitType["type"];
        bets: EmptyInput;
      };
    };

export default function playersBetsReducer(
  state: PlayerType[],
  action: ActionType
) {
  let newState: PlayerType[], player;
  switch (action.type) {
    case "UPDATE_PLAYERS":
      // create an empty array and fill with default player ids based on total number of players
      if (action.payload) {
        const filledArray: PlayerType[] = [];
        for (let i = 0; i < +action.payload; i++) {
          filledArray.push({
            id: i + 1,
            name: `Player ${i + 1}`,
            suits: suits.map((suit) => {
              return { type: suit, checked: false, bets: undefined };
            }),
          });
        }
        return filledArray;
      } else return state;

    case "UPDATE_NAME":
      newState = [...state];
      player = newState.find((player) => player.id === action.payload.playerId);
      if (player) {
        player.name = action.payload.playerName;
      } else console.error(`Player with ${action.payload.playerId} not found`);
      return newState;

    case "UPDATE_SUIT":
      newState = [...state];
      player = newState.find((player) => player.id === action.payload.playerId);
      if (player) {
        const suitIndex = player.suits.find(
          (suit) => suit.type === action.payload.suit
        );
        if (suitIndex) suitIndex.checked = action.payload.checked;
      }
      return newState;

    case "UPDATE_BETS":
      newState = [...state];
      player = newState.find((player) => player.id === action.payload.playerId);
      if (player) {
        const suitIndex = player.suits.find(
          (suit) => suit.type === action.payload.suit
        );
        if (suitIndex) suitIndex.bets = action.payload.bets;
      }
      return newState;
  }
}
