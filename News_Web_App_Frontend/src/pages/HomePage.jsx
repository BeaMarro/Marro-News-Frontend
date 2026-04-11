import React, { useState, useEffect } from "react";
import ArticleCardSection from "../components/article/ArticleCardsSection";
import ArticleAPI from "../api/ArticleAPI";
import ArticleCoverOverlay from "../components/article/ArticleCoverOverlay";
import "../App.css";
import ArticlesListCard from "../components/article/ArticlesListCard";
import CurrentDateCard from "../components/CurrentDateCard";
import { Container, Row, Col } from 'react-bootstrap';
import LoginRegisterCard from "../components/login-register/LoginRegisterCard";
import Loader from "../components/loader/Loader";

function HomePage() {
  const [loading, setLoading] = useState(true);

  const [breakingNewsArticles, setBreakingNewsArticles] = useState([]);
  const [politicsArticles, setPoliticsArticles] = useState([]);
  const [businessEconomicsArticles, setBusinessEconomicsArticles] = useState([]);
  const [governmentArticles, setGovernmentArticles] = useState([]);
  const [scienceArticles, setScienceArticles] = useState([]);
  const [technologyArticles, setTechnologyArticles] = useState([]);
  const [artArticles, setArtArticles] = useState([]);
  const [healthWellnessArticles, setHealthWellnessArticles] = useState([]);
  const [entertainmentArticles, setEntertainmentArticles] = useState([]);
  const [sportsArticles, setSportsArticles] = useState([]);
  const [travelArticles, setTravelArticles] = useState([]);

    // Application of DRY (Do not Repeat Yourself) -> Passes setter as parameter to avoid repeating logic
    const fetchArticlesByGenre = async (genre, setArticles) => {
      try {
        setLoading(true); 
        const fetchArticlesByGenre = await ArticleAPI.fetchArticlesByGenre(genre);
        setArticles(fetchArticlesByGenre);
      } catch (error) {
        console.error("Error fetching articles by genre:", error);
      } finally {
        setLoading(false);
      }
    };
    

  useEffect(() => {
    try {
    fetchArticlesByGenre("BREAKING_NEWS", setBreakingNewsArticles);
    fetchArticlesByGenre("POLITICS", setPoliticsArticles);
    fetchArticlesByGenre("BUSINESS_ECONOMICS", setBusinessEconomicsArticles);
    fetchArticlesByGenre("GOVERNMENT", setGovernmentArticles);
    fetchArticlesByGenre("SCIENCE", setScienceArticles);
    fetchArticlesByGenre("TECHNOLOGY", setTechnologyArticles);
    fetchArticlesByGenre("ART", setArtArticles);
    fetchArticlesByGenre("HEALTH_WELLNESS", setHealthWellnessArticles);
    fetchArticlesByGenre("ENTERTAINMENT", setEntertainmentArticles);
    fetchArticlesByGenre("SPORT", setSportsArticles);
    fetchArticlesByGenre("TRAVEL", setTravelArticles);
    } catch {
      console.error("An error occurred while loading articles by genre");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
    {loading ? (
      <Loader/>
    ) : (
    <>
      <CurrentDateCard/>
          <Container fluid>
            <h1>Breaking News</h1>

            <Row>
              <Col lg={8}>
                {breakingNewsArticles && breakingNewsArticles.length > 0 && (
                  <ArticleCoverOverlay article={breakingNewsArticles[breakingNewsArticles.length - 1]} />
                )}
              </Col>
  
              <Col lg={4}>
                {breakingNewsArticles.length > 0 && (
                  <ArticlesListCard articles={breakingNewsArticles} />
                )}
              </Col>
            </Row>
          </Container>
          
          <ArticleCardSection genre="Science" articlesByGenre={scienceArticles}/>
          <ArticleCardSection genre="Politics" articlesByGenre={politicsArticles}/>
          <ArticleCardSection genre="Business and Economics" articlesByGenre={businessEconomicsArticles}/>
          <ArticleCardSection genre="Technology" articlesByGenre={technologyArticles}/>
          <ArticleCardSection genre="Government" articlesByGenre={governmentArticles}/>
          <ArticleCardSection genre="Art" articlesByGenre={artArticles}/>
          <ArticleCardSection genre="Health and Wellness" articlesByGenre={healthWellnessArticles}/>
          <ArticleCardSection genre="Entertainment" articlesByGenre={entertainmentArticles}/>
          <ArticleCardSection genre="Sport" articlesByGenre={sportsArticles}/>
          <ArticleCardSection genre="Travel" articlesByGenre={travelArticles}/>
  
          <LoginRegisterCard/>
        </>
      )}
    </div>
  );
 } 

export default HomePage;
