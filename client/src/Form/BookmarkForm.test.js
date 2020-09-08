import { fireEvent, render, screen, wait } from "@testing-library/react";
import React from "react";
import BookmarkService from "../Service/BookmarkService";
import sampleData from "../Service/__mocks__/data.json";
import { AppStore, StoreContext } from "../Store";
import BookmarkForm from "./BookmarkForm";

jest.mock("react-i18next");
jest.mock("../Service/BookmarkService");
const mockClose = jest.fn();

let appStore;
let bookmarkModalStore;

beforeEach(() => {
  BookmarkService.mockClear();
  mockClose.mockClear();
  appStore = new AppStore();
  appStore.setData(sampleData.bookmarks, sampleData.groups);
  bookmarkModalStore = appStore.bookmarkModalStore;
});

test("new bookmark with correct input", async () => {
  bookmarkModalStore.open();
  render(
    <StoreContext.Provider value={appStore}>
      <BookmarkForm onClose={mockClose} />
    </StoreContext.Provider>
  );
  const bookmarkCount = appStore.bookmarks.length;
  const bookmark = {
    name: "example",
    url: "https://example.com",
    groupId: "2",
    order: 2,
  };
  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  expect(nameTextbox).toBeInTheDocument();
  const urlTextbox = screen.getByRole("textbox", { name: "form.url" });
  expect(urlTextbox).toBeInTheDocument();
  const groupCombobox = screen.getByRole("combobox", { name: "form.group" });
  expect(groupCombobox).toBeInTheDocument();
  const orderCombobox = screen.getByRole("combobox", { name: "form.order" });
  expect(orderCombobox).toBeInTheDocument();
  const saveButton = screen.getByRole("button", { name: "button.save" });
  expect(saveButton).toBeInTheDocument();

  await wait(() => {
    fireEvent.change(nameTextbox, { target: { value: bookmark.name } });
  });
  await wait(() => {
    fireEvent.change(urlTextbox, { target: { value: bookmark.url } });
  });
  await wait(() => {
    fireEvent.change(groupCombobox, { target: { value: bookmark.groupId } });
  });
  await wait(() => {
    fireEvent.change(orderCombobox, { target: { value: bookmark.order } });
  });
  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(appStore.bookmarks).toHaveLength(bookmarkCount + 1);
  const newBookmark = appStore.bookmarks[bookmarkCount];
  expect(newBookmark.name).toBe(bookmark.name);
  expect(newBookmark.url).toBe(bookmark.url);
  expect(newBookmark.groupId).toBe(bookmark.groupId);
  expect(newBookmark.order).toBe(bookmark.order);
  expect(mockClose).toHaveBeenCalledTimes(1);
});

