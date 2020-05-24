import React, { useEffect } from "react";
import Navbar from "../../Navbar";
import Event from "../../../images/event-image.jpg";
import { eventDetail } from "../../../actions/event/read";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EventDetail = ({ eventDetail, detail, match }) => {
  useEffect(
    () => {
      eventDetail(match.params.nama_event);
    },
    eventDetail,
    match.params.nama_event
  );
  return (
    <div>
      <Navbar />
      <div className="w-60 m-auto vh-90">
        <img src={Event} className="w-100 vh-70" alt="" />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="ml-5">
                  <h5>Nama Event: {detail.nama}</h5>
                  <h5>Tanggal: {detail.tanggal}</h5>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="ml-5">
                  <h5>Lokasi: {detail.lokasi}</h5>
                  <h5>
                    Jam: {detail.jam_mulai} - {detail.jam_berakhir}
                  </h5>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-12 col-md-12 col-sm-12 ">
                <div className="text-center display-4">Deskripsi Event</div>
                <div>
                  <p>{detail.description}</p>
                  <h4>Tamu / Pembicara</h4>
                  <p>{detail.tamu && detail.tamu.nama_tamu}</p>
                </div>
                <div className="text-center display-4">
                  Syarat dan Ketentuan
                </div>
                <div>
                  <p>{detail.rules}</p>
                </div>
              </div>
              <Link to={`event/buy/${detail.nama}`} className="btn btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  detail: state.readEvent.detail,
});

export default connect(mapStateToProps, { eventDetail })(EventDetail);
