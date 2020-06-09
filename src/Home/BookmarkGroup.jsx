import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function BookMarkGroup() {
  return (
    <Card className="bookmark-group">
      <Card.Header>Favorite</Card.Header>
      <ListGroup>
        <ListGroup.Item action href="https://www.google.com" target="_blank">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google icon"
            tooltip="Google icon"
            className="bookmark-image"
          />
          <span className="vertical-center">Google</span>
        </ListGroup.Item>
        <ListGroup.Item action href="https://mail.google.com">
          <img
            src="https://mail.google.com/favicon.ico"
            alt="Gmail icon"
            className="bookmark-image"
          />
          <span className="vertical-center">Gmail</span>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default BookMarkGroup;
