import { useLocalStorage } from "@rehooks/local-storage";

import { Token } from "types";

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

  const logout = () => {
    removeCurrentUser();
  };

  const authHeader = currentUser?.accessToken
    ? { Authorization: "Bearer " + currentUser.accessToken }
    : {};

  return { currentUser, login, logout, authHeader };
};
