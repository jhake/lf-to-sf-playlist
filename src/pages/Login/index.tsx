import { useCurrentUser } from "hooks/useCurrentUser";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();

  useEffect(() => {    
    if (!currentUser) {
      toast.error("Login failed!");
      history.push("/");
    } else {
      toast.success("Successfully logged in!");
      history.push("/");
    }
  }, []);

  return <></>;
};

export default Login;
