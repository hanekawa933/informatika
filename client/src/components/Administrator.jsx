import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { readAnggota } from "../actions/anggota/read";
import { readDokumen } from "../actions/dokumen/read";
import { readEvent } from "../actions/event/read";
import { connect } from "react-redux";

const Administrator = ({
  readAnggota,
  readDokumen,
  readEvent,
  anggota,
  dokumen,
  event,
}) => {
  useEffect(() => {
    readAnggota();
    readDokumen();
    readEvent();
  }, [readAnggota, readDokumen, readEvent]);

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
                  <h4 className="mt-3">Anggota</h4>
                </div>
              </div>
              <div className="card-footer bg-primary-secondary text-light">
                <h4>{anggota.length}</h4>
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
                  <i className="fas fa-file-word fs-icon-card"></i>
                  <h4 className="mt-3">Dokumen</h4>
                </div>
              </div>
              <div className="card-footer bg-primary-secondary text-light">
                <h4>{dokumen.length}</h4>
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
                  <i className="fab fa-elementor fs-icon-card"></i>
                  <h4 className="mt-3">Event</h4>
                </div>
              </div>
              <div className="card-footer bg-primary-secondary text-light">
                <h4>{event.length}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  anggota: state.readAnggota.anggota,
  dokumen: state.readDokumen.dokumen,
  event: state.readEvent.event,
  success: (state.auth.success = false),
});

export default connect(mapStateToProps, {
  readAnggota,
  readDokumen,
  readEvent,
})(Administrator);
