import React from "react";
import Profile from "../../../images/img_avatar.png";
import Navbar from "../../Navbar";

const ProfileAnggota = () => {
  return (
    <div>
      <Navbar />
      <div className="w-80 m-auto">
        <div className="row mt-5">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <img src={Profile} alt="" className="w-100" />
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5>Nama : Muhammad Iqbal Ramadhan</h5>
                <h5>Tempat Tanggal Lahir : 27-11-2000, Purwokerto</h5>
                <h5>Agama : Islam</h5>
                <h5>NIM : 2018104313</h5>
                <h5>Jabatan : Ketua</h5>
                <h5>Angkatan : 2018</h5>
                <h5>Email : iqbalkorompiz@gmail.com</h5>
                <h5>Instagram : @hanekawa_shirayuki</h5>
                <h5>Twitter : @hanekawa_hanbei</h5>
                <h5>Facebook : Iqbal Ramadhan</h5>
                <h5>WhatsApp : 082298546467</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnggota;
