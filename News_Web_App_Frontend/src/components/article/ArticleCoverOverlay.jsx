import { Container, Row, Col, Image } from 'react-bootstrap';
import '../../styles/ArticleCoverOverlay.css';
import { Link } from "react-router-dom";

function ArticleCoverOverlay({article}) {
  if (!article || !article.heading || !article.author || !article.publishDate) {
    return null; // Returns nothing when data is not available or not yet loaded
  }

  return (
    <Link to={`/article/${article.id}`}>
        <Container fluid>
            <Row>
                <Col>
                <div className="image-container">
                    <Image
                    src={`data:image/png;base64,${article.coverImage}`}
                    alt="Cover Image"
                    className="image"
                    />
                    <div className="overlay-text">
                      <h2>{article.heading}</h2>
                      <p><i>By <b>{article.author.fullName}</b></i></p>
                      <p>Published on {article.publishDate}</p>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
    </Link>
  );
};

export default ArticleCoverOverlay;
