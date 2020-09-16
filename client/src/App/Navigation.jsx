import { useObserver } from "mobx-react-lite";
import React from "react";
import {
  Button,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSignInStore } from "../Store/useStore";
function Navigation() {
  const { t } = useTranslation();
  const store = useSignInStore();

  const openSignInModal = () => {
    store.open();
  };

  const signOut = () => {
    store.signOut();
  };

  return useObserver(() => (
    <Navbar bg="dark" variant="dark" expand="md">
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
          {store.isSignedIn ? (
            <Dropdown>
              <Dropdown.Toggle variant="link">
                <Image className="profile" src={store.imageUrl} roundedCircle />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight>
                <Dropdown.Header>
                  <Image
                    className="profile mr-3"
                    src={store.imageUrl}
                    roundedCircle
                  />
                  <span>{store.name}</span>
                </Dropdown.Header>
                <Dropdown.Header>{store.email}</Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="1" onClick={signOut}>
                  {t("menu.signOut")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button variant="outline-light" onClick={openSignInModal}>
              {t("menu.signIn")}
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ));
}

export default Navigation;
