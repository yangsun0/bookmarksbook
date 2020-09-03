import BookmarkService from "../Service/BookmarkService";
import sampleData from "../__tests__/data.json";
import AppStore from "./AppStore";
import BookmarkFormStore from "./BookmarkFormStore";

const mockNew = jest.fn();
const mockUpdate = jest.fn();

jest.mock("../Service/BookmarkService", () => {
  return jest.fn().mockImplementation(() => {
    return {
      new: mockNew,
      update: mockUpdate,
    };
  });
});

const testContext = {};

beforeEach(() => {
  BookmarkService.mockClear();
  mockNew.mockClear();
  mockUpdate.mockClear();
  const appStore = new AppStore();
  appStore.setData(sampleData.bookmarks, sampleData.groups);
  const bookmarkFormStore = new BookmarkFormStore();
  bookmarkFormStore.appStore = appStore;
  testContext.store = bookmarkFormStore;
});

test("initial state", () => {
  const bookmarkFormStore = new BookmarkFormStore();
  bookmarkFormStore.appStore = new AppStore();
  const props = Object.getOwnPropertyNames(bookmarkFormStore);
  props.forEach((prop) => {
    expect(bookmarkFormStore[prop]).not.toBeUndefined();
  });
});

test("new bookmark", async () => {
  const id = "new_id";
  mockNew.mockImplementation(() => {
    return { id: id };
  });
  const store = testContext.store;
  const bookmarkCount = store.appStore.bookmarks.length;
  store.init();
  const form = store.toBookmarkFormValues();
  await store.save(form);
  expect(mockNew).toHaveBeenCalledTimes(1);
  expect(store.appStore.bookmarks).toHaveLength(bookmarkCount + 1);
  expect(store.appStore.bookmarks[bookmarkCount].id).toBe(id);
});

test("update bookmark", async () => {
  const store = testContext.store;
  const bookmarkCount = store.appStore.bookmarks.length;
  store.init(store.appStore.bookmarks[0].id);
  const form = store.toBookmarkFormValues();
  await store.save(form);
  expect(mockUpdate).toHaveBeenCalledTimes(1);
  expect(store.appStore.bookmarks).toHaveLength(bookmarkCount);
});

test("new bookmark without group", async () => {
  const id = "new_id";
  mockNew.mockImplementation(() => {
    return { id: id };
  });

  const store = testContext.store;
  store.appStore.setData([], []);
  store.init();
  const form = store.toBookmarkFormValues();
  await store.save(form);
  expect(mockNew).toHaveBeenCalledTimes(2);
  expect(store.appStore.bookmarks).toHaveLength(1);
  expect(store.appStore.groups).toHaveLength(1);
  expect(store.appStore.bookmarks[0].id).toBe(id);
  expect(store.appStore.bookmarks[0].groupId).toBe(id);
  expect(store.appStore.groups[0].id).toBe(id);
});
