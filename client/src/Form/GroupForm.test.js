import { fireEvent, render, screen, wait } from "@testing-library/react";
import React from "react";
import BookmarkService from "../Service/BookmarkService";
import sampleData from "../Service/__mocks__/data.json";
import { AppStore, StoreContext } from "../Store";
import GroupForm from "./GroupForm";

jest.mock("react-i18next");
jest.mock("../Service/BookmarkService");
const mockClose = jest.fn();

let appStore;
let groupModalStore;

beforeEach(() => {
  BookmarkService.mockClear();
  mockClose.mockClear();
  appStore = new AppStore();
  appStore.setData(sampleData.bookmarks, sampleData.groups);
  groupModalStore = appStore.groupModalStore;
});

test("new group with correct input", async () => {
  groupModalStore.open();
  render(
    <StoreContext.Provider value={appStore}>
      <GroupForm onClose={mockClose} />
    </StoreContext.Provider>
  );

  const groupCount = appStore.groups.length;
  const group = {
    name: "group name",
    column: 2,
    order: 3,
  };
  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  expect(nameTextbox).toBeInTheDocument();
  const leftRadio = screen.getByRole("radio", { name: "form.left" });
  expect(leftRadio).toBeInTheDocument();
  const rightRadio = screen.getByRole("radio", { name: "form.right" });
  expect(rightRadio).toBeInTheDocument();
  const orderCombobox = screen.getByRole("combobox", { name: "form.order" });
  expect(orderCombobox).toBeInTheDocument();
  const saveButton = screen.getByRole("button", { name: "button.save" });
  expect(saveButton).toBeInTheDocument();

  await wait(() => {
    fireEvent.change(nameTextbox, { target: { value: group.name } });
  });
  await wait(() => {
    fireEvent.click(rightRadio);
  });
  await wait(() => {
    fireEvent.change(orderCombobox, { target: { value: group.order } });
  });
  await wait(() => {
    fireEvent.click(saveButton);
  });

  expect(appStore.groups).toHaveLength(groupCount + 1);
  const newGroup = appStore.groups[groupCount];
  expect(newGroup.name).toBe(group.name);
  expect(newGroup.column).toBe(group.column);
  expect(newGroup.order).toBe(group.order);
  expect(mockClose).toHaveBeenCalledTimes(1);
});

test("new group with incorrect input", async () => {
  groupModalStore.open();
  render(
    <StoreContext.Provider value={appStore}>
      <GroupForm onClose={mockClose} />
    </StoreContext.Provider>
  );

  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  expect(nameTextbox).toBeInTheDocument();
  const nameError = screen.getByRole("alert", { name: "form.name" });
  expect(nameError).toBeInTheDocument();
  const saveButton = screen.getByRole("button", { name: "button.save" });
  expect(saveButton).toBeInTheDocument();

  expect(nameError).toBeEmpty();
  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(nameError).not.toBeEmpty();
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
    fireEvent.click(saveButton);
  });
  expect(mockClose).toHaveBeenCalledTimes(1);
});

test("edit group", async () => {
  const group = appStore.groups[0];
  groupModalStore.open(group.id);
  render(
    <StoreContext.Provider value={appStore}>
      <GroupForm onClose={mockClose} />
    </StoreContext.Provider>
  );

  const newGroup = {
    name: group.name + " new",
    column: group.column === 1 ? 2 : 1,
    order: group.order + 1,
  };

  const nameTextbox = screen.getByRole("textbox", { name: "form.name" });
  expect(nameTextbox).toBeInTheDocument();
  const nameError = screen.getByRole("alert", { name: "form.name" });
  expect(nameError).toBeInTheDocument();
  const saveButton = screen.getByRole("button", { name: "button.save" });
  expect(saveButton).toBeInTheDocument();
  const leftRadio = screen.getByRole("radio", { name: "form.left" });
  expect(leftRadio).toBeInTheDocument();
  const rightRadio = screen.getByRole("radio", { name: "form.right" });
  expect(rightRadio).toBeInTheDocument();
  const orderCombobox = screen.getByRole("combobox", { name: "form.order" });
  expect(orderCombobox).toBeInTheDocument();

  expect(nameTextbox.value).toBe(group.name);
  let columnRadio = group.column === 1 ? leftRadio : rightRadio;
  expect(columnRadio.checked).toBeTruthy();
  expect(
    screen.getByRole("option", { name: group.order.toString() }).selected
  ).toBeTruthy();

  await wait(() => {
    fireEvent.change(nameTextbox, { target: { value: newGroup.name } });
  });

  columnRadio = newGroup.column === 1 ? leftRadio : rightRadio;
  await wait(() => {
    fireEvent.click(columnRadio);
  });

  await wait(() => {
    fireEvent.change(orderCombobox, { target: { value: newGroup.order } });
  });

  await wait(() => {
    fireEvent.click(saveButton);
  });

  expect(group.name).toBe(newGroup.name);
  expect(group.column).toBe(newGroup.column);
  expect(group.order).toBe(newGroup.order);
  expect(mockClose).toHaveBeenCalledTimes(1);
});
