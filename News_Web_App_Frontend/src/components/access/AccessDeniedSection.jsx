import React from "react";
import { Container,Col } from "react-bootstrap";
import "../../styles/AccessDeniedCard.css";

function AccessDeniedSection({description}) {
    return (
        <Container className="access-denied-card">
            <Col>
                <h1>Access Denied</h1>
                <p>{description}</p>
            </Col>
        </Container>
    );
}

export default AccessDeniedSection;
