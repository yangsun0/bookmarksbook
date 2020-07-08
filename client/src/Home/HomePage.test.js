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
  const groups = [generateGroup(), generateGroup("2")];
  render(<Body groups={groups} />);
  expect(
    screen.getAllByRole("region", { name: "bookmark group" })
  ).toHaveLength(groups.length);
});

test("renders single bookmark group", () => {
  const group = generateGroup();
  render(<BookmarkGroup group={group} />);
  expect(screen.getByRole("heading", { name: group.name })).toBeInTheDocument();
  expect(screen.getAllByRole("link")).toHaveLength(group.bookmarkList.length);
  expect(screen.getAllByRole("img")).toHaveLength(group.bookmarkList.length);
  const links = group.bookmarkList.map((b) =>
    expect.objectContaining({
      href: b.url + "/",
      text: b.name,
    })
  );
  expect(screen.getAllByRole("link")).toEqual(expect.arrayContaining(links));
});

test("clicks new button to show bookmark modal", () => {
  render(
    <MemoryRouter>
      <HomePage groups={[]} />
    </MemoryRouter>
  );
  expect(screen.queryByRole("dialog")).toBeNull();
  fireEvent.click(screen.getByText("New"));
  expect(screen.getByRole("dialog", { name: "Bookmark" })).toBeInTheDocument();
});
