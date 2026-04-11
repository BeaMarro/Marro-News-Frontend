import React from "react";
import MainLinkButton from "../../MainLinkButton";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import DeleteFavouritesListItemPopup from "./DeleteFavouritesListItemPopup";

function FavouritesList({ articles }) {
    let content;

    if (articles.length > 0) {
        content = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Article</th>
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
                                <td><DeleteFavouritesListItemPopup articleId={article.id}/></td>
                            </tr>
                        ))}
                    </tbody>
            </Table>
        );
    } else {
        content = <div id="center">You currently do not have any items in your favourites list.<br/>To add items you can click on an article and it will appear here.</div>;
    }

    return (
        <div>
            <h2 id="center">Favourite Articles</h2>
            {content}
        </div>
    );
}

export default FavouritesList;
