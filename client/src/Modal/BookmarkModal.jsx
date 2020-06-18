import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import type { ButtonClickHandler } from "../App/Types";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
};
function BookmarkModal(props: Props) {
  const { show, onClose } = props;
  return (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={show}
      onHide={onClose}
      aria-label="bookmark modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Bookmark</Modal.Title>
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
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary">Done</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookmarkModal;
