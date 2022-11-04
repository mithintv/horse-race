import React, { useState, useReducer, createContext } from "react";
// custom types
import { AppProps, GameContextInt, Player } from "../models/types";
// custom functions and components
import playersBetsReducer, { initialState } from "./playersBetsReducer";

const GameContext = createContext<GameContextInt | null>(null);

export const GameProvider = (props: AppProps) => {
  // state for selecting total number of rows and resulting rows in-game, total number of players and resulting player form for names and bets, and for displaying game parameter form
  const [totalRows, setTotalRows] = useState<GameContextInt["rows"]>(undefined);
  const [playersBets, dispatchPlayersBets] = useReducer(
    playersBetsReducer,
    initialState
  );

  const [displayForm, setDisplayForm] =
    useState<GameContextInt["displayForm"]>(true);

  // store number of rows in context api
  const addRowsHandler = (enteredRows: string | undefined) => {
    if (enteredRows) {
      setTotalRows(enteredRows);
    } else {
      setTotalRows(undefined);
    }
  };

  const addPlayerFormHandler = (enteredPlayers: string | undefined) => {
    dispatchPlayersBets({
      type: "UPDATE_PLAYERS",
      payload: enteredPlayers,
    });
  };

  const addNameHandler = (playerId: number, playerName: string) => {
    dispatchPlayersBets({
      type: "UPDATE_NAME",
      payload: {
        playerId: playerId,
        playerName: playerName,
      },
    });
  };

  // add or update bets function for individual players executed on Player.tsx component
  const addBetHandler = (playerId: number, playerBet: {}) => {
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

        addRows: addRowsHandler,
        addPlayerForm: addPlayerFormHandler,
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
