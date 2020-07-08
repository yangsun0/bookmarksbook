import { fireEvent, render, screen, wait } from "@testing-library/react";
import React from "react";
import BookmarkGroupForm from "./BookmarkGroupForm";

test("submit valid group", async () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  const group = {
    id: "",
    name: "bookmark name",
    column: 2,
    order: 2,
    bookmarkList: [],
  };
  render(<BookmarkGroupForm onClose={onClose} onSubmit={onSubmit} />);
  expect(screen.getByRole("alert", { name: "Name" })).toBeEmpty();

  await wait(() => {
    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: group.name },
    });
  });
  await wait(() => {
    fireEvent.click(screen.getByRole("radio", { name: "right" }));
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("combobox", { name: "Order" }), {
      target: { value: group.order },
    });
  });
  await wait(() => {
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
  });

  expect(onSubmit).toHaveBeenCalledWith(group);
});

test("submit invalid group", async () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  render(<BookmarkGroupForm onClose={onClose} onSubmit={onSubmit} />);

  const nameTextbox = screen.getByRole("textbox", { name: "Name" });
  const nameError = screen.getByRole("alert", { name: "Name" });
  const saveButton = screen.getByRole("button", { name: "Save" });

  expect(nameError).toBeEmpty();

  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(onSubmit).toHaveBeenCalledTimes(0);
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
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test("edit group", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  const group = {
    id: "",
    name: "bookmark name",
    column: 1,
    order: 1,
  };
  render(
    <BookmarkGroupForm onClose={onClose} onSubmit={onSubmit} data={group} />
  );
  expect(screen.getByRole("textbox", { name: "Name" }).value).toBe(group.name);
  expect(
    screen
      .getAllByRole("radio")
      .find((e) => e.value === group.column.toString()).checked
  ).toBeTruthy();
  expect(screen.getByRole("option", { name: "1" }).selected).toBeTruthy();
});
