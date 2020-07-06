import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { Bookmark, Group } from "../App/Types";
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
  const initial: Bookmark = {};
  const [bookmark, setBookmark] = useState(initial);
  const initial2: Group = {};
  const [group, setGroup] = useState(initial2);

  const openGroupModal = (group: Group) => {
    setGroup(group);
    setShowGroupModal(true);
  };

  const closeGroupModal = () => {
    setShowGroupModal(false);
  };

  const openBookmarkModal = (bookmark: Bookmark) => {
    setBookmark(bookmark);
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
  const saveBookmark = (bookmark: Bookmark) => {
    alert(JSON.stringify(bookmark, null, 2));
  };

  const saveGroup = (group: Group) => {
    alert(JSON.stringify(group, null, 2));
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
      <Row aria-label="bookmark groups">
        <Col sm>{leftGroups}</Col>
        <Col sm>{rightGroups}</Col>
      </Row>
      <BookmarkGroupModal
        show={showGroupModal}
        onClose={closeGroupModal}
        onSave={saveGroup}
        data={group}
      />
      <BookmarkModal
        show={showBookmarkModal}
        onClose={closeBookmarkModal}
        onSave={saveBookmark}
        data={bookmark}
      />
      <ConfirmModal show={showConfirmModal} onClose={closeConfirmModal} />
    </>
  );
}

export default Body;
