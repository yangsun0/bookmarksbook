import BookmarkService, {
  mockNew,
  mockUpdate,
} from "../Service/BookmarkService";
import AppStore from "./AppStore";
import BookmarkFormStore from "./BookmarkFormStore";

jest.mock("../Service/BookmarkService");

let store;

beforeEach(() => {
  BookmarkService.mockClear();
  mockNew.mockClear();
  mockUpdate.mockClear();
  const appStore = new AppStore();
  appStore.fetchData();
  store = new BookmarkFormStore();
  store.appStore = appStore;
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
  const bookmarkCount = store.appStore.bookmarks.length;
  store.init();
  const form = store.toBookmarkFormValues();
  await store.save(form);
  expect(mockNew).toHaveBeenCalledTimes(1);
  expect(store.appStore.bookmarks).toHaveLength(bookmarkCount + 1);
  expect(store.appStore.bookmarks[bookmarkCount].id).toBeTruthy();
});

test("update bookmark", async () => {
  const bookmarkCount = store.appStore.bookmarks.length;
  store.init(store.appStore.bookmarks[0].id);
  const form = store.toBookmarkFormValues();
  await store.save(form);
  expect(mockUpdate).toHaveBeenCalledTimes(1);
  expect(store.appStore.bookmarks).toHaveLength(bookmarkCount);
});

test("new bookmark without group", async () => {
  store.appStore.setData([], []);
  store.init();
  const form = store.toBookmarkFormValues();
  await store.save(form);
  expect(mockNew).toHaveBeenCalledTimes(2);
  expect(store.appStore.bookmarks).toHaveLength(1);
  expect(store.appStore.groups).toHaveLength(1);
  expect(store.appStore.bookmarks[0].id).toBeTruthy();
  expect(store.appStore.bookmarks[0].groupId).toBeTruthy();
  expect(store.appStore.groups[0].id).toBeTruthy();
  expect(store.appStore.groups[0].name).toBeTruthy();
});
