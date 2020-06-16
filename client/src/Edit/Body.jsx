import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { Group } from "../App/Types";
import BookmarkGroupModal from "../Modal/BookmarkGroupModal";
import BookmarkModal from "../Modal/BookmarkModal";
import ConfirmModal from "../Modal/ConfirmModal";
import BookmarkGroup from "./BookmarkGroup";
type Props = {
  groups: Group[],
};

function Body(props: Props) {
  const { groups } = props;
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openGroupModal = () => {
    setShowGroupModal(true);
  };

  const closeGroupModal = () => {
    setShowGroupModal(false);
  };

  const openBookmarkModal = () => {
    setShowBookmarkModal(true);
  };

  const closeBookmarkModal = () => {
    setShowBookmarkModal(false);
  };

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const createGroup = (group) => {
    return (
      <BookmarkGroup
        key={group.id}
        group={group}
        onGroupEdit={openGroupModal}
        onBookmarkEdit={openBookmarkModal}
        onDelete={openConfirmModal}
      />
    );
  };

  const leftGroups = groups
    .filter((group) => group.column === 1)
    .map(createGroup);
  const rightGroups = groups
    .filter((group) => group.column === 2)
    .map(createGroup);

  return (
    <>
      <Row>
        <Col sm>{leftGroups}</Col>
        <Col sm>{rightGroups}</Col>
      </Row>
      <BookmarkGroupModal show={showGroupModal} onClose={closeGroupModal} />
      <BookmarkModal show={showBookmarkModal} onClose={closeBookmarkModal} />
      <ConfirmModal show={showConfirmModal} onClose={closeConfirmModal} />
    </>
  );
}

export default Body;
