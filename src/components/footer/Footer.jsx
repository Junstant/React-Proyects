import React from "react";
import "./footer.css";
import {HeartStraight} from "@phosphor-icons/react";

const Footer = () => {
    return (
        <footer className="footer">
            <p>Made with Love <HeartStraight/> </p>
            <p>© 2021 - All rights reserved</p>
        </footer>
    );
}

export default Footer;