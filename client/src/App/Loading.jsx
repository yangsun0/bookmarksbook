import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useStore from "../Store/useStore";

type Props = {
  children: React.Node,
};

function Loading(props: Props) {
  const { children } = props;
  const { t } = useTranslation();

  const store = useStore();
  return useObserver(() =>
    store.isDataFetched ? (
      children
    ) : (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto" className="mt-2">
            <Spinner animation="border">
              <span className="sr-only">{t("app.loading")}</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    )
  );
}

export default Loading;
