import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import sampleData from "../FakeData/data.json";
import { AppStore, Bookmark, Group } from "../Store/AppStore";
import StoreContext from "../Store/StoreContext";
import HomePage from "./HomePage";

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
  expect(testContext.fetchMock.mock.calls.length).toBeGreaterThan(0);
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
