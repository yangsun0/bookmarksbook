import React from "react";
import { Container } from "react-bootstrap";
import BookmarkModal from "../Modal/BookmarkModal";
import Body from "./Body";
import Header from "./Header";

function HomePage() {
  return (
    <>
      <Container>
        <Header />
        <Body />
      </Container>
      <BookmarkModal />
    </>
  );
}

export default HomePage;
