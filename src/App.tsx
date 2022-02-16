import React from "react";
import logo from "./logo.svg";

const DEFAULT_BACKEND_URL = process.env.REACT_APP_DEFAULT_BACKEND_URL;

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            IPFS Check
          </a>
          <a
            href="#"
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </div>
      <div className="main">
        <div className="columns">
          <div className="column is-on-third">Do something</div>
          <div className="column">
            Do something
            {DEFAULT_BACKEND_URL}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
