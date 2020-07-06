import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import type {
  ButtonClickHandler,
  Group,
  SaveBookmarkHandler,
  SaveGroupHandler,
} from "../App/Types";

type Props = {
  group: Group,
  onGroupEdit: SaveGroupHandler,
  onBookmarkEdit: SaveBookmarkHandler,
  onDelete: ButtonClickHandler,
};

function BookmarkGroup(props: Props) {
  const { group, onGroupEdit, onBookmarkEdit, onDelete } = props;
  const items = group.bookmarkList.map((bookmark) => (
    <ListGroup.Item key={bookmark.id} aria-label="bookmark">
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
          <Button
            variant="link"
            size="sm"
            onClick={() => onBookmarkEdit(bookmark)}
          >
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
    <Card className="mb-3" aria-label="bookmark group">
      <Card.Header>
        <Row>
          <Col>{group.name}</Col>
          <Col xs="auto">
            <Button variant="link" size="sm" onClick={() => onGroupEdit(group)}>
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
