import React, { useEffect } from "react";
import Profile from "../../../images/img_avatar.png";
import Navbar from "../../Navbar";
import { profileAnggota } from "../../../actions/anggota/read";
import { connect } from "react-redux";

const ProfileAnggota = ({ profileAnggota, profile, match }) => {
  useEffect(() => {
    profileAnggota(match.params.nim);
  }, [profileAnggota, match.params.nim]);
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
                <h5>
                  Nama Lengkap :
                  {`${profile.nama_depan} ${profile.nama_belakang}`}
                </h5>
                <h5>
                  Tempat Tanggal Lahir :{" "}
                  {`${profile.tempat}, ${profile.tgl_lahir}`}
                </h5>
                <h5>Agama : {profile.agama && profile.agama.agama}</h5>
                <h5>NIM : {profile.nim}</h5>
                <h5>Jabatan : {profile.jabatan}</h5>
                <h5>Angkatan : {profile.angkatan}</h5>
                <h5>Divisi : {profile.divisi && profile.divisi.divisi}</h5>
                <h5>Email : {profile.email}</h5>
                <h5>Instagram : {profile.instagram}</h5>
                <h5>Twitter : {profile.twitter}</h5>
                <h5>Facebook : {profile.facebook}</h5>
                <h5>WhatsApp : {profile.email}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.readAnggota.profile,
});
export default connect(mapStateToProps, { profileAnggota })(ProfileAnggota);
