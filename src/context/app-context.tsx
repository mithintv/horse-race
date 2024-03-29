import { useState, useReducer, createContext } from "react";
// custom types
import type { AppProps, EmptyInput, ContextInt } from "../models/types";
// custom functions and components
import playersBetsReducer from "./playersBetsReducer";
import gameStateReducer, { initialGameState } from "./gameStateReducer";
import modeReducer, { initialModeState } from "./modeReducer";
import deckReducer from "./deckReducer";
import { fullDeck, shuffleDeck } from "../models/deck";

const AppContext = createContext<ContextInt>({
  mode: {
    parameters: true,
    game: false,
    summary: false,
  },
  game: {
    rows: null,
    winner: null,
  },
  deck: {
    order: [],
    rungs: [],
  },
  players: [],

  addRow: (enteredRows) => {},
  addPlayer: (enteredPlayers) => {},
  addName: (playerId, playerName) => {},
  addSuit: (playerId, playerSuit) => {},
  addBet: (playerId, playerBet) => {},
  setWinner: (winningSuit) => {},
  setMode: (ModeActionType) => {},
  setDeck: (deckActionType) => {},
});

export default AppContext;

export const AppProvider = (props: AppProps) => {
  // state for selecting total number of rows and resulting rows in-game, total number of players and resulting player object for names and bets, and for displaying game or form
  const [totalRows, setTotalRows] = useState<EmptyInput>(null);
  const [modeState, dispatchMode] = useReducer(modeReducer, initialModeState);
  const [playersBets, dispatchPlayersBets] = useReducer(playersBetsReducer, []);
  const [gameState, dispatchGameState] = useReducer(
    gameStateReducer,
    initialGameState
  );
  const [deckState, dispatchDeck] = useReducer(
    deckReducer,
    shuffleDeck(fullDeck)
  );

  // store number of rows in context api
  const addRowHandler: ContextInt["addRow"] = (enteredRows) => {
    if (enteredRows) {
      setTotalRows(enteredRows);
    } else {
      setTotalRows(null);
    }
  };

  // add player function that points to reducer logic
  const addPlayerHandler: ContextInt["addPlayer"] = (enteredPlayers) => {
    dispatchPlayersBets({
      type: "UPDATE_PLAYERS",
      payload: enteredPlayers,
    });
  };

  // add name function that points to reducer logic
  const addNameHandler: ContextInt["addName"] = (playerId, playerName) => {
    dispatchPlayersBets({
      type: "UPDATE_NAME",
      payload: {
        playerId: playerId,
        playerName: playerName,
      },
    });
  };

  // add suit function that points to reducer logic
  const addSuitHandler: ContextInt["addSuit"] = (playerId, playerSuit) => {
    dispatchPlayersBets({
      type: "UPDATE_SUIT",
      payload: {
        playerId: playerId,
        suit: playerSuit.type,
        checked: playerSuit.checked,
      },
    });
  };

  // add bet function that points to reducer logic
  const addBetHandler: ContextInt["addBet"] = (playerId, playerBet) => {
    dispatchPlayersBets({
      type: "UPDATE_BETS",
      payload: {
        playerId: playerId,
        suit: playerBet.type,
        bets: playerBet.bets,
      },
    });
  };

  const setWinnerHandler: ContextInt["setWinner"] = (winningSuit) => {
    dispatchGameState({
      type: "SET_WINNER",
      payload: {
        winner: winningSuit,
      },
    });
  };

  const modeHandler: ContextInt["setMode"] = (type) => {
    if (type === "RESET_GAME") {
      dispatchGameState({ type: "NEW_GAME" });
      dispatchDeck({ type: "SHUFFLE" });
      dispatchPlayersBets({ type: "CLEAR" });
    }
    dispatchMode({ type: type });
  };

  const deckHandler: ContextInt["setDeck"] = (type) => {
    dispatchDeck({ type });
  };

  return (
    <AppContext.Provider
      value={{
        mode: modeState,
        game: gameState,
        deck: deckState,
        players: playersBets,

        addRow: addRowHandler,
        addPlayer: addPlayerHandler,
        addName: addNameHandler,
        addSuit: addSuitHandler,
        addBet: addBetHandler,

        setWinner: setWinnerHandler,
        setMode: modeHandler,
        setDeck: deckHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
