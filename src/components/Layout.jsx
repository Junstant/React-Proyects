import React from "react";
import Footer from "./footer/Footer.jsx";
import Header from "./header/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./login-register/login-register.jsx";
import Chat from './liveChat/Chat.jsx';
import "./layout.css";
import AdminPanel from "./adminPanel/AdminPanel.jsx";

const Layout = (pepito) => {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/login-register" element={<LoginRegister />} />
            <Route path="/" element={<main className="main">{pepito.children}</main>}/>
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <Chat />
        <Footer />
      </Router>
    </>
  );
};

export default Layout;
