import type { ContextInt, GameActionType } from "../models/types";

export const initialGameState = {
  rows: null,
  winner: null,
};

export default function gameStateReducer(
  state: ContextInt["game"],
  action: GameActionType
) {
  let newState = { ...state };
  switch (action.type) {
    case "SET_WINNER":
      newState.winner = action.payload!.winner;
      return newState;
    case "NEW_GAME":
      return {
        ...newState,
        winner: null,
      };
  }
}
