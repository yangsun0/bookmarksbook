import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { StoreContext } from "../Store";
import { setupStoreContext } from "../test/storeHelper";
import HomePage from "./HomePage";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let testContext = {};
beforeEach(() => {
  const storeContext = setupStoreContext();
  testContext.store = storeContext.store;
  testContext.fetchMock = storeContext.fetchMock;
  render(
    <MemoryRouter>
      <StoreContext.Provider value={testContext.store}>
        <HomePage />
      </StoreContext.Provider>
    </MemoryRouter>
  );
});

test("renders home page", () => {
  expect(screen.getByRole("toolbar")).toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: "bookmark groups" })
  ).toBeInTheDocument();
  expect(testContext.fetchMock).toHaveBeenCalledTimes(1);
  testContext.store.groups.forEach((group) => {
    expect(
      screen.getByRole("heading", { name: group.name })
    ).toBeInTheDocument();
    group.bookmarks.forEach((bookmark) => {
      expect(
        screen.getByRole("link", { name: "icon " + bookmark.name })
      ).toBeInTheDocument();
    });
  });
});

test("clicks new button to show bookmark modal", () => {
  expect(screen.queryByRole("dialog")).toBeNull();
  fireEvent.click(screen.getByText("button.new"));
  expect(
    screen.getByRole("dialog", { name: "dialog.bookmark" })
  ).toBeInTheDocument();
});
