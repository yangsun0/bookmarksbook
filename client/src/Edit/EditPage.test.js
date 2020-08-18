import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import sampleData from "../FakeData/data.json";
import { AppStore, Bookmark, Group } from "../Store/AppStore";
import StoreContext from "../Store/StoreContext";
import EditPage from "./EditPage";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let testContext = {};

beforeEach(() => {
  const bookmarkGroupData = sampleData.bookmarkGroups;
  const appStore = new AppStore();
  appStore.groups = bookmarkGroupData.groups.map(
    (group) => new Group(group, appStore)
  );
  appStore.bookmarks = bookmarkGroupData.bookmarks.map(
    (bookmark) => new Bookmark(bookmark, appStore)
  );
  const fetchMock = jest.fn();
  AppStore.prototype.fetchBookmarkGroups = fetchMock;
  testContext.store = appStore;
  testContext.fetchMock = fetchMock;
  render(
    <MemoryRouter>
      <StoreContext.Provider value={appStore}>
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
  // expect(testContext.fetchMock.mock.calls.length).toBeGreaterThan(0);
  expect(testContext.fetchMock).toHaveBeenCalledTimes(1);
  testContext.store.groups.forEach((group) => {
    expect(
      screen.getByRole("heading", { name: group.name })
    ).toBeInTheDocument();
    group.bookmarks.forEach((bookmark) => {
      expect(screen.getByText(bookmark.name)).toBeInTheDocument();
      expect(screen.getByText(bookmark.url)).toBeInTheDocument();
    });
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

test("clicks delete button to show confirm modal", () => {
  expect(screen.queryByRole("dialog", { name: "dialog.confirm" })).toBeNull();
  fireEvent.click(
    screen.queryAllByRole("button", { name: "button.delete" })[0]
  );
  expect(
    screen.getByRole("dialog", { name: "dialog.confirm" })
  ).toBeInTheDocument();
});
