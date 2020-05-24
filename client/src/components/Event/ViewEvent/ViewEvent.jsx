import React, { useEffect } from "react";
import Sidebar from "../../Sidebar";
import { connect } from "react-redux";
import { readEvent } from "../../../actions/event/read";
import { Link } from "react-router-dom";

const ViewEvent = ({ readEvent, event }) => {
  useEffect(() => {
    readEvent();
  }, [readEvent]);

  let id = 1;

  const tableEvent = event.map((listEvent, index) => {
    return (
      <tr key={id++}>
        <th>{index + 1}</th>
        <td>{listEvent.nama}</td>
        <td>{listEvent.description}</td>
        <td>{listEvent.harga}</td>
        <td>{listEvent.rules}</td>
        <td>{listEvent.poster}</td>
        <td>{listEvent.lokasi}</td>
        <td>{listEvent.tanggal}</td>
        <td>{listEvent.jam_mulai}</td>
        <td>{listEvent.jam_berakhir}</td>
        <td>
          <Link
            to={`/admin/delete/${listEvent.nama}`}
            className="btn btn-outline-danger"
          >
            Delete
          </Link>
        </td>
        <td>
          <Link
            to={`/admin/update/${listEvent.nama}`}
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
                <th scope="col">Nama Event</th>
                <th scope="col">Description</th>
                <th scope="col">Harga</th>
                <th scope="col">Rules</th>
                <th scope="col">Poster</th>
                <th scope="col">Lokasi</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Jam Mulai</th>
                <th scope="col">Jam Berakhir</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>{tableEvent}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  event: state.readEvent.event,
});

export default connect(mapStateToProps, { readEvent })(ViewEvent);
