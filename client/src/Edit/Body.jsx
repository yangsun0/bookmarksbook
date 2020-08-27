import { useObserver } from "mobx-react-lite";
import React from "react";
import { Col, Row } from "react-bootstrap";
import useStore from "../Store/useStore";
import BookmarkGroup from "./BookmarkGroup";

function Body() {
  const store = useStore();

  return useObserver(() => (
    <Row role="region" aria-label="bookmark groups">
      <Col sm>
        {store.leftGroups.map((group) => (
          <BookmarkGroup group={group} key={group.id} />
        ))}
      </Col>
      <Col sm>
        {store.rightGroups.map((group) => (
          <BookmarkGroup group={group} key={group.id} />
        ))}
      </Col>
    </Row>
  ));
}

export default Body;
