import { action, computed, decorate, observable, runInAction } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import BookmarkService from "../Service/BookmarkService";
import type { BookmarkGroupsData } from "../Service/BookmarkService";
import Bookmark from "./Bookmark";
import Group from "./Group";

const statusValues = {
  none: "none",
  done: "done",
  error: "error",
};

type Status = $Keys<typeof statusValues>;

class AppStore {
  bookmarkService: BookmarkService = new BookmarkService();
  groups: Array<Group> = [];
  bookmarks: Array<Bookmark> = [];
  status: string = "";
  isBookmarkModalShown: boolean = false;
  currentBookmarkId: string = "";
  isGroupModalShown: boolean = false;
  currentGroupId: string = "";
  isConfirmModalShown: boolean = false;
  bookmarkGroupsStatus: Status = statusValues.none;

  get leftGroups(): Array<Group> {
    return this.groups.filter((group) => group.column === 1);
  }

  get rightGroups(): Array<Group> {
    return this.groups.filter((group) => group.column === 2);
  }

  async fetchBookmarkGroups() {
    if (this.bookmarkGroupsStatus === statusValues.done) {
      return;
    }

    const bookmarkGroupData: BookmarkGroupsData = await this.bookmarkService.getBookmarkGroups();
    runInAction(() => {
      this.groups = bookmarkGroupData.groups.map(
        (group) => new Group(group, this)
      );
      this.bookmarks = bookmarkGroupData.bookmarks.map(
        (bookmark) => new Bookmark(bookmark, this)
      );
      this.bookmarkGroupsStatus = statusValues.done;
    });
  }

  get currentBookmark(): Bookmark {
    let result = new Bookmark(
      {
        id: "",
        name: "",
        url: "",
        iconUrl: "",
        groupId: "1",
        order: 1,
      },
      this
    );
    this.groups.forEach((g) => {
      g.bookmarks.forEach((b) => {
        if (b.id === this.currentBookmarkId) {
          result = b;
        }
      });
    });

    return result;
  }

  openBookmarkModal(id?: string) {
    this.currentBookmarkId = id ? id : "";
    this.isBookmarkModalShown = true;
  }

  closeBookmarkModal() {
    this.currentBookmarkId = "";
    this.isBookmarkModalShown = false;
  }

  get currentGroup(): Group {
    let result = this.groups.find((g) => g.id === this.currentGroupId);
    if (!result) {
      result = new Group(
        {
          id: "",
          name: "",
          column: 1,
          order: 1,
          bookmarks: [],
        },
        this
      );
    }

    return result;
  }

  openGroupModal(id?: string) {
    this.currentGroupId = id ? id : "";
    this.isGroupModalShown = true;
  }

  closeGroupModal() {
    this.currentGroupId = "";
    this.isGroupModalShown = false;
  }

  openConfirmModal() {
    this.isConfirmModalShown = true;
  }

  closeConfirmModal() {
    this.isConfirmModalShown = false;
  }
}

decorate(AppStore, {
  groups: observable,
  leftGroups: computed,
  rightGroups: computed,
  fetchBookmarkGroups: action,
  currentBookmarkId: observable,
  currentBookmark: computed,
  isBookmarkModalShown: observable,
  openBookmarkModal: action,
  closeBookmarkModal: action,
  currentGroupId: observable,
  currentGroup: computed,
  isGroupModalShown: observable,
  openGroupModal: action,
  closeGroupModal: action,
  isConfirmModalShown: observable,
  openConfirmModal: action,
  closeConfirmModal: action,
});

export default AppStore;
