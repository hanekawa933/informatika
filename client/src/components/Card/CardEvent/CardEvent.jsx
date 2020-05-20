import React from "react";
import Image from "../../../images/event-image.jpg";

const CardAnggota = () => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
      <div className="card">
        <img
          src={Image}
          alt="Foto Anggota"
          height="300"
          className="card-img-top"
        />
        <div className="card-footer bg-primary-secondary text-light">
          <div className="card-text">
            <div className="text-left h5">
              <p>Nama Event</p>
              <p>Lokasi</p>
              <p>Tanggal</p>
              <p>Jam</p>
              <p>Harga</p>
            </div>
            <div className="btn btn-outline-light float-right mt-3">
              Lihat Event
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnggota;
