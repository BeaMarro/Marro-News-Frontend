import React, { useState, useEffect } from "react";
import ArticleCardSection from "../components/article/ArticleCardsSection";
import ArticleAPI from "../api/ArticleAPI";
import "../App.css"
import Loader from "../components/loader/Loader";

function AllArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    const fetchArticles = async () => {
      try {
        const fetchArticles = await ArticleAPI.fetchArticles();
        setArticles(fetchArticles);
      } catch (error) {
        console.error("Error fetching articles:", error); 
      } finally {
        setIsLoading(false);
      }
    }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {isLoading && <Loader/>}
      <ArticleCardSection genre="All Articles" articlesByGenre={articles}/>
    </>
  );
}

export default AllArticlesPage;
