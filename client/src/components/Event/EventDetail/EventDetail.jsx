import React from "react";
import Navbar from "../../Navbar";
import Event from "../../../images/event-image.jpg";

const EventDetail = () => {
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
                  <h5>Nama Event</h5>
                  <h5>Deskripsi Event</h5>
                  <h5>Tanggal</h5>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="ml-5">
                  <h5>Lokasi</h5>
                  <h5>Tanggal</h5>
                  <h5>Jam</h5>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-12 col-md-12 col-sm-12 ">
                <div className="text-center display-4">
                  Syarat dan Ketentuan
                </div>
                <div>DKAWOPDKAWOPDK</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
