import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import DonutChart from "../components/statistics/DonutChart";
import AccessDeniedSection from "../components/access/AccessDeniedSection";
import AccountNavigation from "../components/navigation/AccountNavigation";
import FavouritesListStatisticsAPI from "../api/FavoruitesListStatistics";
import Loader from "../components/loader/Loader";
import TokenManager from "../api/TokenManager";

function FavouritesListStatistics() {
  const [favouritesStatistics, setFavouritesStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;


  const fetchFavouritesListStatistics = async () => {
    try {
        const fetchStatistics = await FavouritesListStatisticsAPI.fetchStatistics();
        setFavouritesStatistics(fetchStatistics);
    } catch (error) {
      console.error("Error fetching favourites list:", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavouritesListStatistics();
  }, []);

    return (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isLoggedIn && role === "USER" ? (
                <>
                  <AccountNavigation />
                  <br/>
                  <h2 id="center">Favourites List Statistics</h2>
                  <p id="center"><i>Hint: Hover on a section of the chart to view the genre it corresponds to</i></p>
                  <Container className="d-flex justify-content-center align-items-center">
                    <Col xs={5} md={6} lg={4}>
                        <DonutChart data={favouritesStatistics} />
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

export default FavouritesListStatistics;