import React, { Fragment } from "react";
import PlayerState from "./context/player/PlayerState";
import Navbar from "./components/layout/Navbar";

import PlayerList from "./components/players/PlayerList";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";

const App = () => {
  return (
    <PlayerState>
      <Fragment>
        <Navbar />
        <div className="container">
          <PlayerList />
        </div>
      </Fragment>
    </PlayerState>
  );
};

export default App;
