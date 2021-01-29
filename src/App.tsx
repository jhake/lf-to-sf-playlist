import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCurrentUser } from "hooks/useCurrentUser";

import Navbar from "components/Navbar";
import Login from "pages/Login";
import SpotifyStats from "pages/SpotifyStats";

if (!process.env.REACT_APP_BACKEND_API_URL) {
  throw new Error("REACT_APP_BACKEND_API_URL not defined.");
}

const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "auth/spotify";

function App() {
  const { currentUser, logout, authHeader } = useCurrentUser();
  return (
    <>
      <Router>
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
              <Navbar />
              <Route exact path="/" component={() => <h1>HOMEPAGE</h1>} />
              <Route exact path="/spotify-stats" component={SpotifyStats} />
            </>
          )}
        </Switch>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
