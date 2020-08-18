import { fireEvent, render, screen, wait } from "@testing-library/react";
import React from "react";
import sampleData from "../FakeData/data.json";
import { AppStore, Bookmark, Group, StoreContext } from "../Store";
import BookmarkForm from "./BookmarkForm";

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
  appStore.currentBookmarkId = "";
  testContext.store = appStore;
  const onClose = jest.fn();
  testContext.onClose = onClose;
});

test("new bookmark with correct input", async () => {
  render(
    <StoreContext.Provider value={testContext.store}>
      <BookmarkForm onClose={testContext.onClose} />
    </StoreContext.Provider>
  );
  const bookmark = {
    name: "example",
    url: "https://example.com",
    order: 1,
    group: "1",
  };
  expect(screen.getByRole("alert", { name: "form.name" })).toBeEmpty();
  expect(screen.getByRole("alert", { name: "form.url" })).toBeEmpty();

  await wait(() => {
    fireEvent.change(screen.getByRole("textbox", { name: "form.name" }), {
      target: { value: bookmark.name },
    });
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("textbox", { name: "form.url" }), {
      target: { value: bookmark.url },
    });
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("combobox", { name: "form.order" }), {
      target: { value: bookmark.order },
    });
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("combobox", { name: "form.group" }), {
      target: { value: bookmark.group },
    });
  });
  await wait(() => {
    fireEvent.click(screen.getByRole("button", { name: "button.save" }));
  });
  expect(testContext.onClose).toHaveBeenCalledTimes(1);
});

test("new bookmark with incorrect input", async () => {
  render(
    <StoreContext.Provider value={testContext.store}>
      <BookmarkForm onClose={testContext.onClose} />
    </StoreContext.Provider>
  );

  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  const nameError = screen.getByRole("alert", { name: "form.name" });
  const urlTextbox = screen.getByRole("textbox", { name: "form.url" });
  const urlError = screen.getByRole("alert", { name: "form.url" });
  const saveButton = screen.getByRole("button", { name: "button.save" });

  expect(nameError).toBeEmpty();
  expect(urlError).toBeEmpty();

  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(testContext.onClose).toHaveBeenCalledTimes(0);
  expect(nameError).not.toBeEmpty();
  expect(urlError).not.toBeEmpty();

  await wait(() => {
    fireEvent.change(nameTextbox, {
      target: { value: "a".repeat(51) },
    });
  });
  expect(nameError).not.toBeEmpty();

  await wait(() => {
    fireEvent.change(nameTextbox, {
      target: { value: "a".repeat(50) },
    });
  });
  expect(nameError).toBeEmpty();

  await wait(() => {
    fireEvent.change(urlTextbox, {
      target: { value: "a" },
    });
  });
  expect(urlError).not.toBeEmpty();

  await wait(() => {
    fireEvent.change(urlTextbox, {
      target: { value: "http://www.example.com" },
    });
  });
  expect(urlError).toBeEmpty();

  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(testContext.onClose).toHaveBeenCalledTimes(1);
});

test("edit bookmark", () => {
  const bookmark = testContext.store.groups[0].bookmarks[0];
  testContext.store.currentBookmarkId = bookmark.id;
  render(
    <StoreContext.Provider value={testContext.store}>
      <BookmarkForm onClose={testContext.onClose} />
    </StoreContext.Provider>
  );

  expect(screen.getByRole("textbox", { name: "form.name" }).value).toBe(
    bookmark.name
  );
  expect(screen.getByRole("textbox", { name: "form.url" }).value).toBe(
    bookmark.url
  );
  expect(
    screen.getByRole("option", { name: "Favorite" }).selected
  ).toBeTruthy();
  expect(screen.getByRole("option", { name: "1" }).selected).toBeTruthy();
});
