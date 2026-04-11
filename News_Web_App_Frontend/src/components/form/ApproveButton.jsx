import React from "react";
import { Image, Button } from "react-bootstrap";
import ApproveIcon from "../../assets/images/approve.png";
import "../../styles/ActionButtons.css";

function ApproveButton({onClick}) { // Handle onClick events based on which form this is used in
    return (
        <Button className="action-button" onClick={onClick}>
            <Image className="icon" src={ApproveIcon} alt="Approve"/>
        </Button>
    );
}

export default ApproveButton;
