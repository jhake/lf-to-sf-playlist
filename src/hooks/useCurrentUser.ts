import axios from "axios";

import { useLocalStorage } from "@rehooks/local-storage";

import { Token } from "types";

const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "/auth/spotify";

export const useCurrentUser = () => {
  const [
    currentUser,
    setCurrentUser,
    removeCurrentUser,
  ] = useLocalStorage<Token>("user");

  const login = (jwt: string) => {
    console.log(jwt);
    setCurrentUser({ name: "test", accessToken: "TEST TOKEN" });
  };

  const test = () => {
    setCurrentUser({ name: "test", accessToken: "TEST TOKEN" });
  };

  const logout = () => {
    removeCurrentUser();
  };

  const authHeader = currentUser?.accessToken
    ? { Authorization: "Bearer " + currentUser.accessToken }
    : {};

  return { currentUser, login, logout, authHeader, test };
};
