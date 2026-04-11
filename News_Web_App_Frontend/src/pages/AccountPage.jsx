import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountNavigation from "../components/navigation/AccountNavigation";
import TokenManager from "../api/TokenManager";
import ProfileSection from "../components/profile/ProfileSection";
import JournalistAPI from "../api/JournalistAPI";
import UserAPI from "../api/UserAPI";
import AdminAPI from "../api/AdminAPI";
import Loader from "../components/loader/Loader";

function AccountPage() {
  const accessToken = TokenManager.getAccessToken();
  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const id = isLoggedIn ? TokenManager.getClaims().accountId : null;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const [account, setAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchAccount = async (id) => {
    try {
      let fetchedAccount = null;
      if (role === "ADMIN") {
        fetchedAccount = await AdminAPI.fetchAdminById(id);
      } else if (role === "JOURNALIST") {
        fetchedAccount = await JournalistAPI.fetchJournalistById(id);
      } else if (role === "USER") {
        fetchedAccount = await UserAPI.fetchUserById(id);
      } else {
        console.log("Invalid user type");
      }
      
      setAccount(fetchedAccount);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      // If not logged in -> Navigate to Login page
      navigate("/login");
    } else {
      fetchAccount(id);
    }
  }, [accessToken, navigate, id]);

  return (
    <>
      {isLoading && <Loader />}
      {accessToken && !isLoading && <AccountNavigation />}
      {account && !isLoading && <ProfileSection account={account} />}
    </>
  );
}

export default AccountPage;
