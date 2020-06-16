import React from "react";
import { Col, Row } from "react-bootstrap";
import type { Group } from "../App/Types";
import BookMarkGroup from "./BookmarkGroup";

type Props = {
  groups: Group[],
};

function Body(props: Props) {
  const { groups } = props;
  const createGroup = (group) => {
    return <BookMarkGroup group={group} />;
  };
  const leftGroups = groups
    .filter((group) => group.column === 1)
    .map(createGroup);
  const rightGroups = groups
    .filter((group) => group.column === 2)
    .map(createGroup);

  return (
    <Row>
      <Col sm>{leftGroups}</Col>
      <Col sm>{rightGroups}</Col>
    </Row>
  );
}

export default Body;
