import React from "react";
import { Image, Button } from "react-bootstrap";
import DisapproveIcon from "../../assets/images/disapprove.png";
import "../../styles/ActionButtons.css";

function DisapproveButton({onClick}) { // Handle onClick events based on which form this is used in
    return (
        <Button className="action-button" onClick={onClick}>
            <Image className="icon" src={DisapproveIcon} alt="Disapprove"/>
        </Button>
    );
}

export default DisapproveButton;
