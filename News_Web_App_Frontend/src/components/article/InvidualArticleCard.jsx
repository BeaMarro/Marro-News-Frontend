import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../../styles/IndividualArticleCard.css';

export default function IndividualArticleCard({ article }) {
  return (
    <Link to={`/article/${article.id}`}>
      <Card className="individual-card">
        <Card.Img
          variant="top"
          src={`data:image/png;base64,${article.coverImage}`}
          alt={article.heading}
          height="250"
          className="individual-card-image"
        />
        <Card.Body className="card-content">
          <Card.Title className="individual-card-heading">{article.heading}</Card.Title>
          <Card.Text>
            By {article.author.fullName} on {article.publishDate}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button size="sm" variant="primary" className="individual-card-button">
            Read More
          </Button>
        </Card.Footer>
      </Card>
    </Link>
  );
}
