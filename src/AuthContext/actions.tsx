const ROOT_URL = "https://secret-hamlet-03431.herokuapp.com";

export type Action = {
  type: ActionType;
  payload?: {
    user: string;
    auth_token: string;
  };
  error?: any;
};

export enum ActionType {
  REQUEST_LOGIN = "REQUEST_LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGOUT = "LOGOUT",
  LOGIN_ERROR = "LOGIN_ERROR",
}

export async function loginUser(
  dispatch: React.Dispatch<Action>,
  loginPayload: Object
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: ActionType.REQUEST_LOGIN });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: ActionType.LOGIN_ERROR, error: data.errors[0] });
    console.log(data.errors[0]);
    return;
  } catch (error: any) {
    dispatch({ type: ActionType.LOGIN_ERROR, error: error });
    console.log(error);
  }
}

export async function logout(dispatch: React.Dispatch<Action>) {
  dispatch({ type: ActionType.LOGOUT });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
