import React from "react";
import { Button, Image } from "react-bootstrap";
import "../../styles/ActionButtons.css";
import "../../styles/TextIconButton.css";

function TextIconButton({ icon, text, onClick }) {
  return (
    <Button className="icon-button rounded-button text-icon-button" id="btn" onClick={onClick}>
      <span>
        <Image className="icon" src={icon} alt="Icon" />
        {text}
      </span>
    </Button>
  );
}

export default TextIconButton;
