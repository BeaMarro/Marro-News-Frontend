import React from "react";
import { Button } from "react-bootstrap";
import "../../styles/ActionButtons.css";

function TextButton({ onClick, text }) {
  return (
    <Button variant="primary" className="submit" onClick={onClick}>
      {text}
    </Button>
  );
}

export default TextButton;
