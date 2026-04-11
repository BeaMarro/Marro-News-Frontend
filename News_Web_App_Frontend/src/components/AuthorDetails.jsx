import React from "react";
import { Container } from "react-bootstrap";
import "../styles/ArticleDetails.css";
import EnumConverter from "./utilities/EnumConverter";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function ArticleDetails({ author, genre }) {
  return (
    <Container className="d-flex" id="profile-container">
      <Link to={`/journalist/${author.id}`} className="profile-link">
        <Avatar alt={author.fullName} src={`data:image/png;base64,${author.profilePicture}`} className="profile" />
      </Link>
      <Container className="article-details">
        <p className="author-name">
          <Link to={`/journalist/${author.id}`} className="author-link">
            <i>Written by <b>{author.fullName}</b></i>
          </Link>
        </p>
        <p className="genre">{EnumConverter.formatEnumToText(genre)}</p>
      </Container>
    </Container>
  );
}

export default ArticleDetails;
