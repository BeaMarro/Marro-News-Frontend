import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/MainButton.css"

function MainButton({ title, link }) {
  return (
    <Link to={link}>
      <Button variant="primary" className="submit">
        {title}
      </Button>
    </Link>
  );
}

export default MainButton;
