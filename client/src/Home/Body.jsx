import React from "react";
import { Col, Row } from "react-bootstrap";
import type { Group } from "../Common/Types";
import BookMarkGroup from "./BookmarkGroup";

type Props = {
  groups: Group[],
};

function Body(props: Props) {
  const { groups } = props;
  const createGroup = (group) => {
    return <BookMarkGroup group={group} key={group.id} />;
  };
  const leftGroups = groups
    .filter((group) => group.column === 1)
    .map(createGroup);
  const rightGroups = groups
    .filter((group) => group.column === 2)
    .map(createGroup);

  return (
    <Row role="region" aria-label="bookmark groups">
      <Col sm>{leftGroups}</Col>
      <Col sm>{rightGroups}</Col>
    </Row>
  );
}

export default Body;
