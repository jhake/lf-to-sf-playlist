import { useCookies } from "react-cookie";

const cookieName = "token";

export const useCurrentUser = () => {
  const [cookies, , removeCookie] = useCookies([cookieName]);

  const currentUser = cookies[cookieName];

  const logout = () => {
    removeCookie(cookieName);
  };

  return { currentUser, logout };
};
