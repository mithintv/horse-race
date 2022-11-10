import type { ContextInt, ModeActionType } from "../models/types";

export const initialModeState = {
  parameters: true,
  game: false,
  summary: false,
};

export default function modeReducer(
  state: ContextInt["mode"],
  action: ModeActionType
) {
  switch (action.type) {
    case "RESET_GAME":
      return {
        parameters: true,
        game: false,
        summary: false,
      };
    case "PLAY_GAME":
      return {
        parameters: false,
        game: true,
        summary: false,
      };
    case "END_GAME":
      return {
        parameters: false,
        game: false,
        summary: true,
      };
  }
}
