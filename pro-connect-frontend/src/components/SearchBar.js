import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const SearchBar = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
      />
    </InputGroup>
  );
};

export default SearchBar;