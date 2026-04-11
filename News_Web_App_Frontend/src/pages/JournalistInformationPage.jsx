import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleAPI from "../api/ArticleAPI";
import JournalistAPI from "../api/JournalistAPI";
import Loader from "../components/loader/Loader";
import LargeArticlesListCard from "../components/article/LargeArticlesListCard";
import JournalistSection from "../components/journalist/JournalistSection";

function JournalistInformationPage() {
  const [articlesByJournalist, setArticlesByJournalist] = useState([]);
  const [journalist, setJournalist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id: journalistId } = useParams();

  const fetchJournalist = async () => {
    try {
      const fetchedJournalist = await JournalistAPI.fetchJournalistById(journalistId);
      console.log(fetchedJournalist);
      setJournalist(fetchedJournalist);
    } catch (error) {
      console.error("Error fetching journalist:", error);
    }
  };
  

  const fetchArticlesByJournalist = async () => {
    try {
      const fetchArticlesByJournalistId = await ArticleAPI.fetchApprovedArticlesByJournalistId(journalistId);
      setArticlesByJournalist(fetchArticlesByJournalistId);
    } catch (error) {
      console.error("Error fetching articles by journalist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesByJournalist();
    fetchJournalist();
  }, [journalistId]); // Reload only when id changes

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {journalist && <JournalistSection journalist={journalist} />}
      <br/>
      <LargeArticlesListCard articles={articlesByJournalist} />
    </>
  );
}

export default JournalistInformationPage;
