import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Bookmark } from "../App/Types";
import BookmarkModal from "../Modal/BookmarkModal";

function Header() {
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const closeModal = () => {
    setShowBookmarkModal(false);
  };

  const openModal = () => {
    setShowBookmarkModal(true);
  };

  const handleSubmit = (bookmark: Bookmark) => {
    alert(JSON.stringify(bookmark, null, 2));
  };

  return (
    <>
      <Row className="py-2" role="region" aria-label="toolbar">
        <Col>
          <Form>
            <Form.Check
              type="switch"
              id="openInNew"
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
          <Button variant="outline-secondary" size="sm" onClick={openModal}>
            New
          </Button>
        </Col>
      </Row>
      <BookmarkModal
        show={showBookmarkModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Header;
