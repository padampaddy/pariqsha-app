import {
  APPLICATION_ID,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  REFRESH_TOKEN_URL,
  SIGNUP_URL,
} from "../Constants";
import { SignupRequest } from "../types/User";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      loginId: email,
      password,
      applicationId: APPLICATION_ID,
    }),
  });
};

export const signup = (data: SignupRequest) => {
  return fetch(SIGNUP_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "seKKkbWSPZ2qtGWP6a2MWG-3WewgcdZeAZlBmInLexgTKFZPouYtZG6u",
    },
    body: JSON.stringify(data),
  });
};

export const refreshToken = async () => {
  const entities = localStorage.getItem("entities");
  if (!entities) {
    return Promise.reject();
  }
  const { token, refreshToken } = JSON.parse(entities);
  const res = await fetch(REFRESH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      token,
      refreshToken,
    }),
  });
  const data = await res.json();
  return data.token;
};

export const forgotPassword = (email: string) => {
  return fetch(FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ loginId: email }),
  });
};
