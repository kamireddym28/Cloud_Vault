import logo from '../logo.svg';
import React, { Component } from 'react';
import {Container, Row, Col, Navbar} from 'react-bootstrap';
import {Link, BrowserRouter} from 'react-router-dom';



export class Header extends Component {
    render(){
        return (
                <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-info">
                <div className="container">
                    <Link className="navbar-brand text" to={"/"}>Cloud Vault</Link>
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
            )
    }
}   

export default Header;