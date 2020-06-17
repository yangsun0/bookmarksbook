import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Row className="py-2">
      <Col>
        <Button variant="outline-secondary" size="sm" as={Link} to="/">
          &lt; Back
        </Button>
      </Col>
    </Row>
  );
}

export default Header;
