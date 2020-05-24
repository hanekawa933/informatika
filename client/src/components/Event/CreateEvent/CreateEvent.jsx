import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { Redirect } from "react-router-dom";
import Footer from "../../Footer";
import { createEvent } from "../../../actions/event/create";
import { connect } from "react-redux";

const CreateEvent = ({ createEvent, success }) => {
  const [formData, setFormData] = useState({
    nama: "",
    description: "",
    harga: "",
    rules: "",
    poster: "",
    lokasi: "",
    tanggal: "",
    jam_mulai: "",
    jam_berakhir: "",
    nama_tamu: "",
  });

  const {
    nama,
    description,
    harga,
    rules,
    poster,
    lokasi,
    tanggal,
    jam_mulai,
    jam_berakhir,
    nama_tamu,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    createEvent({
      nama,
      description,
      harga,
      rules,
      poster,
      lokasi,
      tanggal,
      jam_mulai,
      jam_berakhir,
      nama_tamu,
    });
  };

  if (success) {
    return <Redirect to="/admin/dashboard" />;
  }
  return (
    <div>
      <div className="row d-flex flex-row p-0 m-0">
        <Sidebar />
        <form className="col-lg col-md" onSubmit={(e) => onSubmit(e)}>
          <h1 className="text-center my-5">Create Event</h1>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Harga">Nama Event</label>
              <input
                type="text"
                className="form-control"
                name="nama"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Description">Deskripsi Event</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                className="form-control disabled-resize"
                placeholder="Deskripsikan Event"
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Harga">Harga</label>
              <input
                type="text"
                className="form-control"
                name="harga"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Rules">Rules</label>
              <input
                type="text"
                className="form-control"
                name="rules"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Poster">Upload Poster</label>
              <input
                type="file"
                className="form-control-file"
                name="poster"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Lokasi">Lokasi</label>
              <input
                type="text"
                className="form-control"
                name="lokasi"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Tanggal">Tanggal</label>
              <input
                type="date"
                className="form-control"
                name="tanggal"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-4 col-md-12">
              <label htmlFor="Jam Mulai">Jam Mulai</label>
              <input
                type="time"
                className="form-control"
                name="jam_mulai"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 col-md-12">
              <label htmlFor="Jam Berakhir">Jam Berakhir</label>
              <input
                type="time"
                className="form-control"
                name="jam_berakhir"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Tamu">Nama Tamu</label>
              <input
                type="text"
                className="form-control"
                name="nama_tamu"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3 mb-5">
            <div className="col-lg-8 col-md-12">
              <button className="btn bg-primary-secondary text-light btn-block">
                Buat Data
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  event: state.createEvent.event,
  success: state.createEvent.success,
});

export default connect(mapStateToProps, { createEvent })(CreateEvent);
