import React from "react";
import Image from "../../../images/img_avatar.png";

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
            <div className="text-center">
              <h5>Nama</h5>
              <p>Jabatan</p>
              <p>Angkatan</p>
            </div>
            <div className="btn btn-outline-light float-right mt-3">
              Lihat Profil
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnggota;
