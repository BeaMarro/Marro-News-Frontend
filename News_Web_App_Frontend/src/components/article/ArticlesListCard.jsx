import React from "react";
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import CoverImage from "../../assets/images/cover_image.png";
import { Link } from "react-router-dom";
import "../../styles/ArticlesListCard.css"

function ArticlesListCard({ articles }) {
    let content;

    if (articles.length > 0) {
        content = articles.map((article, index) => (
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
        ));
    } else {
        content = <div>There are currently no pending articles.</div>;
    }
    
    return (
        <Container className="card-scroll-container">{content}</Container>
    );
}

export default ArticlesListCard;