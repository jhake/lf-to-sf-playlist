import { useCurrentUser } from "hooks/useCurrentUser";
import { useUrlQuery } from "hooks/useUrlQuery";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const { jwt } = useUrlQuery() as { jwt: string };
  const { login } = useCurrentUser();

  useEffect(() => {
    if (!jwt) {
      history.push("/");
      return;
    }
    login(jwt);
    history.push("/");
  }, [jwt, login, history]);

  return <></>;
};

export default Login;
