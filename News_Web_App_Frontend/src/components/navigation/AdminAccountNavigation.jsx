import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../styles/AccountNavigationTabs.css";

function AdminAccountNavigation({activePathIndex}) {
    const links = [
        {
            "title": "Account",
            "path": "/account"
        },
        {
            "title": "Journalists",
            "path": "/journalists"
        },
        {
            "title": "Performance Statistics",
            "path": "/performance-statistics"
        },
        {
            "title": "Approval Requests",
            "path": "/approval-requests"
        }
    ];

    return (
        <Nav variant="pills" defaultActiveKey={links[activePathIndex].path} className="my-2 ml-2">
            {links.map(link => {
            return (
            <Nav.Item>
                <Nav.Link as={NavLink} to={link.path}>
                    {link.title}
                </Nav.Link>
            </Nav.Item>
            )
            })}
        </Nav>
        );
}

export default AdminAccountNavigation;
