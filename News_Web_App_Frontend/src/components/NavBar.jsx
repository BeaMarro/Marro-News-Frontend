import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image, NavDropdown } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import MiniLogo from "../assets/images/Marro_News_Logo_Mini.jpg";
import TokenManager from "../api/TokenManager";
import LogoutPopup from "./login-register/LogoutPopup";
import SearchIcon from "../assets/images/search.png";
import UserAPI from "../api/UserAPI";
import AdminAPI from "../api/AdminAPI";
import JournalistAPI from "../api/JournalistAPI";
import "../styles/NavBar.css";

function NavBar() {
  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const id = isLoggedIn ? TokenManager.getClaims().accountId : null;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const [search, setSearch] = useState('');
  
  const links = [
    {
      id: 1,
      path: "/breaking_news",
      text: <b>Breaking News</b>
    },
    {
      id: 2,
      path: "/art",
      text: "Art"
    },
    {
      id: 3,
      path: "/science",
      text: "Science"
    },
    {
      id: 4,
      path: "/politics",
      text: "Politics"
    },
    {
      id: 5,
      path: "/business_economics",
      text: "Business & Economics"
    },
    {
      id: 6,
      path: "/technology",
      text: "Technology"
    },
    {
      id: 7,
      path: "/health_wellness",
      text: "Health & Wellness"
    },
    {
      id: 8,
      path: "/government",
      text: "Government"
    },
    {
      id: 10,
      path: "/entertainment",
      text: "Entertainment"
    },
    {
      id: 11,
      path: "/sport",
      text: "Sport"
    },
    {
      id: 12,
      path: "/travel",
      text: "Travel"
    }
  ];

  const maxVisibleCategories = 7;

  const renderCategories = () => (
    links.slice(0, maxVisibleCategories).map(link => (
      <Nav.Link key={link.id} as={NavLink} to={`/articles${link.path}`} exact className="text-light">
        {link.text}
      </Nav.Link>
    ))
  );

  const renderMoreCategories = () => (
    <NavDropdown title="..." id="nav-dropdown-more" className="text-light">
      {links.slice(maxVisibleCategories).map(link => (
        <NavDropdown.Item key={link.id} as={NavLink} to={`/articles${link.path}`} className="text-dark">
          {link.text}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );

  const fetchAccount = async (id) => {
    try {
      let fetchedAccount = null;
      if (role === "ADMIN") {
        fetchedAccount = await AdminAPI.fetchAdminById(id);
      } else if (role === "JOURNALIST") {
        fetchedAccount = await JournalistAPI.fetchJournalistById(id);
      } else if (role === "USER") {
        fetchedAccount = await UserAPI.fetchUserById(id);
      } else {
        console.log("Invalid user type");
      }
      
      setAccount(fetchedAccount);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };


  const handleSearch = async () => {
      navigate(`/search/${search}`);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchAccount(id);
    }
  }, [isLoggedIn, id]);

  return (
    <Navbar bg="#19647E" data-bs-theme="dark" sticky="top" expand="lg" className="custom-navbar">
      <Navbar.Brand className="text-light" href="#">
        <Link to="/">
          <Image src={MiniLogo} alt="Marro News" className="mini-logo"/>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mr-auto">
          {renderCategories()}
          {renderMoreCategories()}
        </Nav>
        <Form inline className="d-flex">
          <FormControl type="search" placeholder="Search..." className="mr-sm-2 flex-grow-1" onChange={handleChange} />
          <Button variant="primary" type="submit" className="search-button" onClick={handleSearch}>
            <Image src={SearchIcon}/>
          </Button>
        </Form>
        {isLoggedIn ? (
          <Link to="/account">
            <Avatar alt={account.fullName} src={`data:image/png;base64,${account.profilePicture}`}/>
          </Link>
        ) : (
          <Link to="/account">
            <Avatar alt="" />
          </Link>
        )}
        {isLoggedIn && (
          <LogoutPopup />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
