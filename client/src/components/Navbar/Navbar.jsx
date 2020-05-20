import React from "react";
import "./Navbar.css";
import Logo from "../../images/logo.png";

const Navbar = () => {
  return (
    <div class="navbar navbar-light bg-primary-secondary vh-10 p-0 m-0 d-flex justify-content-around align-items-center">
      <div className="logo d-flex justify-content-center align-items-center">
        <a href="!#">
          <img src={Logo} alt="Logo" className="w-100" />
        </a>
      </div>
      <nav className="navbar navbar-expand-lg w-50">
        <ul className="navbar-nav d-flex justify-content-around align-items-center w-100">
          <li className="nav-item landing">
            <a className="nav-link text-light" href="!#">
              Beranda
            </a>
          </li>
          <li className="nav-item landing">
            <a className="nav-link text-light" href="!#">
              Event
            </a>
          </li>
          <li className="nav-item landing">
            <a className="nav-link text-light" href="!#">
              Dokumen
            </a>
          </li>
          <li className="nav-item landing">
            <a className="nav-link text-light" href="!#">
              Anggota
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
