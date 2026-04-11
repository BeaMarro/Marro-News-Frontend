import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import defaultProfilePicture from "../../assets/images/account.png";
import TokenManager from "../../api/TokenManager";
import "../../styles/ProfileSection.css";
import DeleteProfilePopup from "./DeleteProfilePopup";
import UpdateProfilePopup from "./UpdateProfilePopup";
import UpdatePassword from "./UpdatePassword";
import EnumConverter from "../utilities/EnumConverter";

function ProfileSection({ account }) {
    const isLoggedIn = TokenManager.getClaims() !== undefined;
    const role = isLoggedIn ? TokenManager.getClaims().role : null;

    return (
        <Container className="profile-section">
            <h2 id="center">My Profile</h2>
            <hr></hr>
        <Row>
            <Col>
                <p><b>Profile Picture:</b></p>
                {account.profilePicture ? (
                    <>
                            <Col xs={6} md={4}>
                                <Image className="profile-picture" src={`data:image/png;base64,${account.profilePicture}`} roundedCircle alt="profile" />
                            </Col>
                    </>
                ) : (
                    <>
                            <Col xs={6} md={4}>
                                <Image className="profile-picture" src={defaultProfilePicture} alt="Default Profile" />
                            </Col>
                    </>
                )}
                </Col>
                <Col>
                    <Row>
                        <p><b>Full Name:</b> {account.fullName}</p>
                    </Row>
                    <Row>
                        <p><b>Username:</b> {account.username}</p>
                    </Row>
                    <Row>
                        <p><b>Email:</b> {account.email}</p>
                    </Row>
                    <Row>
                        <p><b>Date of birth:</b> {account.dateOfBirth}</p>
                    </Row>
                    <Row>
                    {
                        role === "ADMIN" ? (
                            <p><b>Company:</b> {account.company}</p>
                        ) : role === "JOURNALIST" ? (
                            <p><b>Department:</b> {EnumConverter.formatEnumToText(account.department)}</p>
                        ) : role === "USER" ? (
                            <p><b>Bio:</b> {account.bio}</p>
                        ) : null
                    }
                    </Row>
            </Col>
        </Row>
        <Col className="text-center">
            <Container>
                <UpdateProfilePopup account={account}/>
                <UpdatePassword account={account}/>
                <DeleteProfilePopup/>
            </Container>
        </Col>
        </Container>
    );
}

export default ProfileSection;
