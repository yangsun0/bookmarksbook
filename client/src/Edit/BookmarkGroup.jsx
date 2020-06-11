import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";

function BookmarkGroup({
  name,
  bookmarkList,
  onGroupEdit,
  onBookmarkEdit,
  onDelete,
}) {
  const items = bookmarkList.map((bookmark) => (
    <ListGroup.Item key={bookmark.id}>
      <Row>
        <Col>
          <img src={bookmark.iconUrl} alt="icon" className="bookmark-icon" />
          <span className="align-middle">{bookmark.name}</span>
        </Col>
        <Col xs="auto">
          <Button variant="link" size="sm" onClick={onBookmarkEdit}>
            Edit
          </Button>
          <Button variant="link" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="small">{bookmark.url}</span>
        </Col>
      </Row>
    </ListGroup.Item>
  ));

  return (
    <Card className="bookmark-group">
      <Card.Header>
        <Row>
          <Col>{name}</Col>
          <Col xs="auto">
            <Button variant="link" size="sm" onClick={onGroupEdit}>
              Edit
            </Button>
            <Button variant="link" size="sm" onClick={onDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <ListGroup>{items}</ListGroup>
    </Card>
  );
}

export default BookmarkGroup;
