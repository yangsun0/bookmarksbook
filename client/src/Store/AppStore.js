import { action, computed, observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import BookmarkService from "../Service/BookmarkService";
import BookmarkBody from "../Service/Data/BookmarkBody";
import GroupBody from "../Service/Data/GroupBody";
import Bookmark from "./Bookmark";
import BookmarkModalStore from "./BookmarkModalStore";
import { entityToStore } from "./dataTransfer";
import DeleteStore from "./DeleteModalStore";
import Group from "./Group";
import GroupModalStore from "./GroupModalStore";
import SignInStore from "./SignInStore";
import type { StatusType } from "./Status";
import Status from "./Status";

class AppStore {
  bookmarkModalStore: BookmarkModalStore = new BookmarkModalStore();
  groupModalStore: GroupModalStore = new GroupModalStore();
  deleteStore: DeleteStore = new DeleteStore();
  signInStore: SignInStore = new SignInStore();

  bookmarkService: BookmarkService = new BookmarkService();
  dataStatus: StatusType = Status.none;

  @observable isDataFetched = false;
  @observable bookmarks: Array<Bookmark> = [];
  @observable groups: Array<Group> = [];

  constructor() {
    this.bookmarkModalStore.appStore = this;
    this.groupModalStore.appStore = this;
    this.deleteStore.appStore = this;
    this.signInStore.appStore = this;
  }

  @computed get leftGroups(): Array<Group> {
    return this.groups
      .filter((group) => group.column === 1)
      .sort(Group.compareByOrder);
  }

  @computed get rightGroups(): Array<Group> {
    return this.groups
      .filter((group) => group.column === 2)
      .sort(Group.compareByOrder);
  }

  @action async fetchData() {
    if (this.dataStatus === Status.pending) {
      return;
    }

    const bookmarksData = await this.bookmarkService.getAll(BookmarkBody);
    const groupsData = await this.bookmarkService.getAll(GroupBody);
    this.setData(bookmarksData, groupsData);
  }

  @action setData(bookmarksData: Array<Bookmark>, groupsData: Array<Group>) {
    this.bookmarks = bookmarksData.map((data) => this.createBookmark(data));
    this.groups = groupsData.map((data) => this.createGroup(data));
    this.dataStatus = Status.done;
    this.isDataFetched = true;
  }

  createBookmark(data: Object): Bookmark {
    const bookmark = new Bookmark();
    entityToStore(data, bookmark);
    bookmark.store = this;
    return bookmark;
  }

  createGroup(data: Object): Group {
    const group = new Group();
    entityToStore(data, group);
    group.store = this;
    return group;
  }

  findBookmark(id: string): Bookmark {
    const result = this.bookmarks.find((bookmark) => bookmark.id === id);
    if (!result) {
      throw Error("bookmark id not found. id: " + id);
    }

    return result;
  }

  findGroup(id: string): Group {
    const group = this.groups.find((group) => group.id === id);
    if (!group) {
      throw Error("group id not found. id: " + id);
    }

    return group;
  }
}

export default AppStore;
