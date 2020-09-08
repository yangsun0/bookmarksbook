import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import sampleData from "../Service/__mocks__/data.json";
import { StoreContext } from "../Store";
import AppStore from "../Store/AppStore";
import HomePage from "./HomePage";

jest.mock("react-i18next");

let store;
beforeEach(() => {
  store = new AppStore();
  store.setData(sampleData.bookmarks, sampleData.groups);
  render(
    <MemoryRouter>
      <StoreContext.Provider value={store}>
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
  sampleData.groups.forEach((group) => {
    expect(
      screen.getByRole("heading", { name: group.name })
    ).toBeInTheDocument();
  });
  sampleData.bookmarks.forEach((bookmark) => {
    expect(
      screen.getByRole("link", { name: "icon " + bookmark.name })
    ).toBeInTheDocument();
  });
});

test("clicks new button to show bookmark modal", () => {
  expect(screen.queryByRole("dialog")).toBeNull();
  fireEvent.click(screen.getByText("button.new"));
  expect(
    screen.getByRole("dialog", { name: "dialog.bookmark" })
  ).toBeInTheDocument();
});
