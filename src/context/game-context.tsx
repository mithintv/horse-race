import React, { useState, useReducer, createContext } from "react";
// custom types
import type { AppProps, EmptyInput, GameContextInt } from "../models/types";
import modeReducer, { initialModeState } from "./modeReducer";
// custom functions and components
import playersBetsReducer from "./playersBetsReducer";

const GameContext = createContext<GameContextInt | null>({
  mode: {
    parameters: true,
    game: false,
    summary: false,
  },
  rows: undefined,
  players: [],

  addRow: (enteredRows) => {},
  addPlayer: (enteredPlayers) => {},
  addName: (playerId, playerName) => {},
  addSuit: (playerId, playerSuit) => {},
  addBet: (playerId, playerBet) => {},
  setMode: (ModeActionType) => {},
});

export default GameContext;

export const GameProvider = (props: AppProps) => {
  // state for selecting total number of rows and resulting rows in-game, total number of players and resulting player object for names and bets, and for displaying game or form
  const [totalRows, setTotalRows] = useState<EmptyInput>(undefined);
  const [mode, dispatchMode] = useReducer(modeReducer, initialModeState);
  const [playersBets, dispatchPlayersBets] = useReducer(playersBetsReducer, []);

  // store number of rows in context api
  const addRowHandler: GameContextInt["addRow"] = (enteredRows) => {
    if (enteredRows) {
      setTotalRows(enteredRows);
    } else {
      setTotalRows(undefined);
    }
  };

  // add player function that points to reducer logic
  const addPlayerHandler: GameContextInt["addPlayer"] = (enteredPlayers) => {
    dispatchPlayersBets({
      type: "UPDATE_PLAYERS",
      payload: enteredPlayers,
    });
  };

  // add name function that points to reducer logic
  const addNameHandler: GameContextInt["addName"] = (playerId, playerName) => {
    dispatchPlayersBets({
      type: "UPDATE_NAME",
      payload: {
        playerId: playerId,
        playerName: playerName,
      },
    });
  };

  // add suit function that points to reducer logic
  const addSuitHandler: GameContextInt["addSuit"] = (playerId, playerSuit) => {
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
  const addBetHandler: GameContextInt["addBet"] = (playerId, playerBet) => {
    dispatchPlayersBets({
      type: "UPDATE_BETS",
      payload: {
        playerId: playerId,
        suit: playerBet.type,
        bets: playerBet.bets,
      },
    });
  };

  const modeHandler: GameContextInt["setMode"] = (type) => {
    dispatchMode({ type: type });
  };

  return (
    <GameContext.Provider
      value={{
        mode: mode,
        rows: totalRows,
        players: playersBets,

        addRow: addRowHandler,
        addPlayer: addPlayerHandler,
        addName: addNameHandler,
        addSuit: addSuitHandler,
        addBet: addBetHandler,
        setMode: modeHandler,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
