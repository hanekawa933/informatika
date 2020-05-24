import React from "react";
import Image from "../../../images/img_avatar.png";
import { Link } from "react-router-dom";

const CardAnggota = (props) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
      <div className="card">
        <img
          foto={props.foto}
          src={Image}
          alt="Foto Anggota"
          height="300"
          className="card-img-top"
        />
        <div className="card-footer bg-primary-secondary text-light">
          <div className="card-text">
            <div className="text-center">
              <h5 nama={props.nama}>Nama: {props.nama}</h5>
              <p jabatan={props.jabatan}>Jabatan: {props.jabatan}</p>
              <p angkatan={props.angkatan}>Angkatan: {props.angkatan}</p>
            </div>
            <Link
              linkProfile={props.linkProfile}
              to={props.linkProfile}
              className="btn btn-outline-light float-right mt-3"
            >
              Lihat Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnggota;
