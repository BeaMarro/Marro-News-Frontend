import React from "react";
import MainLinkButton from "../MainLinkButton";
import Table from 'react-bootstrap/Table';
import DeleteArticlePopup from "./DeleteArticlePopup";
import UpdateArticleForm from "./UpdateArticleForm";
import { Container, Alert } from "react-bootstrap"; // Import Alert from react-bootstrap
import EnumConverter from "../utilities/EnumConverter";
import ApprovalStatusLbl from "./ApprovalStatusLbl";

function ArticlesTable({ title, articles }) {
  return (
    <div>
      <h2>{title}</h2>

      {articles.length === 0 ? (
        <Alert variant="info">You have not written any articles yet. When you add some, they will be displayed here.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Article</th>
              <th>Publish Date</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
                <td>{article.heading}</td>
                <Container className="justify-content-start">
                  <MainLinkButton title="View Article" link={`/article/${article.id}`} />
                </Container>
                <td>{article.publishDate}</td>
                <td>{EnumConverter.formatEnumToText(article.genre)}</td>
                <td><ApprovalStatusLbl status={article.status} /></td>
                <DeleteArticlePopup articleId={article.id} />
                <UpdateArticleForm article={article} />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ArticlesTable;
