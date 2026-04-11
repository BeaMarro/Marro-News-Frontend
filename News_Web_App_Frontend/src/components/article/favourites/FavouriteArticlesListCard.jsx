import React from "react";
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/ArticlesListCard.css";
import DeleteFavouritesListItemPopup from "./DeleteFavouritesListItemPopup";

function FavouriteArticlesListCard({ articles }) {
    let content;
  
    if (articles.length > 0) {
      content = articles.map((article, index) => (
        <>
          <Card className="mb-3">
            <Card.Body className="card-container-large">
        <Link to={`/article/${article.id}`} key={index}>
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${article.coverImage}`}
                alt="Cover Image"
                className="card-image-large"
              />
              </Link>
              <div className="card-details">
                <Card.Title className="card-title-large">{article.heading}</Card.Title>
                <Card.Text>
                  <p>By {article.author.fullName} on {article.publishDate}</p>
                </Card.Text>
              </div>
            <DeleteFavouritesListItemPopup articleId={article.id} />
            </Card.Body>
            
          </Card>
            </>
      ));
    } else {
      content = <div>Your favourites list is currently empty</div>;
    }
  
    return (
        <>
            <div className="article-counter">{articles.length} articles</div>
            <Container className="card-scroll-container-large">
                {content}
            </Container>
        </>
    );
  }
  
  export default FavouriteArticlesListCard;
  