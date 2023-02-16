import React from "react";

const ShareButton = ({ title, text, url }) => {
  const handleClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API not supported in this browser");
    }
  };

  return <button onClick={handleClick}>Share</button>;
};

export default ShareButton;
