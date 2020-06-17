import React from "react";
import { Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-gray-1 py-2">
      <Container>
        <Row className="text-muted small">
          <span className="mr-2">&copy; 2020 Copyright:</span>
          <span>Bookmark - LcodeJ</span>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
