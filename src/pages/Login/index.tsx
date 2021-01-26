import { useCurrentUser } from "hooks/useCurrentUser";

const Login = () => {
  const { currentUser, login, test } = useCurrentUser();

  const handleLogin = async () => {
    try {
      test();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Login">
      {currentUser}
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
