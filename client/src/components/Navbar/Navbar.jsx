import React from "react";
import "./Navbar.css";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="navbar navbar-light bg-primary-secondary vh-10 p-0 m-0 d-flex justify-content-around align-items-center">
      <div className="logo d-flex justify-content-center align-items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-100" />
        </Link>
      </div>
      <nav className="navbar navbar-expand-lg w-50">
        <ul className="navbar-nav d-flex justify-content-around align-items-center w-100">
          <li className="nav-item landing">
            <Link to="/" className="nav-link text-light">
              Beranda
            </Link>
          </li>
          <li className="nav-item landing">
            <Link to="/event" className="nav-link text-light">
              Event
            </Link>
          </li>
          <li className="nav-item landing">
            <Link to="/dokumen" className="nav-link text-light">
              Dokumen
            </Link>
          </li>
          <li className="nav-item landing">
            <Link to="/anggota" className="nav-link text-light">
              Anggota
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
