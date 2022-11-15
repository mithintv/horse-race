import type {
  PlayerType,
  SuitSpecific,
  PlayersBetsActionType,
} from "../models/types";

export const playersBetsInitialState: PlayerType[] = [
  {
    id: 1,
    name: "Player 1",
    suits: {
      hearts: {
        type: "hearts",
        checked: true,
        wagers: ["1 shot"],
      },
      spades: {
        type: "spades",
        checked: false,
        wagers: [],
      },
      diamonds: {
        type: "diamonds",
        checked: false,
        wagers: [],
      },
      clubs: {
        type: "clubs",
        checked: false,
        wagers: [],
      },
    },
  },
  {
    id: 2,
    name: "Player 2",
    suits: {
      hearts: {
        type: "hearts",
        checked: false,
        wagers: [],
      },
      spades: {
        type: "spades",
        checked: true,
        wagers: ["1 shot"],
      },
      diamonds: {
        type: "diamonds",
        checked: false,
        wagers: [],
      },
      clubs: {
        type: "clubs",
        checked: false,
        wagers: [],
      },
    },
  },
  {
    id: 3,
    name: "Player 3",
    suits: {
      hearts: {
        type: "hearts",
        checked: false,
        wagers: [],
      },
      spades: {
        type: "spades",
        checked: false,
        wagers: [],
      },
      diamonds: {
        type: "diamonds",
        checked: true,
        wagers: ["1 shot"],
      },
      clubs: {
        type: "clubs",
        checked: false,
        wagers: [],
      },
    },
  },
  {
    id: 4,
    name: "Player 4",
    suits: {
      hearts: {
        type: "hearts",
        checked: false,
        wagers: [],
      },
      spades: {
        type: "spades",
        checked: false,
        wagers: [],
      },
      diamonds: {
        type: "diamonds",
        checked: false,
        wagers: [],
      },
      clubs: {
        type: "clubs",
        checked: true,
        wagers: ["1 shot"],
      },
    },
  },
  {
    id: 5,
    name: "Player 5",
    suits: {
      hearts: {
        type: "hearts",
        checked: true,
        wagers: ["1 shot"],
      },
      spades: {
        type: "spades",
        checked: true,
        wagers: ["1 shot"],
      },
      diamonds: {
        type: "diamonds",
        checked: false,
        wagers: [],
      },
      clubs: {
        type: "clubs",
        checked: false,
        wagers: [],
      },
    },
  },
  {
    id: 6,
    name: "Player 6",
    suits: {
      hearts: {
        type: "hearts",
        checked: false,
        wagers: [],
      },
      spades: {
        type: "spades",
        checked: false,
        wagers: [],
      },
      diamonds: {
        type: "diamonds",
        checked: true,
        wagers: ["1 shot"],
      },
      clubs: {
        type: "clubs",
        checked: true,
        wagers: ["1 shot"],
      },
    },
  },
];

export default function playersBetsReducer(
  state: PlayerType[],
  action: PlayersBetsActionType
) {
  let newState: PlayerType[],
    player: PlayerType | undefined,
    selectedSuit: SuitSpecific["type"];
  switch (action.type) {
    case "UPDATE_PLAYERS":
      // create an empty array and fill with default player ids based on total number of players
      if (action.payload) {
        const filledArray: PlayerType[] = [];
        for (let i = 0; i < +action.payload; i++) {
          filledArray.push({
            id: i + 1,
            name: `Player ${i + 1}`,
            suits: {
              hearts: {
                type: "hearts",
                checked: false,
                wagers: [],
              },
              spades: {
                type: "spades",
                checked: false,
                wagers: [],
              },
              diamonds: {
                type: "diamonds",
                checked: false,
                wagers: [],
              },
              clubs: {
                type: "clubs",
                checked: false,
                wagers: [],
              },
            },
          });
        }
        return filledArray;
      } else return [];

    case "UPDATE_NAME":
      newState = [...state];
      player = newState.find((player) => player.id === action.payload.playerId);
      player!.name = action.payload.playerName;
      return newState;

    case "UPDATE_SUIT":
      newState = [...state];
      player = newState.find((player) => player.id === action.payload.playerId);
      selectedSuit = action.payload.suit;
      player!.suits![selectedSuit]!.checked = action.payload.checked;
      if (!action.payload.checked) player!.suits![selectedSuit]!.wagers = [];
      return newState;

    case "ADD_WAGER":
      newState = [...state];
      player = newState.find((player) => player.id === action.payload.playerId);
      selectedSuit = action.payload.suit;
      player!.suits![selectedSuit]?.wagers.push(action.payload.wager);
      return newState;

    case "REMOVE_WAGER":
      newState = [...state];
      player = newState.find((player) => player.id === action.payload.playerId);
      selectedSuit = action.payload.suit;
      player!.suits![selectedSuit]!.wagers.splice(action.payload.wagerId, 1);
      return newState;
  }
}
