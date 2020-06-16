import React from "react";
import { Container } from "react-bootstrap";
import type { Group } from "../App/Types";
import Body from "./Body";
import Header from "./Header";

type Props = {
  groups: Group[],
};

function EditPage(props: Props) {
  return (
    <Container className="main-container">
      <Header />
      <Body groups={props.groups} />
    </Container>
  );
}

export default EditPage;
