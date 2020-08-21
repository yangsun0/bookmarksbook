import { action, computed, observable } from "mobx";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";
import type { BookmarkBody } from "./Bookmark";
import { copyFrom, toData } from "./copyUtility";

type Option = {
  value: string,
  label: string,
};

class BookmarkFormStore {
  appStore: AppStore;

  @observable isModalShown: boolean = false;
  @observable bookmarkId: string;
  @observable groupId: string;

  @computed get bookmark(): Bookmark {
    let result = this.appStore.bookmarks.find((b) => b.id === this.bookmarkId);
    if (!result) {
      result = new Bookmark();
      // todo
      result.groupId = this.appStore.groups[0].id;
      result.store = this.appStore;
    }

    return result;
  }

  @computed get orderOptions(): Array<Option> {
    const group = this.appStore.findGroup(this.groupId);
    let count = group.bookmarks.length;
    if (this.groupId !== this.bookmark.groupId) {
      count += 1;
    }

    const options = [];
    for (let i = 1; i <= count; i++) {
      options.push({
        label: i.toString(),
        value: i.toString(),
      });
    }
    return options;
  }

  @action openModal(id?: string) {
    this.bookmarkId = id ? id : "";
    this.groupId = this.bookmark.groupId;
    this.isModalShown = true;
  }

  @action closeModal() {
    this.bookmarkId = "";
    this.isModalShown = false;
  }

  @action changeGroup(groupId: string) {
    this.groupId = groupId;
    return this.groupId !== this.bookmark.groupId;
  }

  @action save(newBookmark: BookmarkBody) {
    copyFrom(this.bookmark, newBookmark);
    if (this.bookmarkId) {
      const data = toData(this.bookmark);
      this.appStore.bookmarkService.updateBookmark(this.bookmarkId, data);
    } else {
      this.appStore.bookmarkService.newBookmark(newBookmark);
    }
  }
}

export default BookmarkFormStore;
