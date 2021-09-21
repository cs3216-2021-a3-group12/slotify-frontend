import { Action, ActionType } from "./actions";

export type AuthState = {
  username: string;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  error?: any;
};

let username = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).username
  : "";
let accessToken = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).tokens.access
  : "";
let refreshToken = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).tokens.refresh
  : "";

export const initialState: AuthState = {
  username: "" || username,
  accessToken: "" || accessToken,
  refreshToken: "" || refreshToken,
  loading: false,
  error: undefined,
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
        username: action.payload.username,
        accessToken: action.payload.tokens.access,
        refreshToken: action.payload.tokens.refresh,
        loading: false,
      };
    case ActionType.LOGOUT:
      return {
        ...initialState,
        username: "",
        accessToken: "",
        refreshToken: "",
      };

    case ActionType.LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
