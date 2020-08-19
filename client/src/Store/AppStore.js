import { action, computed, observable, runInAction } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import BookmarkService from "../Service/BookmarkService";
import Bookmark from "./Bookmark";
import type { BookmarkBody } from "./Bookmark";
import Group from "./Group";
import type { GroupBody } from "./Group";

const statusValues = {
  none: "none",
  done: "done",
  error: "error",
};

type Status = $Keys<typeof statusValues>;

function copyValues(source: Object, target: Object, props: string[]) {
  props.forEach((prop) => (target[prop] = source[prop]));
}

class AppStore {
  bookmarkService: BookmarkService = new BookmarkService();
  dataStatus: Status = statusValues.none;

  @observable groups: Array<Group> = [];
  @observable bookmarks: Array<Bookmark> = [];
  @observable isBookmarkModalShown: boolean = false;
  @observable currentBookmarkId: string = "";
  @observable isGroupModalShown: boolean = false;
  @observable currentGroupId: string = "";
  @observable isConfirmModalShown: boolean = false;

  @computed get leftGroups(): Array<Group> {
    return this.groups.filter((group) => group.column === 1);
  }

  @computed get rightGroups(): Array<Group> {
    return this.groups.filter((group) => group.column === 2);
  }

  @computed get currentBookmark(): Bookmark {
    let result = this.bookmarks.find((b) => b.id === this.currentBookmarkId);
    if (!result) {
      result = new Bookmark();
      // todo
      result.groupId = this.groups[0].id;
      result.store = this;
    }

    return result;
  }

  @computed get currentGroup(): Group {
    let result = this.groups.find((g) => g.id === this.currentGroupId);
    if (!result) {
      result = new Group();
      result.store = this;
    }

    return result;
  }

  @action async fetchData() {
    if (this.dataStatus === statusValues.done) {
      return;
    }

    const bookmarkEntities = await this.bookmarkService.getBookmarks();
    const groupsEntities = await this.bookmarkService.getGroups();
    runInAction(() => {
      this.bookmarks = bookmarkEntities.map((entity) =>
        this.createBookmark(entity)
      );
      this.groups = groupsEntities.map((entity) => this.createGroup(entity));
      this.dataStatus = statusValues.done;
    });
  }

  @action openBookmarkModal(id?: string) {
    this.currentBookmarkId = id ? id : "";
    this.isBookmarkModalShown = true;
  }

  @action closeBookmarkModal() {
    this.currentBookmarkId = "";
    this.isBookmarkModalShown = false;
  }

  @action openGroupModal(id?: string) {
    this.currentGroupId = id ? id : "";
    this.isGroupModalShown = true;
  }

  @action closeGroupModal() {
    this.currentGroupId = "";
    this.isGroupModalShown = false;
  }

  @action openConfirmModal() {
    this.isConfirmModalShown = true;
  }

  @action closeConfirmModal() {
    this.isConfirmModalShown = false;
  }

  @action saveBookmark(newBookmark: BookmarkBody) {
    const currentBookmark = this.currentBookmark;
    copyValues(newBookmark, currentBookmark, Bookmark.props);
    const data = {};
    copyValues(currentBookmark, data, Bookmark.props);
    if (this.currentBookmarkId) {
      this.bookmarkService.updateBookmark(this.currentBookmarkId, data);
    } else {
      this.bookmarkService.newBookmark(newBookmark);
    }
  }

  @action saveGroup(newGroup: GroupBody) {
    const currentGroup = this.currentGroup;
    copyValues(newGroup, currentGroup, Bookmark.props);
    const data = {};
    copyValues(currentGroup, data, Group.props);
    if (this.currentGroupId) {
      this.bookmarkService.updateGroup(this.currentGroupId, data);
    } else {
      this.bookmarkService.newGroup(newGroup);
    }
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
}

export default AppStore;
