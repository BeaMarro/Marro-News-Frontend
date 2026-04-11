import React from "react";
import TokenManager from "../api/TokenManager";

function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon";
    } else {
        return "Good night";
    }
}

function UserGreeting() {
    const isLoggedIn = TokenManager.getClaims() !== undefined;
    const username = isLoggedIn ? TokenManager.getClaims().sub : null;
    const greeting = getGreeting();

    return (
        <h2 id="center"><i>{greeting}, {username}</i></h2>
    );
}

export default UserGreeting;
