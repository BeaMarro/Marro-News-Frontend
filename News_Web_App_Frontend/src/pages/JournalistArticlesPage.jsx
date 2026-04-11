import React, { useState, useEffect } from "react";
import AccountNavigation from "../components/navigation/AccountNavigation";
import ArticlesTable from "../components/article/ArticleTable";
import ArticleAPI from "../api/ArticleAPI";
import CreateArticleForm from "../components/article/CreateArticleForm";
import AccessDeniedSection from "../components/access/AccessDeniedSection";
import TokenManager from "../api/TokenManager";
import Loader from "../components/loader/Loader";
import "../styles/JournalistsPage.css";
import SearchBar from "../components/search/SearchBar";

function JournalistArticlesPage() {
  const [articlesByJournalist, setArticlesByJournalist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;
  const journalistId = isLoggedIn ? TokenManager.getClaims().accountId : null;

  const fetchArticlesByJournalist = async () => {
    try {
      const fetchArticlesByJournalistId = await ArticleAPI.fetchAllArticlesByJournalistId(journalistId);
      setArticlesByJournalist(fetchArticlesByJournalistId);
    } catch (error) {
      console.error("Error fetching articles by journalist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesByJournalist();
  }, [journalistId]); // Reload only when id changes

  if (isLoading) {
    return <Loader />;
  }

  if (isLoggedIn) {
    if (role === "JOURNALIST") {
      return (
        <>
          <AccountNavigation />
          <div className="spaced-container">
            <CreateArticleForm />
            <ArticlesTable title="My Articles" articles={articlesByJournalist} />
          </div>
        </>
      );
    } else {
      return <AccessDeniedSection description={"You do not have the correct credentials to access this resource"} />;
    }
  } else {
    return <AccessDeniedSection description={"You must first log in to access this resource"} />;
  }
}

export default JournalistArticlesPage;
