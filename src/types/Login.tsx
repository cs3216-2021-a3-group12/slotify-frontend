export const USERNAME = "username";
export const EMAIL = "email";
export const TOKENS = "tokens";
export const ACCESS = "access";
export const REFRESH = "refresh";

export type LoginData = {
  [USERNAME]: string;
  [EMAIL]: string;
  [TOKENS]: {
    [ACCESS]: string;
    [REFRESH]: string;
  };
};
