import React from "react";
import "./header.css";
import "../login-register/login-register.jsx";
import {Link} from "react-router-dom";
import { useGlobalContext } from "../../Context";
import {Palette} from "@phosphor-icons/react";

const Header = () => {
    const {actualUser, logOut} = useGlobalContext();
    return (
        <header className="header">
        <Link to={"/"}><img src="/rsc.svg" className="icon"></img></Link>
        <menu className="menu">
            <li><Link to={"/"}>Palettes</Link></li>
            {actualUser.isAdmin ? <li><Link to="/admin">Create</Link></li> : null}
            {actualUser.isLogged ? <li onClick={() => logOut()}><a>Log out</a></li> : <li><Link to="/login-register">Login</Link></li>}
        
        </menu>
        </header>
    );
}

export default Header;