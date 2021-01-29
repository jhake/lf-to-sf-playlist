import { useLocalStorage } from "@rehooks/local-storage";

import { Token } from "types";

export const useCurrentUser = () => {
  const [
    currentUser,
    setCurrentUser,
    removeCurrentUser,
  ] = useLocalStorage<Token>("user");

  const login = (token: string) => {
    setCurrentUser({ accessToken: token });
  };

  const logout = () => {
    removeCurrentUser();
  };

  const authHeader = currentUser?.accessToken
    ? { Authorization: "Bearer " + currentUser.accessToken }
    : {};

  return { currentUser, login, logout, authHeader };
};
