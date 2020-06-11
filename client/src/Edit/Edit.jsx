import React from "react";
import { Container } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";

function Edit(props) {
  let match = useRouteMatch({ path: "/edit", exact: true });
  if (!match) return null;

  return (
    <Container className="main-container">
      <Header />
      <Body groups={props.groups} />
    </Container>
  );
}

export default Edit;
