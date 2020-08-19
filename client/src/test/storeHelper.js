import sampleData from "../FakeData/data.json";
import { AppStore } from "../Store";

function setupStoreContext() {
  const appStore = new AppStore();
  appStore.bookmarks = sampleData.bookmarks.map((data) =>
    appStore.createBookmark(data)
  );
  appStore.groups = sampleData.groups.map((entity) =>
    appStore.createGroup(entity)
  );
  const fetchMock = jest.fn();
  AppStore.prototype.fetchData = fetchMock;
  const testContext = {};
  testContext.store = appStore;
  testContext.fetchMock = fetchMock;
  const saveBookmarkMock = jest.fn();
  AppStore.prototype.saveBookmark = saveBookmarkMock;
  testContext.saveBookmark = saveBookmarkMock;
  return testContext;
}

export { setupStoreContext };
