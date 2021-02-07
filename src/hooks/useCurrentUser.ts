import { useLocalStorage } from "@rehooks/local-storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "types";
import axios from "axios";

export const useCurrentUser = () => {
  const [
    currentUser,
    setCurrentUser,
    removeCurrentUser,
  ] = useLocalStorage<User>("user");

  const API_USER_INFO_URL =
    process.env.REACT_APP_BACKEND_API_URL + "get_user_info";

  const login = (token: string) => {
    (async () => {
      try {
        const axiosResult = await axios.get(API_USER_INFO_URL, {
          timeout: 2000,
          headers: { Authorization: "Bearer " + token },
        });
        setCurrentUser({ accessToken: token, info: axiosResult.data });
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Please login again");
          logout();
        } else toast.error(error.message);
      }
    })();
  };

  const logout = () => {
    removeCurrentUser();
  };

  const authHeader = currentUser?.accessToken
    ? { Authorization: "Bearer " + currentUser.accessToken }
    : {};

  return { currentUser, login, logout, authHeader };
};
