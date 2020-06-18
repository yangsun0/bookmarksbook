import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Bookmark</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavDropdown title="Default">
            <NavDropdown.Item active>Default</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>New Profile</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link>Sign-in</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
