import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import useStore from "../Store/useStore";
import BookMarkGroup from "./BookmarkGroup";

function Body() {
  const store = useStore();

  useEffect(() => {
    store.fetchBookmarkGroups();
  }, [store]);

  const createGroup = (group) => {
    return <BookMarkGroup group={group} key={group.id} />;
  };

  return useObserver(() => (
    <Row role="region" aria-label="bookmark groups">
      <Col sm>{store.leftGroups.map(createGroup)}</Col>
      <Col sm>{store.rightGroups.map(createGroup)}</Col>
    </Row>
  ));
}

export default Body;
