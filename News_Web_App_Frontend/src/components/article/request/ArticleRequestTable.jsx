import React from "react";
import MainLinkButton from "../../MainLinkButton";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import ApproveArticlePopup from "./ApproveArticlePopup";
import DisapproveArticlePopup from "./DisapproveArticlePopup";
import EnumConverter from "../../utilities/EnumConverter";

function ArticleRequestTable({ title, articles }) {
    let content;

    if (articles.length > 0) {
        content = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Article</th>
                        <th>Last Modified</th>
                        <th>Genre</th>
                        <th>Journalist</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {articles.map((article, index) => (
                            <tr key={index}>
                                <td>{article.heading}</td>
                                <Container className="justify-content-start">
                                    <MainLinkButton title="View Article" link={`/article/${article.id}`}/>
                                </Container>
                                <td>{article.publishDate}</td>
                                <td>{EnumConverter.formatEnumToText(article.genre)}</td>

                                <td>
                                    <Link to="#" onClick={(e) => {
                                        window.location.href = `mailto:${article.author.email}`;
                                        e.preventDefault();
                                    }}>
                                        {article.author.fullName}
                                    </Link>
                                </td>

                                <ApproveArticlePopup articleId={article.id}/>
                                <DisapproveArticlePopup articleId={article.id}/>
                            </tr>
                        ))}
                    </tbody>
            </Table>
        );
    } else {
        content = <div>There are currently no pending articles.</div>;
    }
    
    return (
    <div>
        <h2>{title}</h2>
        <h2>Pending Articles</h2>
        {content}
    </div>
  );
}

export default ArticleRequestTable;
