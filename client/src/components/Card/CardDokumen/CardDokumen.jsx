import React from "react";

const CardDokumen = () => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
      <div className="card text-center">
        <div className="card-header bg-primary-secondary text-white">
          <div className="card-title">Nama Dokumen</div>
        </div>
        <div className="card-body">
          <div className="card-text">Description: Description</div>
          <div className="card-text">Tipe File: Tipe File</div>
        </div>
        <div className="card-footer bg-primary-secondary text-white">
          <button className="btn btn-outline-light float-right">
            Download
          </button>
          <button className="btn btn-outline-light float-left">
            Lihat Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDokumen;
