import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../styles/AccountNavigationTabs.css";

function JournalistAccountNavigationBar({ activePathIndex }) {
    const links = [
        {
            title: "Account",
            path: "/account",
        },
        {
            title: "Articles",
            path: "/manage-articles",
        },
    ];

    return (
        <Nav variant="pills" defaultActiveKey={links[activePathIndex].path} className="my-2 ml-2 sticky-nav">
            {links.map((link, index) => (
                <Nav.Item key={index}>
                    <Nav.Link as={NavLink} to={link.path}>
                        {link.title}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
}

export default JournalistAccountNavigationBar;
