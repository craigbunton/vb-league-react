import React, { Fragment, useEffect } from "react";
import UserState from "./context/users/UserState";
import Navbar from "./components/layout/Navbar";

import UserList from "./components/users/UserList";

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
      <Fragment>
        <Navbar />
        <div className="container">
          <UserList />
        </div>
      </Fragment>
    </UserState>
  );
};

export default App;
