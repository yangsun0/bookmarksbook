import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookMarkGroup from "./BookmarkGroup";
import Header from "./Header";

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
    </Container>
  );
}

export default Body;
