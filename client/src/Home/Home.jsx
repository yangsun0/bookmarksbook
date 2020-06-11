import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Body from "./Body";
import Header from "./Header";
import "./Home.scss";
import BookmarkModal from "./BookmarkModal";

function Home(props) {
  const match = useRouteMatch({ path: "/", exact: true });
  const [showNewBookmarkModal, setShowNewBookmarkModal] = useState(false);
  const closeModal = () => {
    setShowNewBookmarkModal(false);
  };

  const openModal = () => {
    setShowNewBookmarkModal(true);
  };

  if (!match) return null;

  return (
    <>
      <Container className="main-container">
        <Header onNew={openModal} />
        <Body groups={props.groups} />
      </Container>
      <BookmarkModal show={showNewBookmarkModal} onClose={closeModal} />
    </>
  );
}

export default Home;
