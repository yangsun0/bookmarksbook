import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Navigation() {
  const { t } = useTranslation();

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>{t("app.brand")}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavDropdown title={t("menu.default")}>
            <NavDropdown.Item active>{t("menu.default")}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>{t("menu.new")}</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link>{t("menu.signIn")}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
