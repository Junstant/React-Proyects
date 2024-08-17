import React, { useEffect } from "react";
import "./header.css";
import "../login-register/login-register.jsx";
import {Link} from "react-router-dom";
import { useGlobalContext } from "../../Context";
import { MagnifyingGlass, ShoppingCart, List, XCircle } from "@phosphor-icons/react";

const Header = () => {
    // call the functions from the context
    const {actualUser, logOut} = useGlobalContext();
    // close or open the menu
    function handleMenu(){
        const plegableMenu = document.querySelector(".plegableMenu");
        plegableMenu.classList.toggle("activePlegable");
    }
    //close the menu when click in a link
    useEffect(() => {
        const links = document.querySelectorAll(".plegableMenu a li");
        links.forEach(link => {
            link.addEventListener("click", () => {
                const plegableMenu = document.querySelector(".plegableMenu");
                plegableMenu.classList.remove("activePlegable");
            });
        });
    }, []);

    return (
        <header className="header">
        <Link to={"/"}><img src="/rsc.svg" className="icon"></img></Link>
        {/* search bar */}
        <div className="leftContainerH">
            <div className="searchCon">
                <MagnifyingGlass className="searchIcon"></MagnifyingGlass>
                <input type="text" placeholder="Search palettes by tags..." className="searchHeader"></input>
            </div>
        </div>
        <menu>
            <div className="menuPc">
                <li><Link to={"/"}>Palettes</Link></li>
                {actualUser.isAdmin ? <li><Link to="/admin">Create</Link></li> : null}
                {actualUser.isLogged ? <li onClick={() => logOut()}><a>Log out</a></li> : <li><Link to="/login-register">Login</Link></li>}
                <li><Link to="/cart"><ShoppingCart className="iconStyleTwo"></ShoppingCart></Link></li>
            </div>
            <div className="menuMobile">
                <List onClick={() => handleMenu()} className="iconStyleOne"></List>
                <ul className="plegableMenu">
                <Link to={"/"}><li>Palettes</li></Link>
                    {actualUser.isAdmin ? <Link to="/admin"><li>Create</li> </Link>: null}
                    {actualUser.isLogged ? <li onClick={() => logOut()}><a>Log out</a></li> : <Link to="/login-register"><li>Login</li></Link>}
                    <Link to="/cart"><li>Cart</li></Link>
                    <XCircle weight="fill" onClick={() => handleMenu()} className="iconStyleOne closeMenuH"></XCircle>
                </ul>
            </div>
        </menu>
        </header>
    );
}
export default Header;