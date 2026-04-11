import React from "react";
import { Card, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ArticleCard.css";

function ArticleCard({article}) {
    return (
        <Link to={`/article/${article.id}`}>
                <Card key={index} className="mb-3">
                    <Card.Body className="card-container">
                        <Card.Img
                            variant="top"
                            src={`data:image/png;base64,${article.coverImage}`}
                            alt="Cover Image"
                            className="card-image"
                        />
                        <div>
                            <Card.Title className="card-title">{article.heading}</Card.Title>
                            <Card.Text>
                                <p>By {article.author.fullName} on {article.publishDate}</p>
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
        </Link>
    );
}

export default ArticleCard;
