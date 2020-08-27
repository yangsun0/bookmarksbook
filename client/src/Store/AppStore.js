import { action, computed, observable, runInAction } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import BookmarkService from "../Service/BookmarkService";
import BookmarkBody from "../Service/Data/BookmarkBody";
import GroupBody from "../Service/Data/GroupBody";
import Bookmark from "./Bookmark";
import BookmarkFormStore from "./BookmarkFormStore";
import { entityToStore } from "./copyUtility";
import Group from "./Group";
import GroupFormStore from "./GroupFormStore";
import Status from "./Status";
import type { StatusType } from "./Status";

class AppStore {
  bookmarkService: BookmarkService = new BookmarkService();
  dataStatus: StatusType = Status.none;
  bookmarkFormStore: BookmarkFormStore = new BookmarkFormStore();
  groupFormStore: GroupFormStore = new GroupFormStore();

  @observable groups: Array<Group> = [];
  @observable bookmarks: Array<Bookmark> = [];
  @observable isConfirmModalShown: boolean = false;

  constructor() {
    this.bookmarkFormStore.appStore = this;
    this.groupFormStore.appStore = this;
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
    if (this.dataStatus === Status.done || this.dataStatus === Status.pending) {
      return;
    }

    const bookmarksData = await this.bookmarkService.getAll(BookmarkBody);
    const groupsData = await this.bookmarkService.getAll(GroupBody);
    runInAction(() => {
      this.bookmarks = bookmarksData.map((data) => this.createBookmark(data));
      this.groups = groupsData.map((data) => this.createGroup(data));
      this.dataStatus = Status.done;
    });
  }

  @action openConfirmModal() {
    this.isConfirmModalShown = true;
  }

  @action closeConfirmModal() {
    this.isConfirmModalShown = false;
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
      throw Error("bookmarkId not found. id: " + this.bookmarkId);
    }

    return result;
  }

  findGroup(id: string): Group {
    const group = this.groups.find((group) => group.id === id);
    if (!group) {
      throw Error("group id not found." + this.groupId);
    }

    return group;
  }
}

export default AppStore;
