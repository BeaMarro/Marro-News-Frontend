import React from "react";
import { Image, Button } from "react-bootstrap";
import DeleteIcon from "../../assets/images/delete.png";
import "../../styles/ActionButtons.css";

function ActionButton({title, onClick}) { // Handle onClick events based on which form this is used in
    return (
        <Button type="submit" variant="primary" className="submit" onClick={onClick}>
          {title}
      </Button>
    );
}

export default ActionButton;
