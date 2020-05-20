import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="vh-80 p-5 bg-about">
      <div className="row bg-light h-100 m-0 p-0">
        <div className="col-lg-12 col-md-12 text-center mt-5">
          <p className="display-3 text-uppercase mt-5">About Us</p>
          <p className="fs-24 mx-5 mt-5">
            "Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
