import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi";

function Header() {
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
        <Button variant="outline-dark" size="sm" className="mr-1">
          Edit
        </Button>
        <Button variant="outline-dark" size="sm">
          New
        </Button>
      </Col>
    </Row>
  );
}

export default Header;
