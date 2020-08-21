import { action, computed, observable, runInAction } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import BookmarkService from "../Service/BookmarkService";
import Bookmark from "./Bookmark";
import BookmarkFormStore from "./BookmarkFormStore";
import Group from "./Group";
import GroupFormStore from "./GroupFormStore";

const Status = {
  none: "none",
  done: "done",
  error: "error",
};

type StatusType = $Keys<typeof Status>;

function copyValues(source: Object, target: Object, props: string[]) {
  props.forEach((prop) => (target[prop] = source[prop]));
}

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
    return this.groups.filter((group) => group.column === 1);
  }

  @computed get rightGroups(): Array<Group> {
    return this.groups.filter((group) => group.column === 2);
  }

  @action async fetchData() {
    if (this.dataStatus === Status.done) {
      return;
    }

    const bookmarkEntities = await this.bookmarkService.getBookmarks();
    const groupsEntities = await this.bookmarkService.getGroups();
    runInAction(() => {
      this.bookmarks = bookmarkEntities.map((entity) =>
        this.createBookmark(entity)
      );
      this.groups = groupsEntities.map((entity) => this.createGroup(entity));
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
    bookmark.id = data.id;
    copyValues(data, bookmark, Bookmark.props);
    bookmark.store = this;
    return bookmark;
  }

  createGroup(data: Object): Group {
    const group = new Group();
    group.id = data.id;
    copyValues(data, group, Group.props);
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
