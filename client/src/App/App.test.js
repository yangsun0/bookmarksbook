import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("react-i18next");

test("renders App", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

test("clicks edit button to navigate to edit page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(history.location.pathname).toBe("/");
  fireEvent.click(screen.getByRole("link", { name: "button.edit" }));
  expect(history.location.pathname).toBe("/edit");
});
