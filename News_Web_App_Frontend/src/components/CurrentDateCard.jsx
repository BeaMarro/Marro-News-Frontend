import React from "react";
import "../styles/CurrentDateCard.css";

function CurrentDateCard() {
    const current = new Date();
    const date = current.toDateString();

    return (
        <p className="current-date">{date}</p>
    );
}

export default CurrentDateCard;
