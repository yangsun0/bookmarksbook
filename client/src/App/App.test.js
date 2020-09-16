import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router";
import { MemoryRouter } from "react-router-dom";
import sampleData from "../Service/__mocks__/data.json";
import { StoreContext } from "../Store";
import AppStore from "../Store/AppStore";
import App from "./App";

jest.mock("react-i18next");

let store;
beforeEach(() => {
  store = new AppStore();
  store.setData(sampleData.bookmarks, sampleData.groups);
});

test("renders App", () => {
  render(
    <MemoryRouter>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
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
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Router>
  );
  expect(history.location.pathname).toBe("/");
  fireEvent.click(screen.getByRole("link", { name: "button.edit" }));
  expect(history.location.pathname).toBe("/edit");
});

test("show loading when data is not ready.", () => {
  store.isDataFetched = false;
  render(
    <MemoryRouter>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </MemoryRouter>
  );
  expect(screen.getByText("app.loading")).toBeInTheDocument();
});
