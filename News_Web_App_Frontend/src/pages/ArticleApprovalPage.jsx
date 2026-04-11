import React, { useState, useEffect } from "react";
import ArticleRequestTable from "../components/article/request/ArticleRequestTable";
import ApprovalAPI from "../api/ApprovalAPI";
import AccountNavigation from "../components/navigation/AccountNavigation";
import TokenManager from "../api/TokenManager";
import AccessDeniedSection from "../components/access/AccessDeniedSection";
import Loader from "../components/loader/Loader";
import "../styles/JournalistsPage.css";

function ArticleApprovalPage() {
  const [pendingArticles, setPendingArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const fetchPendingArticles = async () => {
    try {
      const fetchPendingArticles = await ApprovalAPI.fetchPendingArticles();
      setPendingArticles(fetchPendingArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingArticles();
  }, []);

  if (isLoggedIn) {
    if (role === "ADMIN") {
      return (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="spaced-container">
                <AccountNavigation />
                <ArticleRequestTable
                  name="Pending Articles"
                  articles={pendingArticles}
                />
              </div>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <AccessDeniedSection description={"You do not have the correct credentials to access this resource"} />
          )}
        </>
      );
    }
  } else {
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <AccessDeniedSection description={"You must first login to access this resource"} />
        )}
      </>
    );
  }
}

export default ArticleApprovalPage;
