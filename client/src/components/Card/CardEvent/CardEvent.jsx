import React from "react";
import Image from "../../../images/event-image.jpg";
import { Link } from "react-router-dom";

const CardAnggota = (props) => {
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
              <p nama={props.nama}>Nama Event: {props.nama}</p>
              <p lokasi={props.lokasi}>Lokasi: {props.lokasi}</p>
              <p tanggal={props.tanggal}>Tanggal: {props.tanggal}</p>
              <p jamMulai={props.jam_mulai} jamBerakhir={props.jam_berakhir}>
                Jam: {props.jamMulai} - {props.jamBerakhir}
              </p>
              <p harga={props.harga}>Harga: {props.harga}</p>
            </div>
            <Link
              to={`/event/${props.nama}`}
              className="btn btn-outline-light float-right mt-3"
            >
              Lihat Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnggota;