test("new bookmark with incorrect input", async () => {
  bookmarkModalStore.open();
  render(
    <StoreContext.Provider value={appStore}>
      <BookmarkForm onClose={mockClose} />
    </StoreContext.Provider>
  );
  const bookmarkCount = appStore.bookmarks.length;

  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  expect(nameTextbox).toBeInTheDocument();
  const urlTextbox = screen.getByRole("textbox", { name: "form.url" });
  expect(urlTextbox).toBeInTheDocument();
  const groupCombobox = screen.getByRole("combobox", { name: "form.group" });
  expect(groupCombobox).toBeInTheDocument();
  const orderCombobox = screen.getByRole("combobox", { name: "form.order" });
  expect(orderCombobox).toBeInTheDocument();
  const saveButton = screen.getByRole("button", { name: "button.save" });
  expect(saveButton).toBeInTheDocument();
  const nameError = screen.getByRole("alert", { name: "form.name" });
  expect(nameError).toBeInTheDocument();
  const urlError = screen.getByRole("alert", { name: "form.url" });
  expect(urlError).toBeInTheDocument();

  expect(nameError).toBeEmpty();
  expect(urlError).toBeEmpty();
  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(nameError).not.toBeEmpty();
  expect(urlError).not.toBeEmpty();
  expect(mockClose).not.toHaveBeenCalled();

  await wait(() => {
    fireEvent.change(nameTextbox, { target: { value: "a".repeat(51) } });
  });
  expect(nameError).not.toBeEmpty();

  await wait(() => {
    fireEvent.change(nameTextbox, { target: { value: "a".repeat(50) } });
  });
  expect(nameError).toBeEmpty();

  await wait(() => {
    fireEvent.change(urlTextbox, { target: { value: "a" } });
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
  expect(appStore.bookmarks).toHaveLength(bookmarkCount + 1);
  expect(mockClose).toHaveBeenCalledTimes(1);
});

test("edit bookmark", async () => {
  const bookmark = appStore.bookmarks[0];
  bookmarkModalStore.open(bookmark.id);
  render(
    <StoreContext.Provider value={appStore}>
      <BookmarkForm onClose={mockClose} />
    </StoreContext.Provider>
  );
  const bookmarkCount = appStore.bookmarks.length;
  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  expect(nameTextbox).toBeInTheDocument();
  const urlTextbox = screen.getByRole("textbox", { name: "form.url" });
  expect(urlTextbox).toBeInTheDocument();
  const groupCombobox = screen.getByRole("combobox", { name: "form.group" });
  expect(groupCombobox).toBeInTheDocument();
  const orderCombobox = screen.getByRole("combobox", { name: "form.order" });
  expect(orderCombobox).toBeInTheDocument();
  const saveButton = screen.getByRole("button", { name: "button.save" });
  expect(saveButton).toBeInTheDocument();

  expect(nameTextbox.value).toBe(bookmark.name);
  expect(urlTextbox.value).toBe(bookmark.url);
  const group = appStore.findGroup(bookmark.groupId);
  expect(
    screen.getByRole("option", { name: group.name }).selected
  ).toBeTruthy();
  expect(
    screen.getByRole("option", { name: bookmark.order.toString() }).selected
  ).toBeTruthy();

  const newBookmark = {
    name: bookmark.name + " new",
    url: bookmark.url + "/new",
    groupId: (parseInt(bookmark.groupId) + 1).toString(),
    order: bookmark.order + 1,
  };

  await wait(() => {
    fireEvent.change(nameTextbox, { target: { value: newBookmark.name } });
  });
  await wait(() => {
    fireEvent.change(urlTextbox, { target: { value: newBookmark.url } });
  });
  await wait(() => {
    fireEvent.change(groupCombobox, { target: { value: newBookmark.groupId } });
  });
  await wait(() => {
    fireEvent.change(orderCombobox, { target: { value: newBookmark.order } });
  });
  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(appStore.bookmarks).toHaveLength(bookmarkCount);
  expect(bookmark.name).toBe(newBookmark.name);
  expect(bookmark.url).toBe(newBookmark.url);
  expect(bookmark.groupId).toBe(newBookmark.groupId);
  expect(bookmark.order).toBe(newBookmark.order);

  expect(mockClose).toHaveBeenCalledTimes(1);
});

test("new bookmark without any group or bookmark", async () => {
  appStore.setData([], []);
  bookmarkModalStore.open();
  render(
    <StoreContext.Provider value={appStore}>
      <BookmarkForm onClose={mockClose} />
    </StoreContext.Provider>
  );
  const bookmark = {
    name: "example",
    url: "https://example.com",
    order: 1,
  };
  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  expect(nameTextbox).toBeInTheDocument();
  const urlTextbox = screen.getByRole("textbox", { name: "form.url" });
  expect(urlTextbox).toBeInTheDocument();
  const groupCombobox = screen.getByRole("combobox", { name: "form.group" });
  expect(groupCombobox).toBeInTheDocument();
  const orderCombobox = screen.getByRole("combobox", { name: "form.order" });
  expect(orderCombobox).toBeInTheDocument();
  const saveButton = screen.getByRole("button", { name: "button.save" });
  expect(saveButton).toBeInTheDocument();

  await wait(() => {
    fireEvent.change(nameTextbox, { target: { value: bookmark.name } });
  });
  await wait(() => {
    fireEvent.change(urlTextbox, { target: { value: bookmark.url } });
  });
  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(appStore.bookmarks).toHaveLength(1);
  expect(appStore.groups).toHaveLength(1);
  const newBookmark = appStore.bookmarks[0];
  expect(newBookmark.name).toBe(bookmark.name);
  expect(newBookmark.url).toBe(bookmark.url);
  expect(newBookmark.groupId).toBeTruthy();
  expect(newBookmark.order).toBe(bookmark.order);
  const newGroup = appStore.groups[0];
  expect(newGroup.id).toBeTruthy();
  expect(newGroup.name).toBeTruthy();
  expect(newGroup.column).toBeTruthy();
  expect(newGroup.order).toBeTruthy();
  expect(mockClose).toHaveBeenCalledTimes(1);
});
