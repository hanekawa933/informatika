import React, { useEffect } from "react";
import Sidebar from "../../Sidebar";
import { connect } from "react-redux";
import { readDokumen } from "../../../actions/dokumen/read";
import { Link } from "react-router-dom";

const ViewDokumen = ({ readDokumen, dokumen }) => {
  useEffect(() => {
    readDokumen();
  }, [readDokumen]);

  let id = 1;

  const tableDokumen = dokumen.map((listDokumen, index) => {
    return (
      <tr key={id++}>
        <th>{index + 1}</th>
        <td>{listDokumen.nama}</td>
        <td>{listDokumen.description}</td>
        <td>{listDokumen.jenis_file}</td>
        <td>{listDokumen.tipe_file}</td>
        <td>{listDokumen.file}</td>
        <td>{listDokumen.created_by}</td>
        <td>{listDokumen.updated_by}</td>
        <td>
          <Link
            to={`/admin/delete/${listDokumen.nama}`}
            className="btn btn-outline-danger"
          >
            Delete
          </Link>
        </td>
        <td>
          <Link
            to={`/admin/update/${listDokumen.nama}`}
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
        <h1>Table Data Event</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Dokumen</th>
                <th scope="col">Deskripsi Dokumen</th>
                <th scope="col">Jenis File</th>
                <th scope="col">Tipe File</th>
                <th scope="col">File</th>
                <th scope="col">Created By</th>
                <th scope="col">Updated By</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>{tableDokumen}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dokumen: state.readDokumen.dokumen,
});

export default connect(mapStateToProps, { readDokumen })(ViewDokumen);
