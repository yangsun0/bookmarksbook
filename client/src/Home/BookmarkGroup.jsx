import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function BookmarkGroup({ name, bookmarkList }) {
  const items = bookmarkList.map((bookmark) => (
    <ListGroup.Item action href={bookmark.url} key={bookmark.id}>
      <img src={bookmark.iconUrl} alt="icon" className="bookmark-icon" />
      <span className="align-middle">{bookmark.name}</span>
    </ListGroup.Item>
  ));

  return (
    <Card className="bookmark-group">
      <Card.Header>{name}</Card.Header>
      <ListGroup>{items}</ListGroup>
    </Card>
  );
}

export default BookmarkGroup;
