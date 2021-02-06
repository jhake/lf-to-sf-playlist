import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCurrentUser } from "hooks/useCurrentUser";

import Navbar from "components/Navbar";
import Login from "pages/Login";
import SpotifyStats from "pages/SpotifyStats";
import LastfmStats from "pages/LastfmStats";

if (!process.env.REACT_APP_BACKEND_API_URL) {
  throw new Error("REACT_APP_BACKEND_API_URL not defined.");
}

const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "auth/spotify";

function App() {
  const { currentUser } = useCurrentUser();
  return (
    <>
      <Router>
        <AppContainer>
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
              <Main>
                <Switch>
                  <>
                    <Route exact path="/" component={() => <h1>HOMEPAGE</h1>} />
                    <Route
                      exact
                      path="/spotify-stats"
                      component={SpotifyStats}
                    />
                    <Route exact path="/lastfm-stats" component={LastfmStats} />
                  </>
                </Switch>
              </Main>
            </>
          )}
          <ToastContainer position="bottom-center" hideProgressBar />
        </AppContainer>
      </Router>
    </>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const Main = styled.div`
  width: calc(100vw - 240px);
  position: relative;
  right: 0;
  padding: 32px;
  background: #141414;

  overflow: auto;

  & .loader {
    width: 100%;
    height: 100px;
  }

  h2 {
    width: 100%;
    font-size: 32px;
    font-weight: 800;
  }
`;

export default App;
