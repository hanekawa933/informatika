import React from "react";
import Navbar from "../Navbar";
import CardAnggota from "../Card/CardAnggota";

const Anggota = () => {
  return (
    <div>
      <Navbar />
      <div className="w-60 m-auto">
        <h1 className="mt-5">Halaman Anggota</h1>
        <div className="row d-flex justify-content-center align-items-center">
          <CardAnggota />
          <CardAnggota />
          <CardAnggota />
        </div>
      </div>
    </div>
  );
};

export default Anggota;
