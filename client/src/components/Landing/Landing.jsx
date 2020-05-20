import React from "react";
import "./Landing.css";
import Logo from "../../images/logo.png";

const Landing = () => {
  return (
    <div className="vh-100 background">
      <div className="row m-0 p-0 vh-20 d-flex justify-content-center align-items-center">
        <div className="col-lg-3 mr-5 col-md-4 d-flex justify-content-center align-items-center">
          <div className="logo d-flex justify-content-center align-items-center">
            <a href="!#">
              <img src={Logo} alt="Logo" className="w-100" />
            </a>
          </div>
        </div>
        <div className="col-lg-8 col-md-8">
          <nav className="navbar navbar-expand-lg">
            <ul className="navbar-nav d-flex justify-content-around align-items-center w-100">
              <li className="nav-item landing">
                <a className="nav-link text-light" href="!#">
                  Beranda
                </a>
              </li>
              <li className="nav-item landing">
                <a className="nav-link text-light" href="!#">
                  Tentang
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
      </div>
      <div className="row vh-80 p-0 m-0 text-light">
        <div className="col-lg-5 col-md-8 d-flex justify-content-center flex-column m-landing">
          <div className="display-1 ls-title">INFINITY</div>
          <div className="h2 ls-sub-title">Solidarity For Integrity</div>
          <button className="btn btn-primary mt-2 button-landing">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
