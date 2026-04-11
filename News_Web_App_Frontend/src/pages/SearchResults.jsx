import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AccountNavigation from "../components/navigation/AccountNavigation";
import Loader from "../components/loader/Loader";
import LargeArticlesListCard from "../components/article/LargeArticlesListCard";
import SearchArticlesAPI from "../api/SearchArticlesAPI";

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState("");

  const { query } = useParams();

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true); // Set loading to true when starting to fetch new results
      const results = await SearchArticlesAPI.searchArticlesByQuery(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching articles by query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Update the current query state when the route params change
    setCurrentQuery(query);
  }, [query]);

  useEffect(() => {
    // Fetch new results when the current query changes
    if (currentQuery !== "") {
      fetchSearchResults();
    }
  }, [currentQuery]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <br/>
          <h2 id="center">Search results for <i>{currentQuery}</i>:</h2>
          <LargeArticlesListCard articles={searchResults} />
        </>
      )}
    </>
  );
}

export default SearchResults;
