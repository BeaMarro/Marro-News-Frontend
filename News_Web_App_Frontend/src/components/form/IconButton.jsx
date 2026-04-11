import React from "react";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../../styles/ActionButtons.css";

function IconButton({ onClick, image }) {
    return (
        <Button className="action-button" onClick={onClick}>
            <Image className="icon" src={image} alt="Action Button" />
        </Button>
    );
}

export default IconButton;
