import { useState, createContext } from "react";

export declare interface Props {
  children?: React.ReactNode;
}

interface GameContextInt {
  playerForm: string[] | null;
  addPlayerForm: (enteredPlayers: string | undefined) => void;
  addBet: (playerId: number, playerBet: {}) => void;
  players: {}[];
}

const GameContext = createContext<GameContextInt | null>(null);

export const GameProvider = (props: Props) => {
  // ref and state for selecting total number of players
  const [playerFormState, setPlayerFormState] =
    useState<GameContextInt["playerForm"]>(null);

  const [playersBetsState, setPlayersBetsState] = useState<
    GameContextInt["players"]
  >([]);

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

  const addBetHandler = (playerId: number, playerBet: {}) => {
    setPlayersBetsState((prevState) => {
      console.log(playerId);
      const filledBets: {}[] = [...prevState];
      filledBets[+playerId] = playerBet;
      return filledBets;
    });
  };

  return (
    <GameContext.Provider
      value={{
        playerForm: playerFormState,
        addPlayerForm: addPlayerFormHandler,
        addBet: addBetHandler,
        players: playersBetsState,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
