// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./style.css";

// const CarouselPage = () => {
//   return (
//     <Carousel>
//       <div>
//         <div className="image1"></div>
//         {/* <img src="../images/wedding.jpg" /> */}
//         <p className="legend">Legend 1</p>
//       </div>

//       <div>
//         <div className="image2"></div>
//         {/* <img src="../images/birthday.jpg" /> */}
//         <p className="legend">Legend 2</p>
//       </div>

//       <div>
//         <div className="image3"></div>
//         {/* <img src="../images/family1.jpg" /> */}
//         <p className="legend">Legend 3</p>
//       </div>
//     </Carousel>
//   );
// };

// export default CarouselPage;

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Carousel.css";

export default function Carousel({ items, itemWidth, infinite }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const numItems = items.length;
  const numVisibleItems = Math.ceil(itemWidth / 100);
  const numSlides = infinite ? numItems : numItems - numVisibleItems + 1;

  const handleClickPrev = () => {
    setCurrentSlide((currentSlide + numSlides - 1) % numSlides);
  };

  const handleClickNext = () => {
    setCurrentSlide((currentSlide + 1) % numSlides);
  };

  return (
    <div className="carousel">
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${currentSlide * itemWidth}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel__item">
            {item}
          </div>
        ))}
      </div>
      <button
        className="carousel__button carousel__button--prev"
        onClick={handleClickPrev}
      >
        {"<"}
      </button>
      <button
        className="carousel__button carousel__button--next"
        onClick={handleClickNext}
      >
        {">"}
      </button>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  itemWidth: PropTypes.number.isRequired,
  infinite: PropTypes.bool,
};

Carousel.defaultProps = {
  infinite: true,
};
