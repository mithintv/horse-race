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
// | {
//     type: "UPDATE_BETS";
//     payload: {
//       playerId: number;
//       suit: "Hearts" | "Spades" | "Diamonds" | "Clubs" | null;
//       bet: string;
//     };
//   };

function playersBetsReducer(state: Player[], action: ActionType) {
  switch (action.type) {
    case "UPDATE_PLAYERS":
      // create an empty array and fill with default player ids based on total number of players
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
      let newState: Player[] = [...state];
      let player = newState.find(
        (player) => player.id === action.payload.playerId
      );
      if (player) {
        player.name = action.payload.playerName;
      } else console.error(`Player with ${action.payload.playerId} not found`);
      return newState;

    // case "UPDATE_BETS":
    //   newState = [...state];
    //   player = newState.find((player) => player.id === action.payload.playerId);
    //   if (player) {
    //     const suitIndex = player.suits.find(
    //       (suit) => suit.type === action.payload.suit
    //     );
    //     if (suitIndex) suitIndex.bets = action.payload.bet;
    //     else
    //       player.suits.push({
    //         type: action.payload.suit,
    //         bets: action.payload.bet,
    //       });
    //   }
    //   return newState;

    default:
      return state;
  }
}

export default playersBetsReducer;
