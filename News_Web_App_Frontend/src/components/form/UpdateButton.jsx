import React from "react";
import { Image, Button } from "react-bootstrap";
import UpdateIcon from "../../assets/images/edit.png";
import "../../styles/ActionButtons.css";

function UpdateButton({ onClick }) {
  return (
    <Button className="action-button" onClick={onClick}>
      <Image className="icon" src={UpdateIcon} alt="Update" />
    </Button>
  );
}

export default UpdateButton;
