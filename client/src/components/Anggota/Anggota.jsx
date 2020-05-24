import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { readAnggota } from "../../actions/anggota/read";
import CardAnggota from "../Card/CardAnggota";

const Anggota = ({ readAnggota, anggota }) => {
  useEffect(() => {
    readAnggota();
  }, [readAnggota]);

  let id = 1;

  const dataAnggota = anggota.map((listAnggota, index) => {
    return (
      <CardAnggota
        foto={listAnggota.foto}
        nama={`${listAnggota.nama_depan} ${listAnggota.nama_belakang}`}
        jabatan={listAnggota.jabatan}
        angkatan={listAnggota.angkatan}
        linkProfile={`/anggota/${listAnggota.nim}`}
        key={id++}
      />
    );
  });
  return (
    <div>
      <Navbar />
      <div className="w-60 m-auto">
        <h1 className="mt-5">Halaman Anggota</h1>
        <div className="row d-flex justify-content-center align-items-center">
          {dataAnggota}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  anggota: state.readAnggota.anggota,
});

export default connect(mapStateToProps, { readAnggota })(Anggota);
