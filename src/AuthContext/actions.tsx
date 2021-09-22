const ROOT_URL = "https://api.slotify.club/api/v1";

export type Action = {
  type: ActionType;
  payload?: {
    email: string;
    username: string;
    tokens: {
      refresh: string;
      access: string;
    };
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
  console.log(requestOptions);

  try {
    dispatch({ type: ActionType.REQUEST_LOGIN });
    let data = await fetch(`${ROOT_URL}/auth/login/`, requestOptions)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        dispatch({ type: ActionType.LOGIN_ERROR, error: err });
      });

    if (data && data.username) {
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: ActionType.LOGIN_ERROR, error: data });
    return;
  } catch (error: any) {
    dispatch({ type: ActionType.LOGIN_ERROR, error: error });
    console.error(error);
  }
}

export async function logout(dispatch: React.Dispatch<Action>) {
  dispatch({ type: ActionType.LOGOUT });
  localStorage.removeItem("currentUser");
}
