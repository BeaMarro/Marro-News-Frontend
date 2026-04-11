import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ArticleCard from "./ArticleCard";
import IndividualArticleCard from "./InvidualArticleCard";

function ArticleCardSection({genre, articlesByGenre}) {
    if (articlesByGenre.length === 0) {
        return null;
    }

    return (
        <div>
            <Container fluid>   
              <h1>{genre}</h1>
                <Row>
                    {articlesByGenre.length !== 0 ? (
                        articlesByGenre.map((article) => (
                            <Col sm={4} key={article.id}>
                                <IndividualArticleCard article={article} />
                            </Col>
                        ))
                    ) : (
                        <Col sm={12}>
                            <p id="center">No {genre} articles found</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default ArticleCardSection;
