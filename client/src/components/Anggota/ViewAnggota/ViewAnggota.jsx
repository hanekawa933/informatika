import React, { useEffect } from "react";
import Sidebar from "../../Sidebar";
import { connect } from "react-redux";
import { readAnggota } from "../../../actions/anggota/read";
import { Link } from "react-router-dom";

const ViewAnggota = ({ readAnggota, anggota }) => {
  useEffect(() => {
    readAnggota();
  }, [readAnggota]);

  let id = 1;

  const tableAnggota = anggota.map((listAnggota, index) => {
    return (
      <tr key={id++}>
        <th>{index + 1}</th>
        <td>
          {listAnggota.nama_depan} {listAnggota.nama_belakang}
        </td>
        <td>
          {listAnggota.tempat}, {listAnggota.tgl_lahir}
        </td>
        <td>{listAnggota.agama.agama}</td>
        <td>{listAnggota.nim}</td>
        <td>{listAnggota.jabatan}</td>
        <td>{listAnggota.angkatan}</td>
        <td>{listAnggota.divisi.divisi}</td>
        <td>{listAnggota.foto}</td>
        <td>
          <ul className="nav d-flex flex-column">
            <li className="nav-item">Facebook: {listAnggota.facebook}</li>
            <li className="nav-item">Twitter: {listAnggota.twitter}</li>
            <li className="nav-item">Instagram: {listAnggota.instagram}</li>
            <li className="nav-item">Whatsapp: {listAnggota.whatsapp}</li>
            <li className="nav-item">Email: {listAnggota.email}</li>
          </ul>
        </td>
        <td>{listAnggota.created_by}</td>
        <td>{listAnggota.updated_by}</td>
        <td>
          <Link
            to={`/admin/delete/${listAnggota.nim}`}
            className="btn btn-outline-danger"
          >
            Delete
          </Link>
        </td>
        <td>
          <Link
            to={`/admin/update/${listAnggota.nim}`}
            className="btn btn-outline-primary"
          >
            Update
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="row m-0 p-0 d-flex flex-row">
      <Sidebar sidebar="vh-100" />
      <div className="col-lg col-md mt-5">
        <h1>Table Data Anggota</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Tempat, Tanggal Lahir</th>
                <th scope="col">Agama</th>
                <th scope="col">NIM</th>
                <th scope="col">Jabatan</th>
                <th scope="col">Angkatan</th>
                <th scope="col">Divisi</th>
                <th scope="col">Foto</th>
                <th scope="col">Sosial Media</th>
                <th scope="col">Created By</th>
                <th scope="col">Updated By</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>{tableAnggota}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  anggota: state.readAnggota.anggota,
});

export default connect(mapStateToProps, { readAnggota })(ViewAnggota);
