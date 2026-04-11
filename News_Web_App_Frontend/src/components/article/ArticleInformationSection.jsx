import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import ArticleDetails from "../AuthorDetails";
import "../../styles/ArticleInformationPage.css";
import VideoEmbed from "../VideoEmbed";
import FavouritesListAPI from "../../api/FavouritesListAPI";
import ReadingTimeAPI from "../../api/ReadingTimeAPI";
import ActionButton from "../form/ActionButton";
import TokenManager from "../../api/TokenManager";
import MiniLoader from "../loader/MiniLoader";
import IconLabel from "./IconLabel";
import ReadingTime from "../../assets/images/reading-time.png";

function ArticleInformationSection({ article }) {
  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;
  const userId = isLoggedIn ? TokenManager.getClaims().accountId : null;

  const [favouritesList, setFavouritesList] = useState([]);
  const [isInFavouritesList, setIsInFavouritesList] = useState([]);
  const [readingTime, setReadingTime] = useState();
  const [loading, setLoading] = useState(true);

  const fetchFavouritesList = async () => {
    try {
      const fetchFavouritesList = await FavouritesListAPI.fetchFavouritesList(userId);
      setFavouritesList(fetchFavouritesList);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error("Error fetching favourites list: ", error);
    }
  };

  const fetchReadingTime = async () => {
    try {
      const fetchReadingTime = await ReadingTimeAPI.fetchReadingTimeByArticleId(article.id);
      setReadingTime(fetchReadingTime);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error("Error fetching article reading-time: ", error);
    }
  };

  const handleSave = async (articleId) => {
    try {
      await FavouritesListAPI.addFavouritesListArticle(articleId);
      window.location.reload(); // Reloads the page
    } catch (error) {
      console.error("An error occurred while adding the article to the favourites list");
    }
  };

  useEffect(() => {
    fetchFavouritesList();
    fetchReadingTime();
  }, []);

  useEffect(() => {
    setIsInFavouritesList(
      favouritesList.map((favouriteArticle) => favouriteArticle.id).includes(article.id)
    );
  }, [favouritesList, article]);

  return (
    <Container className="newspaper-background">
      <h1 id="article-heading">
        <b>{article.heading}</b>
      </h1>
      <p>
        {loading ? (
          <MiniLoader />
        ) : (
          <IconLabel icon={ReadingTime} label={`Reading Time: ${readingTime} minutes`} />
        )}
        <i>Published on {article.publishDate}</i>
      </p>

      {isLoggedIn && loading &&  role === "USER" && <MiniLoader/>}

      {isLoggedIn && role === "USER" && !loading && (
        // Only display favourites section if logged in and content loaded
        isInFavouritesList ? (
          // Display a button/text based on whether the article is in the user's favourites list
          <p>✅ This article is in your favourites list</p>
        ) : (
          <ActionButton title="Add to favorites" onClick={() => handleSave(article.id)} />
        )
      )}

      {article.coverImage &&
        <Container>
          <Image className="cover-image" src={`data:image/png;base64,${article.coverImage}`} rounded fluid />
        </Container>
      }

      <div className="article-text">{article.text}</div>

      {article.video && <VideoEmbed videoLink={article.video} />}

      {article.author && article.genre ? (
        // Checks if the article has an author assigned to it
        <ArticleDetails author={article.author} genre={article.genre} />
      ) : (
        <p>
          <i>Author information not available</i>
        </p>
      )}
    </Container>
  );
}

export default ArticleInformationSection;
