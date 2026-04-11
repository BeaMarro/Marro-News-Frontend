import React from "react";
import JournalistAccountNavigationBar from "../navigation/JournalistAccountNavigation";
import UserGreeting from "../UserGreeting";
import TokenManager from "../../api/TokenManager";
import AdminAccountNavigation from "../navigation/AdminAccountNavigation";
import UserAccountNavigation from "../navigation/UserAccountNavigation";

function AccountNavigation() {
    const isLoggedIn = TokenManager.getClaims() !== undefined;
    const role = isLoggedIn ? TokenManager.getClaims().role : null;

    if (isLoggedIn) {
        return (
            <div>
                {role === "JOURNALIST" && <JournalistAccountNavigationBar activePathIndex={0} />}
                {role === "ADMIN" && <AdminAccountNavigation activePathIndex={0} />}
                {role === "USER" && <UserAccountNavigation activePathIndex={0} />}
                <UserGreeting name={"User"} />
            </div>
        );
    }
}

export default AccountNavigation;