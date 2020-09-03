import BookmarkService from "../Service/BookmarkService";
import sampleData from "../__tests__/data.json";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";
import DeleteModalStore from "./DeleteModalStore";
import Group from "./Group";

const mockDelete = jest.fn();

jest.mock("../Service/BookmarkService", () => {
  return jest.fn().mockImplementation(() => {
    return {
      delete: mockDelete,
    };
  });
});

const testContext = {};

beforeEach(() => {
  BookmarkService.mockClear();
  mockDelete.mockClear();
  const appStore = new AppStore();
  appStore.setData(sampleData.bookmarks, sampleData.groups);
  const store = new DeleteModalStore();
  store.appStore = appStore;
  testContext.store = store;
});

test("initial state", () => {
  const store = new DeleteModalStore();
  store.appStore = new AppStore();
  const props = Object.getOwnPropertyNames(store);
  props.forEach((prop) => {
    expect(store[prop]).not.toBeUndefined();
  });
});

test("delete bookmark", async () => {
  const store = testContext.store;
  const bookmarkCount = store.appStore.bookmarks.length;
  store.open(Bookmark, "1");
  await store.delete();
  expect(store.appStore.bookmarks.length).toBe(bookmarkCount - 1);
});

test("delete group", async () => {
  const store = testContext.store;
  const count = store.appStore.groups.length;
  store.open(Group, "1");
  await store.delete();
  expect(store.appStore.groups.length).toBe(count - 1);
});
