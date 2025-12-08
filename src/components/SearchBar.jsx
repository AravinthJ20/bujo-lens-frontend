import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = () => {
    onSearch(query);
  };

  return (
    <Row className="align-items-center">
      <Col md={8}>
        <Form.Control
          placeholder="Search tasks, notes, emotions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Col>

      <Col md={4}>
        <Button className="w-100" variant="dark" onClick={submit}>
          Search
        </Button>
      </Col>
    </Row>
  );
}

export default SearchBar;
