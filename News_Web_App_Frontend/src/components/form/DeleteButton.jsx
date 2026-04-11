import React from "react";
import { Image, Button } from "react-bootstrap";
import DeleteIcon from "../../assets/images/delete.png";
import "../../styles/ActionButtons.css";

function DeleteButton({onClick}) { // Handle onClick events based on which form this is used in
    return (
        <Button className="action-button" onClick={onClick}>
            <Image className="icon" src={DeleteIcon} alt="Delete"/>
        </Button>
    );
}

export default DeleteButton;
