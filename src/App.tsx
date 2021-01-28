import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useCurrentUser } from "hooks/useCurrentUser";

import Login from "./pages/Login";

if (!process.env.REACT_APP_BACKEND_API_URL) {
  throw new Error("REACT_APP_BACKEND_API_URL not defined.");
}

const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "auth/spotify";

function App() {
  const { currentUser, logout } = useCurrentUser();
  return (
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
            <button onClick={logout}>LOGOUT</button>
            <Route exact path="/" component={() => <h1>HOMEPAGE</h1>} />
            <Route exact path="/login" component={Login} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
