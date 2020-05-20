import React from "react";
import Sidebar from "./Sidebar";

const Administrator = () => {
  return (
    <div className="row p-0 m-0 d-flex flex-row">
      <Sidebar sidebar="vh-100" />
      <div className="col-lg col-md">
        <p className="h1 mt-5">Overview</p>
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card text-center">
              <div className="card-header text-light bg-primary-secondary">
                <h5 className="card-title">Data Anggota</h5>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <i className="fas fa-users fs-icon-card"></i>
                  <h4>Anggota</h4>
                </div>
              </div>
              <div className="card-footer bg-primary-secondary text-light">
                <h4>17</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card text-center">
              <div className="card-header text-light bg-primary-secondary">
                <h5 className="card-title">Data Dokumen</h5>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <i className="fas fa-users fs-icon-card"></i>
                  <h4>Dokumen</h4>
                </div>
              </div>
              <div className="card-footer bg-primary-secondary text-light">
                <h4>17</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card text-center">
              <div className="card-header text-light bg-primary-secondary">
                <h5 className="card-title">Data Event</h5>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <i className="fas fa-users fs-icon-card"></i>
                  <h4>Event</h4>
                </div>
              </div>
              <div className="card-footer bg-primary-secondary text-light">
                <h4>17</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
