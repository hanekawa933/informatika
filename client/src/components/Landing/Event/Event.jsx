import React from "react";
import Image from "../../../images/event-image.jpg";
import "./Event.css";

const Event = () => {
  return (
    <div className="row vh-80 p-0 m-0">
      <div className="col-lg-12 col-md-12 p-0 m-0 vh-70">
        <a href="#!" className="nav-link text-dark">
          <h1>
            Latest Event <i className="fas fa-angle-double-right"></i>
          </h1>
        </a>
        <a href="!#" className="nav-link p-0 m-0 text-dark link-hover">
          <img
            src={Image}
            alt="Event"
            className="col-lg-12 col-md-12 vh-70 p-0 m-0 image"
          />
          <div className="middle">
            <button className="btn btn-outline-primary btn-size">
              View Event
            </button>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Event;
