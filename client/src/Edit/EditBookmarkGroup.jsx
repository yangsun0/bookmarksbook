import React from "react";
import { Card, ListGroup, Button, Row, Col } from "react-bootstrap";

function EditBookmarkGroup({ name, bookmarkList }) {
  const items = bookmarkList.map((bookmark) => (
    <ListGroup.Item action href={bookmark.url} key={bookmark.id}>
      <Row>
        <Col>
          <img src={bookmark.iconUrl} alt="icon" className="bookmark-icon" />
          <span className="align-middle">{bookmark.name}</span>
        </Col>
        <Col xs="auto">
          <Button variant="link" size="sm">
            Edit
          </Button>
          <Button variant="link" size="sm">
            Delete
          </Button>
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
            <Button variant="link" size="sm">
              Edit
            </Button>
            <Button variant="link" size="sm">
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <ListGroup>{items}</ListGroup>
    </Card>
  );
}

export default EditBookmarkGroup;
