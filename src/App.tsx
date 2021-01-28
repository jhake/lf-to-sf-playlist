import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCurrentUser } from "hooks/useCurrentUser";

import Login from "./pages/Login";
import axios from "axios";

if (!process.env.REACT_APP_BACKEND_API_URL) {
  throw new Error("REACT_APP_BACKEND_API_URL not defined.");
}

const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "auth/spotify";

function App() {
  const { currentUser, logout, authHeader } = useCurrentUser();
  return (
    <>
      <Router>
        <button
          onClick={async () => {
            let axiosResult = await axios.post(
              process.env.REACT_APP_BACKEND_API_URL + "top_tracks",
              {
                headers: authHeader,
              }
            );
            console.log(axiosResult);
          }}
        >
          TEST
        </button>
        <Switch>
          {!currentUser ? (
            <>
              <Route
                exact
                path="/"
                component={() => <a href={API_LOGIN_URL}>Login with Spotify</a>}
              />
              <Route exact path="/login" component={Login} />
              <Redirect to="/" />
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  logout();
                  toast.success("Logged out!");
                }}
              >
                LOGOUT
              </button>
              <Route exact path="/" component={() => <h1>HOMEPAGE</h1>} />
            </>
          )}
        </Switch>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
