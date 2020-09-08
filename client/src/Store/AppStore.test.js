import BookmarkService, { mockGetAll } from "../Service/BookmarkService";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";
import Group from "./Group";

jest.mock("../Service/BookmarkService");

beforeEach(() => {
  BookmarkService.mockClear();
  mockGetAll.mockClear();
});

test("initial state", () => {
  const appStore = new AppStore();
  const props = Object.getOwnPropertyNames(appStore);
  props.forEach((prop) => {
    expect(appStore[prop]).not.toBeUndefined();
  });
});

test("fetch data", async () => {
  const appStore = new AppStore();
  await appStore.fetchData();
  expect(mockGetAll).toHaveBeenCalledTimes(2);
  expect(appStore.bookmarks.length > 0).toBeTruthy();
  expect(appStore.groups.length > 0).toBeTruthy();
});

test("find bookmark", async () => {
  const appStore = new AppStore();
  const bookmark = new Bookmark();
  bookmark.id = "1";
  appStore.bookmarks.push(bookmark);
  const result = appStore.findBookmark("1");
  expect(result).toBe(bookmark);
});

test("find unknown bookmark id throw error", async () => {
  const appStore = new AppStore();
  const bookmark = new Bookmark();
  bookmark.id = "1";
  appStore.bookmarks.push(bookmark);
  expect(() => {
    appStore.findBookmark("2");
  }).toThrow();
});

test("find group", async () => {
  const appStore = new AppStore();
  const group = new Group();
  group.id = "1";
  appStore.groups.push(group);
  const result = appStore.findGroup("1");
  expect(result).toBe(group);
});

test("find unknown group id throw error", async () => {
  const appStore = new AppStore();
  const group = new Group();
  group.id = "1";
  appStore.groups.push(group);
  expect(() => {
    appStore.findGroup("2");
  }).toThrow();
});
