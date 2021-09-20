import React, { useState, useReducer, Reducer } from "react";
import { Action, ActionType } from "./actions";

export type AuthState = {
  user: string;
  token: string;
  loading: boolean;
  errorMessage?: any;
};

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).auth_token
  : "";

export const initialState: AuthState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: undefined,
};

export const AuthReducer = (
  initialState: AuthState,
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionType.REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true,
      };
    case ActionType.LOGIN_SUCCESS:
      if (!action.payload) throw new Error("No payload found");
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    case ActionType.LOGOUT:
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case ActionType.LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
