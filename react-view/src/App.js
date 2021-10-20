import logo from './logo.svg';
import './App.css';
import React from 'react';
import './App.css';
import Main from "./Main.js";
import {Link, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>Cloud Vault</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/usersignin"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/usersignup"}>SignUp</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Main/>
      </div>
    </BrowserRouter>
  );
}

export default App;
