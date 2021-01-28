import { useCurrentUser } from "hooks/useCurrentUser";
import { useUrlQuery } from "hooks/useUrlQuery";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const history = useHistory();
  const { token } = useUrlQuery() as { token: string };
  const { login } = useCurrentUser();

  useEffect(() => {
    if (!token) {
      toast.error("Login failed!");
      history.push("/");
    } else {
      login(token);
      toast.success("Successfully logged in!");
      history.push("/");
    }
  }, [token, login, history]);

  return <></>;
};

export default Login;
