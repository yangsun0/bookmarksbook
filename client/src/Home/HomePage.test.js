import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Body from "./Body";
import BookmarkGroup from "./BookmarkGroup";
import HomePage from "./HomePage";

test("renders home page", () => {
  render(
    <MemoryRouter>
      <HomePage groups={[]} />
    </MemoryRouter>
  );
  expect(screen.getByLabelText("toolbar")).toBeInTheDocument();
  expect(screen.getByLabelText("bookmark groups")).toBeInTheDocument();
});

function generateGroup(id = 1) {
  return {
    id: id,
    name: "group name",
    column: 1,
    bookmarkList: [
      {
        id: 1,
        name: "bookmark 1 name",
        url: "bookmark 1 url",
        iconUrl: "bookmark icon url",
      },
      {
        id: 2,
        name: "bookmark 2 name",
        url: "bookmark 2 url",
        iconUrl: "bookmark 2 icon url",
      },
    ],
  };
}

test("renders bookmark groups", () => {
  const groups = [generateGroup(), generateGroup(2)];
  render(<Body groups={groups} />);
  expect(screen.getAllByLabelText("bookmark group")).toHaveLength(
    groups.length
  );
});

test("renders single bookmark group", () => {
  const group = generateGroup();
  render(<BookmarkGroup group={group} />);
  expect(screen.getByText(group.name)).toBeInTheDocument();
  expect(screen.getAllByLabelText("bookmark")).toHaveLength(
    group.bookmarkList.length
  );
  expect(screen.getAllByRole("link")).toHaveLength(group.bookmarkList.length);
  expect(screen.getAllByRole("img")).toHaveLength(group.bookmarkList.length);
  group.bookmarkList.forEach((bookmark) => {
    expect(screen.getByText(bookmark.name)).toBeInTheDocument();
  });
});

test("clicks new button to show bookmark modal", () => {
  render(
    <MemoryRouter>
      <HomePage groups={[]} />
    </MemoryRouter>
  );
  expect(screen.queryByLabelText("bookmark modal")).toBeNull();
  fireEvent.click(screen.getByText("New"));
  expect(screen.getByLabelText("bookmark modal")).toBeInTheDocument();
});
