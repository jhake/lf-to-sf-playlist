import { useCurrentUser } from "hooks/useCurrentUser";
import { useUrlQuery } from "hooks/useUrlQuery";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const history = useHistory();
  const { jwt } = useUrlQuery() as { jwt: string };
  const { login } = useCurrentUser();

  useEffect(() => {
    if (!jwt) {
      toast.error("Login failed!");
      history.push("/");
    } else {
      login(jwt);
      toast.success("Successfully logged in!");
      history.push("/");
    }
  }, [jwt, login, history]);

  return <></>;
};

export default Login;
