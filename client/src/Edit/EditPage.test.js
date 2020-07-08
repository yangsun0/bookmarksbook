import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Body from "./Body";
import BookmarkGroup from "./BookmarkGroup";
import EditPage from "./EditPage";

test("renders edit page", () => {
  render(
    <MemoryRouter>
      <EditPage groups={[]} />
    </MemoryRouter>
  );
  expect(screen.getByRole("toolbar")).toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: "bookmark groups" })
  ).toBeInTheDocument();
});

function generateGroup(id = "1") {
  return {
    id: id,
    name: "group name",
    column: 1,
    bookmarkList: [
      {
        id: "1",
        name: "bookmark 1 name",
        url: "http://bookmar1.com",
        iconUrl: "http://bookmar1.com/favicon",
      },
      {
        id: "2",
        name: "bookmark 2 name",
        url: "http://bookmar2.com",
        iconUrl: "http://bookmar2.com/favicon",
      },
    ],
  };
}

test("renders bookmark groups", () => {
  const groups = [generateGroup(), generateGroup(2)];
  render(<Body groups={groups} />);
  expect(
    screen.getAllByRole("region", { name: "bookmark group" })
  ).toHaveLength(groups.length);
});

test("renders single bookmark group", () => {
  const group = generateGroup();
  render(<BookmarkGroup group={group} />);
  expect(screen.getByRole("heading", { name: group.name })).toBeInTheDocument();
  expect(screen.queryAllByRole("img")).toHaveLength(group.bookmarkList.length);
  group.bookmarkList.forEach((bookmark) => {
    expect(screen.getByText(bookmark.name)).toBeInTheDocument();
    expect(screen.getByText(bookmark.url)).toBeInTheDocument();
  });
});

test("clicks edit button to show bookmark modal", () => {
  const groups = [generateGroup()];
  render(
    <MemoryRouter>
      <Body groups={groups} />
    </MemoryRouter>
  );
  expect(screen.queryByRole("dialog", { name: "Bookmark" })).toBeNull();
  fireEvent.click(screen.queryAllByRole("button", { name: "Edit" })[1]);
  expect(screen.getByRole("dialog", { name: "Bookmark" })).toBeInTheDocument();
});

test("clicks edit button to show group modal", () => {
  const groups = [generateGroup()];
  render(
    <MemoryRouter>
      <Body groups={groups} />
    </MemoryRouter>
  );

  expect(screen.queryByRole("dialog", { name: "Group" })).toBeNull();
  fireEvent.click(screen.queryAllByRole("button", { name: "Edit" })[0]);
  expect(screen.getByRole("dialog", { name: "Group" })).toBeInTheDocument();
});

test("clicks delete button to show confirm modal", () => {
  const groups = [generateGroup()];
  render(
    <MemoryRouter>
      <Body groups={groups} />
    </MemoryRouter>
  );
  expect(screen.queryByRole("dialog", { name: "Confirm" })).toBeNull();
  fireEvent.click(screen.queryAllByRole("button", { name: "Delete" })[0]);
  expect(screen.getByRole("dialog", { name: "Confirm" })).toBeInTheDocument();
});
