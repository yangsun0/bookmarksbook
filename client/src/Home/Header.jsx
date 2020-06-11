import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header({ onNew }) {
  return (
    <Row className="main-header">
      <Col>
        <Form>
          <Form.Check
            type="switch"
            id="openInNew2"
            inline
            className="align-middle child-cursor-pointer"
          >
            <Form.Check.Input />
            <Form.Check.Label>
              <span className="d-none d-sm-block">Open in new tab</span>
            </Form.Check.Label>
          </Form.Check>
          <FiExternalLink />
        </Form>
      </Col>
      <Col xs="auto">
        <Button
          variant="outline-secondary"
          size="sm"
          className="mr-2"
          as={Link}
          to="/edit"
        >
          Edit
        </Button>
        <Button variant="outline-secondary" size="sm" onClick={onNew}>
          New
        </Button>
      </Col>
    </Row>
  );
}

export default Header;
