import React from "react";
import { Card, ListGroup, Button, Row, Col } from "react-bootstrap";

function EditBookmarkGroup() {
  return (
    <Card className="bookmark-group">
      <Card.Header>
        <Row>
          <Col>Favorite</Col>
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
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col>
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google icon"
                tooltip="Google icon"
                className="bookmark-icon"
              />
              <span className="align-middle">Google</span>
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
          <Row>
            <Col>
              <span className="small" href="https://www.google.com">
                https://www.google.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <img
                src="https://mail.google.com/favicon.ico"
                alt="Gmail icon"
                className="bookmark-icon"
              />
              <span className="align-middle">Gmail</span>
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
          <Row>
            <Col>
              <span className="small" href="https://www.google.com">
                https://www.google.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default EditBookmarkGroup;
