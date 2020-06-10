import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function EditBookmarkModal() {
  return (
    <Modal.Dialog centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New bookmark</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column md={2} lg={1}>
              Name
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter the bookmark name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column md={2} lg={1}>
              URL
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter the URL" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column md={2} lg={1}>
              Group
            </Form.Label>
            <Col>
              <Form.Control as="select">
                <option>Favorite</option>
                <option>Read later</option>
              </Form.Control>
            </Col>
            <Col xs="auto">
              <Button variant="link">New</Button>
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

export default EditBookmarkModal;
