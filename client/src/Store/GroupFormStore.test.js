import BookmarkService, {
  mockNew,
  mockUpdate,
} from "../Service/BookmarkService";
import AppStore from "./AppStore";
import GroupFormStore from "./GroupFormStore";

jest.mock("../Service/BookmarkService");

let store;

beforeEach(() => {
  BookmarkService.mockClear();
  mockNew.mockClear();
  mockUpdate.mockClear();
  const appStore = new AppStore();
  appStore.fetchData();
  store = new GroupFormStore();
  store.appStore = appStore;
});

test("initial state", () => {
  const groupFormStore = new GroupFormStore();
  groupFormStore.appStore = new AppStore();
  const props = Object.getOwnPropertyNames(groupFormStore);
  props.forEach((prop) => {
    expect(groupFormStore[prop]).not.toBeUndefined();
  });
});

test("new group", async () => {
  const groupCount = store.appStore.groups.length;
  store.init();
  const form = store.toGroupFormValues();
  await store.save(form);
  expect(mockNew).toHaveBeenCalledTimes(1);
  expect(store.appStore.groups).toHaveLength(groupCount + 1);
  expect(store.appStore.groups[groupCount].id).toBeTruthy();
});

test("update group", async () => {
  const groupCount = store.appStore.groups.length;
  store.init(store.appStore.groups[0].id);
  const form = store.toGroupFormValues();
  await store.save(form);
  expect(mockUpdate).toHaveBeenCalledTimes(1);
  expect(store.appStore.groups).toHaveLength(groupCount);
});
