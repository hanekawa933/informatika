import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
import { connect } from "react-redux";
import { createAnggota } from "../../../actions/anggota/create";
import { Redirect } from "react-router-dom";

const Create = ({ success, createAnggota }) => {
  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    tempat: "",
    tgl_lahir: "",
    agama_id: 1,
    alamat: "",
    pekerjaan: "",
    nim: "",
    jabatan: "",
    angkatan: "",
    divisi_id: 1,
    foto: "",
    email: "",
    instagram: "",
    twitter: "",
    facebook: "",
    whatsapp: "",
  });

  const {
    nama_depan,
    nama_belakang,
    tempat,
    tgl_lahir,
    agama_id,
    nim,
    jabatan,
    angkatan,
    divisi_id,
    foto,
    email,
    instagram,
    twitter,
    facebook,
    whatsapp,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    createAnggota({
      nama_depan,
      nama_belakang,
      tempat,
      tgl_lahir,
      agama_id,
      nim,
      jabatan,
      angkatan,
      divisi_id,
      foto,
      email,
      instagram,
      twitter,
      facebook,
      whatsapp,
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
          <h1 className="text-center my-5">Create Anggota</h1>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label htmlFor="Nama Depan">Nama Depan</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama_depan"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label htmlFor="Nama Depan">Nama Belakang</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama_belakang"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label htmlFor="Nama Depan">Tempat</label>
                <input
                  type="text"
                  className="form-control"
                  name="tempat"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label htmlFor="Nama Depan">Tanggal Lahir</label>
                <input
                  type="date"
                  className="form-control"
                  name="tgl_lahir"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-8 col-md-12">
              <div class="form-group">
                <label for="Agama">Agama</label>
                <select
                  class="form-control"
                  id="exampleSelect1"
                  name="agama_id"
                  onChange={(e) => onChange(e)}
                >
                  <option value="1">Islam</option>
                  <option value="2">Kristen Protestan</option>
                  <option value="3">Kristen Katolik</option>
                  <option value="4">Hindu</option>
                  <option value="5">Budha</option>
                  <option value="6">Konghucu</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="NIM">NIM</label>
              <input
                type="text"
                className="form-control"
                name="nim"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Jabatan">Jabatan</label>
              <input
                type="text"
                className="form-control"
                name="jabatan"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Angkatan">Angkatan</label>
              <input
                type="text"
                className="form-control"
                name="angkatan"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <div class="form-group">
                <label for="Divisi">Divisi</label>
                <select
                  class="form-control"
                  id="exampleSelect1"
                  name="divisi_id"
                  onChange={(e) => onChange(e)}
                >
                  <option value="1">Administrator</option>
                  <option value="2">Event</option>
                  <option value="3">Anggota</option>
                  <option value="4">Dokumen</option>
                  <option value="5">Tidak Berdivisi</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="File">File</label>
              <input
                type="file"
                className="form-control-file"
                name="foto"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Instagram">Instagram</label>
              <input
                type="text"
                className="form-control"
                name="instagram"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Twitter">Twitter</label>
              <input
                type="text"
                className="form-control"
                name="twitter"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Facebook">Facebook</label>
              <input
                type="text"
                className="form-control"
                name="facebook"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Whatsapp">Whatsapp</label>
              <input
                type="text"
                className="form-control"
                name="whatsapp"
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
  anggota: state.createAnggota.anggota,
  success: state.createAnggota.success,
});

export default connect(mapStateToProps, { createAnggota })(Create);
