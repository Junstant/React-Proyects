import React from "react";
import "./header.css";
import "../login-register/login-register.jsx";
import {Link} from "react-router-dom";
import { useGlobalContext } from "../../Context";

const Header = () => {
    const {actualUser, logOut} = useGlobalContext();
    return (
        <header className="header">
        <h1>Your logo</h1>
        <menu className="menu">
            <li><Link to={"/"}>Home</Link></li>
            {actualUser.isLogged ? <li><span onClick={() => logOut()}>Log out</span></li> : <li><Link to="/login-register">Login</Link></li>}
            {actualUser.isAdmin ? <li><Link to="/admin">Admin</Link></li> : null}
            <li>Contact</li>
        
        </menu>
        </header>
    );
}

export default Header;