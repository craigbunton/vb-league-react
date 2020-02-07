import React, { Fragment, useEffect } from "react";
import UserState from "./context/users/UserState";
import LeagueState from "./context/leagues/LeagueState";
import Navbar from "./components/layout/Navbar";

import UserList from "./components/users/UserList";
import LeagueList from "./components/leagues/LeageList";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";

const App = () => {
  useEffect(() => {
    // Initialise Materialize JS
    M.AutoInit();
  });

  return (
    <UserState>
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
    </UserState>
  );
};

export default App;
