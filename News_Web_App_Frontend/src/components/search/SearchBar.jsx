import React from "react";
import { Form, FormControl, Button, Image, Container } from "react-bootstrap";
import SearchIcon from "../../assets/images/search.png";
import "../../styles/SearchBar.css";

function SearchBar({ handleChange, handleSearch }) {
  return (
    <div className="search-bar">
        <Form inline className="d-flex">
        <FormControl
            type="search"
            placeholder="Search..."
            className="search-text"
            onChange={handleChange}
        />
        <Button variant="primary" type="submit" className="search-button" onClick={handleSearch}>
            <Image src={SearchIcon} />
        </Button>
        </Form>
    </div>
  );
}

export default SearchBar;
