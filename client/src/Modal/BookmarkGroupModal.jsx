import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

function BookmarkGroupModal({ show, onClose }) {
  return (
    <Modal centered size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bookmark group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column md={2} lg={1}>
              Name
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter the bookmark group name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="align-items-center">
            <Form.Label column md={2} lg={1}>
              Side
            </Form.Label>
            <Col>
              <Form.Check type="radio" inline label="left" id="side-left" />
              <Form.Check type="radio" inline label="right" id="side-right" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column md={2} lg={1}>
              Order
            </Form.Label>
            <Col>
              <Form.Control as="select" className="w-25">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookmarkGroupModal;
