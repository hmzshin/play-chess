import React, { createContext, ReactNode, useReducer } from "react";

type InitialData = number[];

type ActionType = "SET_POSSIBLE_MOVES" | "RESET_POSSIBLE_MOVES";

interface Action {
  type: ActionType;
  payload?: number[];
}

interface PossibleMovesContextType {
  possibleMoves: number[];
  dispatchPossibleMoves: React.Dispatch<Action>;
}

const initialData: InitialData = [];

export const PossibleMovesContextObject =
  createContext<PossibleMovesContextType>({
    possibleMoves: initialData,
    dispatchPossibleMoves: () => {},
  });
interface PossibleMovesContextProviderProps {
  children: ReactNode;
}

const PossibleMovesContextProvider: React.FC<
  PossibleMovesContextProviderProps
> = ({ children }) => {
  const dataReducer = (state: InitialData, action: Action): InitialData => {
    switch (action.type) {
      case "SET_POSSIBLE_MOVES":
        return action.payload || [];
      case "RESET_POSSIBLE_MOVES":
        return [];
      default:
        return state;
    }
  };

  const [possibleMoves, dispatchPossibleMoves] = useReducer(
    dataReducer,
    initialData
  );

  const contextValue: PossibleMovesContextType = {
    possibleMoves,
    dispatchPossibleMoves,
  };

  return (
    <PossibleMovesContextObject.Provider value={contextValue}>
      {children}
    </PossibleMovesContextObject.Provider>
  );
};

export default PossibleMovesContextProvider;
