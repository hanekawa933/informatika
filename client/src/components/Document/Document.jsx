import React from "react";
import Navbar from "../Navbar";
import CardDokumen from "../Card/CardDokumen";

const Document = () => {
  return (
    <div>
      <Navbar />
      <div className="w-80 m-auto">
        <div className="h1 mt-5">Halaman Dokumen</div>
        <div className="row">
          <CardDokumen />
        </div>
      </div>
    </div>
  );
};

export default Document;
