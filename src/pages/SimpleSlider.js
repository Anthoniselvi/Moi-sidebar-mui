import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import "./style.css";
import Slider from "react-slick";
import DemoBar from "./DemoBar";
import DemoPie from "./DemoPie";
import Dashboard from "./Dashboard";
import EventList from "./EventList";
import Home from "./Home";
import Home1 from "./Home1";
export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Home />
        <Home1 />
        <Dashboard />
      </Slider>
    </div>
  );
}
