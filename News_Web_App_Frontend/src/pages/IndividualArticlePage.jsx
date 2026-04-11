import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ArticleAPI from "../api/ArticleAPI";
import TokenManager from "../api/TokenManager";
import ArticleInformationSection from "../components/article/ArticleInformationSection";
import Loader from "../components/loader/Loader";
import AccessDeniedSection from "../components/access/AccessDeniedSection";

function IndividualArticlePage() {
  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const [articleById, setArticle] = useState([]);
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchArticleById = await ArticleAPI.fetchArticleById(id);
        setArticle(fetchArticleById);
        setStatus(fetchArticleById.status);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // Reload only when id changes

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {status === "APPROVED" || (status !== "APPROVED" && (role === "JOURNALIST" || role === "ADMIN")) ? (
            <ArticleInformationSection article={articleById} />
          ) : (
            <>
              <AccessDeniedSection description={"You do not have the correct credentials to access this resource"} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default IndividualArticlePage;
