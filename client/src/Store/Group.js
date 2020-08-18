import { computed, decorate, observable } from "mobx";
import type { GroupData } from "../Service/BookmarkService";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";

class Group {
  id: string;
  name: string;
  column: number;
  order: number;
  store: AppStore;

  constructor(group: GroupData, store: AppStore) {
    this.id = group.id;
    this.name = group.name;
    this.column = group.column;
    this.order = group.order;
    this.store = store;
  }

  get bookmarks(): Array<Bookmark> {
    return this.store.bookmarks.filter(
      (bookmark) => bookmark.groupId === this.id
    );
  }
}

decorate(Group, {
  id: observable,
  name: observable,
  column: observable,
  bookmarks: computed,
});

export default Group;
