import { Player } from "../models/types";

export const initialState: [] = [];

type ActionType =
  | { type: "UPDATE_PLAYERS"; payload: string | undefined }
  | {
      type: "UPDATE_NAME";
      payload: {
        playerId: number;
        playerName: string;
      };
    };

function playersBetsReducer(state: Player[], action: ActionType) {
  switch (action.type) {
    // create an empty array and fill with default player ids based on total number of players
    case "UPDATE_PLAYERS":
      if (action.payload) {
        let filledArray = [];
        for (let i = 0; i < +action.payload; i++) {
          filledArray.push({
            id: i + 1,
            name: `Player ${i + 1}`,
            suit: [
              {
                type: null,
                bets: null,
              },
            ],
          });
        }
        return filledArray;
      } else return [];

    case "UPDATE_NAME":
      const newState: Player[] = [...state];
      const player = newState.find(
        (player) => player.id === action.payload.playerId
      );
      if (player) {
        player.name = action.payload.playerName;
      } else console.error(`Player with ${action.payload.playerId} not found`);

      return newState;
  }
}

export default playersBetsReducer;
