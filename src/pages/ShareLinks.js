import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

export default function ShareLinks() {
  return (
    <div>
      <WhatsappShareButton url="https://localhost:3000/">
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
      <FacebookShareButton url="https://localhost:3000/">
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
    </div>
  );
}
