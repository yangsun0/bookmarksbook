import React from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-1 py-2">
      <Container>
        <Row className="text-muted small">{t("app.copyright")}</Row>
      </Container>
    </footer>
  );
}

export default Footer;
