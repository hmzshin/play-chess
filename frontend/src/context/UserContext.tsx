import React, { createContext, ReactNode, useReducer } from "react";

type InitialData = {
  username: string;
  room: string;
  piece: string;
  isMyTurn: boolean;
  isMoved: boolean;
  isConnected: boolean;
};

type ActionType =
  | "SET_USERNAME"
  | "SET_ROOM"
  | "SET_PIECE"
  | "SET_ISMYTURN"
  | "SET_ISMOVED"
  | "SET_ISCONNECTED";

interface Action {
  type: ActionType;
  payload: string | boolean;
}

interface UserContextType {
  user: InitialData;
  dispatchUser: React.Dispatch<Action>;
}

const initialData: InitialData = {
  username: "",
  room: "",
  piece: "",
  isMyTurn: false,
  isMoved: false,
  isConnected: false,
};

export const UserContextObject = createContext<UserContextType>({
  user: initialData,
  dispatchUser: () => {},
});
interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const dataReducer = (state: InitialData, action: Action): InitialData => {
    switch (action.type) {
      case "SET_USERNAME":
        return { ...state, username: action.payload as string };
      case "SET_ROOM":
        return { ...state, room: action.payload as string };

      case "SET_ISMOVED":
        return { ...state, isMoved: action.payload as boolean };

      case "SET_ISMYTURN":
        return { ...state, isMyTurn: action.payload as boolean };

      case "SET_PIECE":
        return { ...state, piece: action.payload as string };
      case "SET_ISCONNECTED":
        return { ...state, isConnected: action.payload as boolean };
      default:
        return state;
    }
  };

  const [user, dispatchUser] = useReducer(dataReducer, initialData);

  const contextValue: UserContextType = {
    user,
    dispatchUser,
  };

  return (
    <UserContextObject.Provider value={contextValue}>
      {children}
    </UserContextObject.Provider>
  );
};

export default UserContextProvider;
