import { useObserver } from "mobx-react-lite";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import type { Group } from "../Store";

type Props = {
  group: Group,
};

function BookmarkGroup(props: Props) {
  const { group } = props;

  return useObserver(() => (
    <Card className="mb-3" role="region" aria-label="bookmark group">
      <Card.Header role="heading" aria-level="2">
        {group.name}
      </Card.Header>
      <ListGroup>
        {group.bookmarks.map((bookmark) => (
          <ListGroup.Item action href={bookmark.url} key={bookmark.id}>
            <img
              src={bookmark.iconUrl}
              alt="icon"
              className="bookmark-icon mr-2"
            />
            <span className="align-middle">{bookmark.name}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  ));
}

export default BookmarkGroup;
