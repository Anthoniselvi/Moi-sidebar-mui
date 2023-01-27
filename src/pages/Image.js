import React, { useState } from "react";
import image1 from "../images/family.jpg";
import image2 from "../images/family1.jpg";
import image3 from "../images/family2.jpg";
import image4 from "../images/family3.jpg";

const images = {
  image1: image1,
  image2: image2,
  image3: image3,
  image4: image4,
};

function Image() {
  const [inputValue, setInputValue] = useState("");
  const [imageSource, setImageSource] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setImageSource(images[event.target.value]);
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <img src={imageSource} alt="Image" />
    </div>
  );
}

export default Image;
