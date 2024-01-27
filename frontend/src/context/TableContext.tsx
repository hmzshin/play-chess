import React, { createContext, ReactNode, useReducer } from "react";
import { initialTable } from "../data";

type Table = Record<number, string>;

type InitialData = Table;

type ActionType = "SET_TABLE";

interface Action {
  type: ActionType;
  payload: Table;
}

interface TableContextType {
  table: Table;
  dispatchTable: React.Dispatch<Action>;
}

const initialData: InitialData = initialTable;

export const TableContextObject = createContext<TableContextType>({
  table: initialData,
  dispatchTable: () => {},
});
interface TableContextProviderProps {
  children: ReactNode;
}

const TableContextProvider: React.FC<TableContextProviderProps> = ({
  children,
}) => {
  const dataReducer = (state: InitialData, action: Action): InitialData => {
    switch (action.type) {
      case "SET_TABLE":
        return action.payload;

      default:
        return state;
    }
  };

  const [table, dispatchTable] = useReducer(dataReducer, initialData);

  const contextValue: TableContextType = {
    table,
    dispatchTable,
  };

  return (
    <TableContextObject.Provider value={contextValue}>
      {children}
    </TableContextObject.Provider>
  );
};

export default TableContextProvider;
