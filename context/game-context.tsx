import React, { useState, useReducer, createContext } from "react";
// custom types
import { AppProps, GameContextInt } from "../models/types";
// custom functions and components
import playersBetsReducer, { initialState } from "./playersBetsReducer";

const GameContext = createContext<GameContextInt | null>(null);

export const GameProvider = (props: AppProps) => {
  // state for selecting total number of rows and resulting rows in-game, total number of players and resulting player object for names and bets, and for displaying game or form
  const [totalRows, setTotalRows] = useState<GameContextInt["rows"]>(undefined);
  const [playersBets, dispatchPlayersBets] = useReducer(
    playersBetsReducer,
    initialState
  );
  const [displayForm, setDisplayForm] =
    useState<GameContextInt["displayForm"]>(true);

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

  // add bet function that points to reducer logic
  const addBetHandler: GameContextInt["addBet"] = (playerId, playerBet) => {
    // setPlayersBetsState((prevState) => {
    //   const filledBets: {}[] = [...prevState];
    //   filledBets[+playerId] = playerBet;
    //   return filledBets;
    // });
  };

  const modeHandler = () => {
    setDisplayForm(false);
  };

  return (
    <GameContext.Provider
      value={{
        rows: totalRows,
        players: playersBets,
        displayForm: displayForm,

        addRow: addRowHandler,
        addPlayer: addPlayerHandler,
        addName: addNameHandler,
        addBet: addBetHandler,
        setMode: modeHandler,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
