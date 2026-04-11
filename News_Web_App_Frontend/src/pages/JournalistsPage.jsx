import React, { useState, useEffect } from "react";
import AccountNavigation from "../components/navigation/AccountNavigation";
import JournalistAPI from "../api/JournalistAPI";
import JournalistsTable from "../components/journalist/JournalistsTable";
import CreateJournalistForm from "../components/journalist/CreateJournalistForm";
import AccessDeniedSection from "../components/access/AccessDeniedSection";
import TokenManager from "../api/TokenManager";
import Loader from "../components/loader/Loader";
import "../styles/JournalistsPage.css";
import SearchBar from "../components/search/SearchBar";
import SearchJournalistsAPI from "../api/SearchJournalistAPI";
import { Container } from "react-bootstrap";

function JournalistsPage() {
  const [journalists, setJournalists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const fetchJournalists = async () => {
    try {
      const fetchedJournalists = await JournalistAPI.fetchJournalists();
      setJournalists(fetchedJournalists);
    } catch (error) {
      console.error("Error fetching journalists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchJournalists = async () => {
    try {
      const fetchedJournalists = await SearchJournalistsAPI.searchJournalistsByQuery(search);
      setJournalists(fetchedJournalists);
    } catch (error) {
      console.error("Error fetching journalists by query:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = async () => {
    setIsLoading(true);
    if (search != '') {
      searchJournalists();
    } else {
      fetchJournalists();
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchJournalists();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isLoggedIn) {
    if (role === "ADMIN") {
      return (
        <>
          <AccountNavigation />
          <div className="spaced-container">
            <CreateJournalistForm />
          <SearchBar handleChange={handleChange} handleSearch={handleSearch} />
            
            {journalists.length > 0 ? (
            <JournalistsTable title="All Journalists" journalists={journalists} />
            ) : (
              <h2>No journalists found.</h2>
            )}
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

export default JournalistsPage;
