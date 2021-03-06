import { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "./useCurrentUser";
import { toast } from "react-toastify";

export const useAxiosGet = <T>(url: string, timeout: number = 10000) => {
  const { logout, authHeader } = useCurrentUser();
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let axiosResult = await axios.get(url, {
          headers: authHeader,
          timeout: timeout,
        });
        setData(axiosResult.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Please login again");
          logout();
        } else {
          setError(error);
          setLoading(false);
        }
      }
    })();
    // eslint-disable-next-line
  }, [url]);

  return { data, loading, error };
};
