import { fireEvent, render, screen, wait } from "@testing-library/react";
import React from "react";
import sampleData from "../FakeData/data.json";
import { AppStore, Bookmark, Group, StoreContext } from "../Store";
import BookmarkGroupForm from "./BookmarkGroupForm";

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
  appStore.currentGroupId = "";
  testContext.store = appStore;
  const onClose = jest.fn();
  testContext.onClose = onClose;
});

test("new group with correct input", async () => {
  render(
    <StoreContext.Provider value={testContext.store}>
      <BookmarkGroupForm onClose={testContext.onClose} />
    </StoreContext.Provider>
  );

  const group = {
    id: "",
    name: "bookmark name",
    column: 2,
    order: 2,
  };

  expect(screen.getByRole("alert", { name: "form.name" })).toBeEmpty();

  await wait(() => {
    fireEvent.change(screen.getByRole("textbox", { name: "form.name" }), {
      target: { value: group.name },
    });
  });
  await wait(() => {
    fireEvent.click(screen.getByRole("radio", { name: "right" }));
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("combobox", { name: "form.order" }), {
      target: { value: group.order },
    });
  });
  await wait(() => {
    fireEvent.click(screen.getByRole("button", { name: "button.save" }));
  });

  expect(testContext.onClose).toHaveBeenCalledTimes(1);
});

test("new group with incorrect input", async () => {
  render(
    <StoreContext.Provider value={testContext.store}>
      <BookmarkGroupForm onClose={testContext.onClose} />
    </StoreContext.Provider>
  );

  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  const nameError = screen.getByRole("alert", { name: "form.name" });
  const saveButton = screen.getByRole("button", { name: "button.save" });

  expect(nameError).toBeEmpty();

  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(testContext.onClose).toHaveBeenCalledTimes(0);
  expect(nameError).not.toBeEmpty();

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
    fireEvent.click(saveButton);
  });
  expect(testContext.onClose).toHaveBeenCalledTimes(1);
});

test("edit group", () => {
  const group = testContext.store.groups[0];
  testContext.store.currentGroupId = group.id;
  render(
    <StoreContext.Provider value={testContext.store}>
      <BookmarkGroupForm onClose={testContext.onClose} />
    </StoreContext.Provider>
  );
  expect(screen.getByRole("textbox", { name: "form.name" }).value).toBe(
    group.name
  );
  expect(
    screen
      .getAllByRole("radio")
      .find((e) => e.value === group.column.toString()).checked
  ).toBeTruthy();
  expect(screen.getByRole("option", { name: "1" }).selected).toBeTruthy();
});
