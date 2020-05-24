import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { Redirect } from "react-router-dom";
import Footer from "../../Footer";
import { createDokumen } from "../../../actions/dokumen/create";
import { connect } from "react-redux";

const CreateEvent = ({ createDokumen, success }) => {
  const [formData, setFormData] = useState({
    nama: "",
    description: "",
    jenis_file: "Rahasia",
    tipe_file: ".pdf",
    file: "",
  });

  const { nama, description, jenis_file, tipe_file, file } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    createDokumen({
      nama,
      description,
      jenis_file,
      tipe_file,
      file,
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
          <h1 className="text-center my-5">Create Dokumen</h1>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Harga">Nama Dokumen</label>
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
              <label htmlFor="Description">Deskripsi Dokumen</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                className="form-control disabled-resize"
                placeholder="Deskripsikan Dokumen"
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <div class="form-group">
                <label for="Jenis Dokumen">Jenis Dokumen</label>
                <select
                  class="form-control"
                  name="jenis_file"
                  onChange={(e) => onChange(e)}
                >
                  <option value="Rahasia">Rahasia</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <div class="form-group">
                <label for="Jenis Dokumen">Tipe File</label>
                <select
                  class="form-control"
                  name="tipe_file"
                  onChange={(e) => onChange(e)}
                >
                  <option value=".pdf">.pdf</option>
                  <option value=".docx">.docx</option>
                  <option value=".pptx">.pptx</option>
                  <option value=".txt">.txt</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-lg-8 col-md-12">
              <label htmlFor="Poster">Upload Dokumen</label>
              <input
                type="file"
                className="form-control-file"
                name="file"
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
  dokumen: state.createDokumen.dokumen,
  success: state.createDokumen.success,
});

export default connect(mapStateToProps, { createDokumen })(CreateEvent);
