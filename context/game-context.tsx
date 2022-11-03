import React, { useState, createContext } from "react";

export declare interface AppProps {
  children?: React.ReactNode;
}

interface GameContextInt {
  rows: string | undefined;
  addRows: (enteredRows: GameContextInt["rows"]) => void;
  playerForm: string[] | null;
  addPlayerForm: (enteredPlayers: string | undefined) => void;
  addBet: (playerId: number, playerBet: {}) => void;
  players: {}[];
  displayForm: boolean;
  setMode: () => void;
}

const GameContext = createContext<GameContextInt | null>(null);

export const GameProvider = (props: AppProps) => {
  // state for selecting total number of rows and resulting rows in-game
  const [totalRows, setTotalRows] = useState<GameContextInt["rows"]>(undefined);
  // state for selecting total number of players and resulting player form
  const [playerFormState, setPlayerFormState] =
    useState<GameContextInt["playerForm"]>(null);
  // state for filled player bets
  const [playersBetsState, setPlayersBetsState] = useState<
    GameContextInt["players"]
  >([]);
  // state for displaying game parameter form
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

  // create an empty array and fill with default player ids based on total number of players
  const addPlayerFormHandler = (enteredPlayers: string | undefined) => {
    if (enteredPlayers) {
      let filledArray = [];
      for (let i = 0; i < +enteredPlayers; i++) {
        filledArray.push(`Player ${i + 1}`);
      }
      setPlayerFormState(filledArray);
      setPlayersBetsState(filledArray);
    } else {
      setPlayerFormState(null);
    }
  };

  // add or update bets function for individual players executed on Player.tsx component
  const addBetHandler = (playerId: number, playerBet: {}) => {
    setPlayersBetsState((prevState) => {
      const filledBets: {}[] = [...prevState];
      filledBets[+playerId] = playerBet;
      return filledBets;
    });
  };

  const modeHandler = () => {
    setDisplayForm(false);
  };

  return (
    <GameContext.Provider
      value={{
        rows: totalRows,
        addRows: addRowsHandler,
        playerForm: playerFormState,
        addPlayerForm: addPlayerFormHandler,
        addBet: addBetHandler,
        players: playersBetsState,
        displayForm: displayForm,
        setMode: modeHandler,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
