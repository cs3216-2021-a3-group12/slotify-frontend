import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { ACCESS, REFRESH } from "../types/Login";

export const axios_default = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export const axios_with_token_refresh = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

const refreshAuthLogic = (failedRequest: any) =>
  axios
    .post("/auth/token-refresh", {
      refresh: localStorage.getItem(REFRESH),
    })
    .then((tokenRefreshResponse) => {
      const updatedAccessToken = tokenRefreshResponse.data[ACCESS];
      localStorage.setItem(ACCESS, updatedAccessToken);
      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${updatedAccessToken}`;
      return Promise.resolve();
    });

// Instantiate the interceptor
createAuthRefreshInterceptor(axios_with_token_refresh, refreshAuthLogic);
