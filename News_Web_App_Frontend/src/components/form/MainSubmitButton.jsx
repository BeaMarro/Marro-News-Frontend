import React from "react";
import { Button } from "react-bootstrap";
import "../../styles/MainButton.css";

function MainSubmitButton({ title }) {
  return (
      <Button type="submit" variant="primary" className="submit">
          {title}
      </Button>
  );
}

export default MainSubmitButton;
