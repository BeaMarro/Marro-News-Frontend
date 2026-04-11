import React, { useState, useEffect } from "react";
import AccountNavigation from "../components/navigation/AccountNavigation";
import FavouritesListAPI from "../api/FavouritesListAPI";
import AccessDeniedSection from "../components/access/AccessDeniedSection";
import TokenManager from "../api/TokenManager";
import Loader from "../components/loader/Loader";
import FavouriteArticlesListCard from "../components/article/favourites/FavouriteArticlesListCard";

function FavouritesListPage() {
  const [favouritesList, setFavouritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const fetchFavouritesList = async () => {
    try {
      const fetchFavouritesList = await FavouritesListAPI.fetchFavouritesList();
      setFavouritesList(fetchFavouritesList);
    } catch (error) {
      console.error("Error fetching articles by journalist:", error);
    } finally {
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    fetchFavouritesList();
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
              <h2 id="center">Favourites List</h2>
              <br/>
              <FavouriteArticlesListCard articles={favouritesList} />
            </>
          ) : (
            <AccessDeniedSection description={"You do not have the correct credentials to access this resource"} />
          )}
        </>
      )}
    </>
  );
}

export default FavouritesListPage;
