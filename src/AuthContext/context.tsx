import React, { ReactChildren, useReducer } from "react";
import { initialState, AuthReducer, AuthState } from "./reducer";
import { Action } from "./actions";

const AuthStateContext = React.createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }: { children: ReactChildren }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
