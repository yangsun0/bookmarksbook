import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi";

function Header() {
  return (
    <Row className="main-header">
      <Col>
        <Form>
          <Form.Check
            type="checkbox"
            id="openInNew"
            label="Open link in new window"
            inline
            className="vertical-center child-cursor-pointer"
          />
          <FiExternalLink />
        </Form>
      </Col>
      <Col md="auto" className="d-sm-none d-none d-md-block">
        <Button variant="outline-dark" className="hidden-sm hidden-xs">
          Edit
        </Button>{" "}
        <Button variant="outline-dark" className="hidden-sm hidden-xs">
          New
        </Button>
      </Col>
    </Row>
  );
}

export default Header;
