import React from "react";
import Navbar from "../Navbar";
import CardEvent from "../Card/CardEvent";

const Event = () => {
  return (
    <div>
      <Navbar />
      <div className="w-80 m-auto">
        <nav aria-label="breadcrumb" className="mt-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#">Event Aktif</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Event
            </li>
          </ol>
        </nav>
        <div className="row">
          <CardEvent />
        </div>
        <nav aria-label="breadcrumb" className="mt-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#">Event Yang Sudah Berakhir</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Event
            </li>
          </ol>
        </nav>
        <div className="row">
          <CardEvent />
        </div>
      </div>
    </div>
  );
};

export default Event;
