import React from "react";
import image from "../../images/img_avatar.png";
import "./Sidebar.css";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Sidebar = ({ logout, ...props }) => {
  return (
    <div
      sidebar={props.sidebar}
      className={`col-lg-2 col-md-4 bg-primary-secondary p-0 m-0  ${props.sidebar} d-flex justify-content-evenly align-items-center flex-column text-light`}
    >
      <h5 className="my-5">Administrator Dashboard</h5>
      <div className="profile">
        <div className="avatar">
          <img src={image} alt="Avatar" className="w-100 avatar mx-2" />
        </div>
        <h5 className="my-3">Administrator</h5>
      </div>
      <nav className="w-100 my-5">
        <ul className="navbar-nav d-flex justify-content-center align-items-center">
          <li className="nav-item w-100">
            <Link to="#" className="nav-link text-light">
              <i className="fas fa-home mx-5 fs-20"></i>
              <span>Beranda</span>
            </Link>
          </li>
          <li className="nav-item w-100">
            <a
              className="nav-link text-light"
              data-toggle="collapse"
              href="#buatData"
              role="button"
              aria-expanded="false"
              aria-controls="buatData"
            >
              <i className="fas fa-plus mx-5 fs-20"></i>
              <span>Buat Data</span>
            </a>
          </li>
          <div className="collapse w-100" id="buatData">
            <li className="nav-item w-100">
              <Link
                to="/admin/create/anggota"
                className="nav-link text-light my-3 mx-5"
              >
                Buat Data Anggota
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                to="/admin/create/dokumen"
                className="nav-link text-light my-3 mx-5"
              >
                Buat Data Dokumen
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                to="/admin/create/event"
                className="nav-link text-light my-3 mx-5"
              >
                Buat Data Event
              </Link>
            </li>
          </div>
          <li className="nav-item w-100">
            <a
              className="nav-link text-light"
              data-toggle="collapse"
              href="#lihatData"
              role="button"
              aria-expanded="false"
              aria-controls="lihatData"
            >
              <i className="fas fa-eye mx-5 fs-20"></i>
              <span>Lihat Data</span>
            </a>
          </li>
          <div className="collapse w-100" id="lihatData">
            <li className="nav-item w-100">
              <Link
                to="/admin/data/anggota"
                className="nav-link text-light my-3 mx-5"
              >
                Lihat Data Anggota
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                to="/admin/data/dokumen"
                className="nav-link text-light my-3 mx-5"
                href="!#"
              >
                Lihat Data Dokumen
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                to="/admin/data/event"
                className="nav-link text-light my-3 mx-5"
                href="!#"
              >
                Lihat Data Event
              </Link>
            </li>
          </div>
          <li className="nav-item w-100">
            <Link
              to="/admin/data/change profile"
              className="nav-link text-light "
              href="!#"
            >
              <i className="fas fa-user-alt mx-5 fs-20"></i>
              <span>Ganti Data Pribadi</span>
            </Link>
          </li>
          <li className="nav-item w-100">
            <Link to="/" onClick={logout} className="nav-link text-light">
              <i className="fas fa-sign-out-alt mx-5 fs-20"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Sidebar);
