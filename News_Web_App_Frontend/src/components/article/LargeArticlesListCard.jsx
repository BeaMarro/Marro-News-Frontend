import React from "react";
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ArticlesListCard.css";

function LargeArticlesListCard({ articles }) {
    let content;
  
    if (articles.length > 0) {
      content = articles.map((article, index) => (
        <Link to={`/article/${article.id}`} key={index}>
          <Card className="mb-3">
            <Card.Body className="card-container-large">
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${article.coverImage}`}
                alt="Cover Image"
                className="card-image-large"
              />
              <div className="card-details">
                <Card.Title className="card-title-large">{article.heading}</Card.Title>
                <Card.Text>
                  <p>By {article.author.fullName} on {article.publishDate}</p>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      ));
    } else {
      content = <div>No articles found.</div>;
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
  
  export default LargeArticlesListCard;
  