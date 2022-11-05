import { EmptyInput, Player } from "../models/types";

export const initialState: [] = [];

type ActionType =
  | { type: "UPDATE_PLAYERS"; payload: EmptyInput }
  | {
      type: "UPDATE_NAME";
      payload: {
        playerId: Player["id"];
        playerName: Player["name"];
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
        const filledArray: Player[] = [];
        for (let i = 0; i < +action.payload; i++) {
          filledArray.push({
            id: i + 1,
            name: `Player ${i + 1}`,
            suits: [
              {
                type: "Hearts",
                bets: undefined,
              },
              {
                type: "Spades",
                bets: undefined,
              },
              {
                type: "Diamonds",
                bets: undefined,
              },
              {
                type: "Clubs",
                bets: undefined,
              },
            ],
          });
        }
        return filledArray;
      } else return state;

    case "UPDATE_NAME":
      const newState: Player[] = [...state];
      const player = newState.find(
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
  }
}

export default playersBetsReducer;
