import { fireEvent, render, screen, wait } from "@testing-library/react";
import React from "react";
import { StoreContext } from "../Store";
import { setupStoreContext } from "../test/storeHelper";
import BookmarkGroupForm from "./GroupForm";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let testContext = {};

beforeEach(() => {
  const storeContext = setupStoreContext();
  testContext.store = storeContext.store;
  testContext.saveGroup = storeContext.saveGroup;
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
    name: "group name",
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
