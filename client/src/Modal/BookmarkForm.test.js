import { fireEvent, render, screen, wait } from "@testing-library/react";
import React from "react";
import BookmarkForm from "./BookmarkForm";

test("submit valid bookmark", async () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  const bookmark = {
    id: "",
    group: "2",
    iconUrl: "https://www.example.com/favicon",
    order: 2,
    name: "bookmark name",
    url: "https://www.example.com",
  };
  render(<BookmarkForm onClose={onClose} onSubmit={onSubmit} />);
  expect(screen.getByRole("alert", { name: "Name" })).toBeEmpty();
  expect(screen.getByRole("alert", { name: "URL" })).toBeEmpty();

  await wait(() => {
    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: bookmark.name },
    });
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("textbox", { name: "URL" }), {
      target: { value: bookmark.url },
    });
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("combobox", { name: "Order" }), {
      target: { value: bookmark.order },
    });
  });
  await wait(() => {
    fireEvent.change(screen.getByRole("combobox", { name: "Group" }), {
      target: { value: bookmark.group },
    });
  });
  await wait(() => {
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
  });
  expect(onSubmit).toHaveBeenCalledWith(bookmark);
});

test("submit invalid bookmark", async () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  render(<BookmarkForm onClose={onClose} onSubmit={onSubmit} />);

  const nameTextbox = screen.getByRole("textbox", { name: "Name" });
  const nameError = screen.getByRole("alert", { name: "Name" });
  const urlTextbox = screen.getByRole("textbox", { name: "URL" });
  const urlError = screen.getByRole("alert", { name: "URL" });
  const saveButton = screen.getByRole("button", { name: "Save" });

  expect(nameError).toBeEmpty();
  expect(urlError).toBeEmpty();

  await wait(() => {
    fireEvent.click(saveButton);
  });
  expect(onSubmit).toHaveBeenCalledTimes(0);
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
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test("edit bookmark", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  const bookmark = {
    id: "",
    group: "1",
    iconUrl: "https://www.example.com/favicon",
    order: 1,
    name: "bookmark name",
    url: "https://www.example.com",
  };
  render(
    <BookmarkForm onClose={onClose} onSubmit={onSubmit} data={bookmark} />
  );
  expect(screen.getByRole("textbox", { name: "Name" }).value).toBe(
    bookmark.name
  );
  expect(screen.getByRole("textbox", { name: "URL" }).value).toBe(bookmark.url);
  expect(
    screen.getByRole("option", { name: "Favorite" }).selected
  ).toBeTruthy();
  expect(screen.getByRole("option", { name: "1" }).selected).toBeTruthy();
});
