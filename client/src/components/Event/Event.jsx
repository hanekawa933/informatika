import React, { useEffect } from "react";
import Navbar from "../Navbar";
import CardEvent from "../Card/CardEvent";
import { readEvent } from "../../actions/event/read";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Event = ({ readEvent, event }) => {
  useEffect(() => {
    readEvent();
  }, [readEvent]);

  const dataEvent = event.map((listEvent, index) => {
    return (
      <CardEvent
        nama={listEvent.nama}
        lokasi={listEvent.lokasi}
        tanggal={listEvent.tanggal}
        jamMulai={listEvent.jam_mulai}
        jamBerakhir={listEvent.jam_berakhir}
        harga={listEvent.harga}
      />
    );
  });

  return (
    <div>
      <Navbar />
      <div className="w-80 m-auto">
        <nav aria-label="breadcrumb" className="mt-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#">Event Aktif</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Event
            </li>
          </ol>
        </nav>
        <div className="row">{dataEvent}</div>
        <nav aria-label="breadcrumb" className="mt-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#">Event Yang Sudah Berakhir</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Event
            </li>
          </ol>
        </nav>
        <div className="row">
          <CardEvent />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  event: state.readEvent.event,
});

export default connect(mapStateToProps, { readEvent })(Event);
