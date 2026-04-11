import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import "../../styles/IconLabel.css";

function IconLabel({ icon, label }) {
  return (
    <Row className="flex">
        <Image className="mini-icon" src={icon} />
        <p>{label}</p>
    </Row>
  );
}

export default IconLabel;
