import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import defaultProfilePicture from "../../assets/images/account.png";
import TokenManager from "../../api/TokenManager";
import "../../styles/ProfileSection.css";

function JournalistSection({ journalist }) {
  return (
    <Container className="profile-section">
      <Row>
        <Col xs={6} md={4}>
          {journalist.profilePicture ? (
            <Image
              className="profile-picture"
              src={`data:image/png;base64,${journalist.profilePicture}`}
              roundedCircle
              alt="profile"
            />
          ) : (
            <Image
              className="profile-picture"
              src={defaultProfilePicture}
              alt="Default Profile"
            />
          )}
        </Col>
        <Col>
          <h1>Articles by {journalist.fullName}</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default JournalistSection;
