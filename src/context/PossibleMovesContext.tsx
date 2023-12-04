import React from "react";
import { createContext, useReducer } from "react";

export const PossibleMovesContextObject = createContext([]);

const PossibleMovesContextProvider = ({ children }: any) => {
  function dataReducer(state: any, action: any) {
    switch (action.type) {
      case "SET_POSSIBLE_MOVES":
        return [...action.payload];

      case "RESET_POSSIBLE_MOVES":
        return [];

      default:
        return state;
    }
  }
  const [possibleMoves, dispatchPossibleMoves] = useReducer(dataReducer, []);

  return (
    <PossibleMovesContextObject.Provider
      value={{ possibleMoves, dispatchPossibleMoves }}
    >
      {children}
    </PossibleMovesContextObject.Provider>
  );
};

export default PossibleMovesContextProvider;
