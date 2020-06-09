import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookMarkGroup from "./BookmarkGroup";
import Header from "./Header";
import EditBookmarkGroup from "./EditBookmarkGroup";

function Body() {
  return (
    <Container className="main-container">
      <Header />
      <Row>
        <Col sm>
          <BookMarkGroup />
          <BookMarkGroup />
          <BookMarkGroup />
        </Col>
        <Col sm>
          <BookMarkGroup />
          <BookMarkGroup />
        </Col>
      </Row>
      <Row>
        <Col sm>
          <EditBookmarkGroup />
        </Col>
        <Col sm></Col>
      </Row>
    </Container>
  );
}

export default Body;
