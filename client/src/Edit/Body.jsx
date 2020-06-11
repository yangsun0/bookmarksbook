import React from "react";
import { Row, Col } from "react-bootstrap";
import EditBookmarkGroup from "./EditBookmarkGroup";

function Body({ groups }) {
  const leftGroups = groups
    .filter((group) => group.column === 1)
    .map((group) => <EditBookmarkGroup {...group} />);
  const rightGroups = groups
    .filter((group) => group.column === 2)
    .map((group) => <EditBookmarkGroup {...group} />);
  return (
    <Row>
      <Col sm>{leftGroups}</Col>
      <Col sm>{rightGroups}</Col>
    </Row>
  );
}

export default Body;
