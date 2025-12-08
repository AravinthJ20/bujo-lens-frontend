import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Home() {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-4 fw-bold mb-3">Bullet Journal Companion</h1>
          <p className="lead mb-4">
            Scan your handwritten journal pages and instantly turn them into digital tasks, notes, and insights.
          </p>

          <Button href="/scan" size="lg" variant="primary" className="me-3">
            📸 Scan a Page
          </Button>

          <Button href="/search" size="lg" variant="outline-dark">
            🔍 Search Entries
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
