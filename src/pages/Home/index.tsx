import axios from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useState, useEffect } from "react";

const Home = () => {
  const { logout, authHeader } = useCurrentUser();

  const [userInfo, setUserInfo] = useState<any>();

  const API_USER_INFO_URL =
    process.env.REACT_APP_BACKEND_API_URL + "get_user_info";

  useEffect(() => {
    (async () => {
      try {
        const axiosResult = await axios.get(API_USER_INFO_URL, {
          timeout: 2000,
          headers: authHeader,
        });
        setUserInfo(axiosResult.data);
        console.log(axiosResult.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Please login again");
          logout();
        } else toast.error(error.message);
      }
    })();
  }, []);

  return <>{<h1>Hi {userInfo?.name}</h1>}</>;
};

export default Home;
