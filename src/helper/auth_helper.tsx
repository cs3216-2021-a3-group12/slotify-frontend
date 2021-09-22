import { ACCESS, LoginData, REFRESH, TOKENS, USERNAME } from "../types/Login";

export function storeUserData(loginData: LoginData) {
  localStorage.setItem(ACCESS, loginData[TOKENS][ACCESS]);
  localStorage.setItem(REFRESH, loginData[TOKENS][REFRESH]);
  localStorage.setItem(USERNAME, loginData[USERNAME]);
}
