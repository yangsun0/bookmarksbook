import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function NewBookMarkModal() {
  return (
    <Modal.Dialog centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New bookmark</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={1}>
              Name
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter the bookmark name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={1}>
              URL
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter the URL" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={1}>
              Group
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter the group" />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">New</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default NewBookMarkModal;
