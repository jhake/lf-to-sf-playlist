import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCurrentUser } from "hooks/useCurrentUser";

import Navbar from "components/Navbar";
import SpotifyStats from "pages/SpotifyStats";
import LastfmStats from "pages/LastfmStats";
import { useEffect } from "react";

if (!process.env.REACT_APP_BACKEND_API_URL) {
  throw new Error("REACT_APP_BACKEND_API_URL not defined.");
}

const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "auth/spotify";

function App() {
  const { currentUser } = useCurrentUser();
  useEffect(() => {
    if (currentUser) toast.success("Successfully logged in!");
  }, [currentUser]);
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
              <Redirect to="/" />
            </>
          ) : (
            <>
              <Navbar />
              <Route exact path="/" component={() => <h1>HOMEPAGE</h1>} />
              <Route exact path="/spotify-stats" component={SpotifyStats} />
              <Route exact path="/lastfm-stats" component={LastfmStats} />
            </>
          )}
        </Switch>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
