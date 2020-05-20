import React from "react";
import Landing from "./Landing";
import About from "./Landing/About";
import Event from "./Landing/Event";
import Subscription from "./Landing/Subscription";

const Main = () => {
  return (
    <div>
      <Landing />
      <About />
      <Event />
      <Subscription />
    </div>
  );
};

export default Main;
