import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import ArticleCardSection from "../components/article/ArticleCardsSection";
import ArticleAPI from "../api/ArticleAPI";
import EnumConverter from "../components/utilities/EnumConverter";
import Loader from "../components/loader/Loader";
import ItemNotFound from "../assets/images/not_found.png";
import "../App.css";

function ArticlesByGenrePage() {
  const [articlesByGenre, setArticlesByGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { genre } = useParams();

  const fetchArticlesByGenre = async () => {
    try {
      const fetchArticlesByGenre = await ArticleAPI.fetchArticlesByGenre(genre.toUpperCase());
      setArticlesByGenre(fetchArticlesByGenre);
    } catch (error) {
      console.error("Error fetching articles by genre:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticlesByGenre();
  }, [genre]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {articlesByGenre.length === 0 ? (
            <Container id="center">
              <br/>
              <h2>No articles found for {EnumConverter.formatEnumToText(genre)}</h2>
              <Image src={ItemNotFound} alt="Item Not Found" fluid className="w-50" />
            </Container>
          ) : (
            <ArticleCardSection genre={EnumConverter.formatEnumToText(genre)} articlesByGenre={articlesByGenre} />
          )}
        </>
      )}
    </div>
  );
}

export default ArticlesByGenrePage;
