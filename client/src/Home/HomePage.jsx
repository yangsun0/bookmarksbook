import React from "react";
import { Container } from "react-bootstrap";
import type { Group } from "../Common/Types";
import Body from "./Body";
import Header from "./Header";

type Props = {
  groups: Group[],
};

function HomePage(props: Props) {
  return (
    <Container>
      <Header />
      <Body groups={props.groups} />
    </Container>
  );
}

export default HomePage;
