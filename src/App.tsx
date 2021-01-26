import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useCurrentUser } from "hooks/useCurrentUser";

import Login from "./pages/Login";

if (!process.env.REACT_APP_BACKEND_API_URL) {
  throw new Error("REACT_APP_BACKEND_API_URL not defined.");
}

function App() {
  const { currentUser, logout } = useCurrentUser();

  return (
    <>
      <button onClick={logout}>LOGOUT</button>
      {currentUser ? (
        <Router>
          <Switch>
            <Route exact path="/" component={() => <h1>HOMEPAGE</h1>} />
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
