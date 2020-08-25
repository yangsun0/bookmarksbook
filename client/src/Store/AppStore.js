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

const Status = {
  none: "none",
  done: "done",
  error: "error",
};

type StatusType = $Keys<typeof Status>;

class AppStore {
  bookmarkService: BookmarkService = new BookmarkService();
  dataStatus: StatusType = Status.none;
  bookmarkFormStore: BookmarkFormStore = new BookmarkFormStore();
  groupFormStore: GroupFormStore = new GroupFormStore();
  defaultGroup: Group = new Group();

  @observable groups: Array<Group> = [];
  @observable bookmarks: Array<Bookmark> = [];
  @observable isConfirmModalShown: boolean = false;

  constructor() {
    this.bookmarkFormStore.appStore = this;
    this.defaultGroup.store = this;
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

  @computed get firstGroup(): Group {
    return this.groups[0];
  }

  @action async fetchData() {
    if (this.dataStatus === Status.done) {
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

  findGroup(id: string): Group {
    let group = undefined;
    if (id) {
      group = this.groups.find((g) => g.id === id);
    }
    if (!group) {
      console.log("default group");
      group = this.defaultGroup;
    }

    return group;
  }
}

export default AppStore;
