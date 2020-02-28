import React, { Fragment, useEffect } from "react";
import AuthState from "./context/auth/AuthState";
import LeagueState from "./context/leagues/LeagueState";
import Navbar from "./components/layout/Navbar";
import setAuthToken from "./utils/setAuthToken";

import UserList from "./components/users/UserList";
import LeagueList from "./components/leagues/LeageList";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // Initialise Materialize JS
    M.AutoInit();
  });

  return (
    <AuthState>
      <LeagueState>
        <Fragment>
          <Navbar />
          <div className="container">
            <UserList />
          </div>
          <div className="container">
            <LeagueList />
          </div>
        </Fragment>
      </LeagueState>
    </AuthState>
  );
};

export default App;
