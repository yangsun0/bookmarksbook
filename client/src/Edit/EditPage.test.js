import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import sampleData from "../Service/__mocks__/data.json";
import { StoreContext } from "../Store";
import AppStore from "../Store/AppStore";
import EditPage from "./EditPage";

jest.mock("react-i18next");

let store;

beforeEach(() => {
  store = new AppStore();
  store.setData(sampleData.bookmarks, sampleData.groups);
  render(
    <MemoryRouter>
      <StoreContext.Provider value={store}>
        <EditPage />
      </StoreContext.Provider>
    </MemoryRouter>
  );
});

test("renders edit page", () => {
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
    expect(screen.getByText(bookmark.name)).toBeInTheDocument();
    expect(screen.getByText(bookmark.url)).toBeInTheDocument();
  });
});

test("clicks edit button to show bookmark modal", () => {
  expect(screen.queryByRole("dialog", { name: "dialog.bookmark" })).toBeNull();
  fireEvent.click(screen.queryAllByRole("button", { name: "button.edit" })[1]);
  expect(
    screen.getByRole("dialog", { name: "dialog.bookmark" })
  ).toBeInTheDocument();
});

test("clicks edit button to show group modal", () => {
  expect(screen.queryByRole("dialog", { name: "dialog.group" })).toBeNull();
  fireEvent.click(screen.queryAllByRole("button", { name: "button.edit" })[0]);
  expect(
    screen.getByRole("dialog", { name: "dialog.group" })
  ).toBeInTheDocument();
});

test("clicks delete button to delete group", async () => {
  expect(screen.queryByRole("dialog", { name: "dialog.delete" })).toBeNull();
  fireEvent.click(
    screen.queryAllByRole("button", { name: "button.delete" })[0]
  );
  expect(
    screen.getByRole("dialog", { name: "dialog.deleteTitle" })
  ).toBeInTheDocument();
  const groupCount = store.groups.length;
  fireEvent.click(screen.getByRole("button", { name: "button.delete" }));
  expect(store.groups).toHaveLength(groupCount - 1);
});

test("clicks delete button to delete bookmark", async () => {
  expect(screen.queryByRole("dialog", { name: "dialog.delete" })).toBeNull();
  fireEvent.click(
    screen.queryAllByRole("button", { name: "button.delete" })[1]
  );
  expect(
    screen.getByRole("dialog", { name: "dialog.deleteTitle" })
  ).toBeInTheDocument();
  const count = store.bookmarks.length;
  fireEvent.click(screen.getByRole("button", { name: "button.delete" }));
  expect(store.bookmarks).toHaveLength(count - 1);
});
