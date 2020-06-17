import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import type { ButtonClickHandler, Group } from "../App/Types";

type Props = {
  group: Group,
  onGroupEdit: ButtonClickHandler,
  onBookmarkEdit: ButtonClickHandler,
  onDelete: ButtonClickHandler,
};

function BookmarkGroup(props: Props) {
  const { group, onGroupEdit, onBookmarkEdit, onDelete } = props;
  const items = group.bookmarkList.map((bookmark) => (
    <ListGroup.Item key={bookmark.id}>
      <Row>
        <Col>
          <img
            src={bookmark.iconUrl}
            alt="icon"
            className="bookmark-icon mr-2"
          />
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
          <span className="small text-secondary">{bookmark.url}</span>
        </Col>
      </Row>
    </ListGroup.Item>
  ));

  return (
    <Card className="mb-3">
      <Card.Header>
        <Row>
          <Col>{group.name}</Col>
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
