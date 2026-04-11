import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import AccessDeniedSection from "../components/access/AccessDeniedSection";
import AccountNavigation from "../components/navigation/AccountNavigation";
import Loader from "../components/loader/Loader";
import TokenManager from "../api/TokenManager";
import ArticleStatisticsAPI from "../api/ArticleStatisticsAPI";
import BarChart from "../components/statistics/BarChart";
import PieChart from "../components/statistics/PieChart";

function PerformanceStatistics() {
  const [totalArticlesByJournalist, setTotalArticlesByJournalist] = useState([]);
  const [articleShareByJournalist, setArticleShareByJournalist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const fetchTotalArticlesByJournalists = async () => {
    try {
        const fetchStatistics = await ArticleStatisticsAPI.fetchTotalArticlesByJournalist();
        setTotalArticlesByJournalist(fetchStatistics);
    } catch (error) {
      console.error("Error fetching article statistics:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const fetchArticleShareByJournalists = async () => {
    try {
        const fetchStatistics = await ArticleStatisticsAPI.fetchArticleShareByJournalist();
        setArticleShareByJournalist(fetchStatistics);
    } catch (error) {
      console.error("Error fetching article statistics:", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalArticlesByJournalists();
    fetchArticleShareByJournalists();

  }, []);

    return (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isLoggedIn && role === "ADMIN" ? (
                <>
                  <AccountNavigation />
                  <br/>
                  <Container id="center">
                    <h2>Performance Statistics</h2>
                    <p>Journalist performance based on the amount of articles written</p>
                    <p><i>Hint: Hover on a section of the chart to view more detailed information</i></p>
                  </Container>

                  <Container className="d-flex justify-content-center align-items-center">
                    <Col>
                        <BarChart data={totalArticlesByJournalist} />
                        </Col>
                        <Col>
                        <PieChart data={articleShareByJournalist} />
                        </Col>
                  </Container>
                </>
              ) : (
                <AccessDeniedSection description={"You do not have the correct credentials to access this resource"} />
              )}
            </>
          )}
        </>
      );
}

export default PerformanceStatistics;