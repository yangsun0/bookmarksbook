import { computed, decorate, observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import type { BookmarkData } from "../Service/BookmarkService";
import AppStore from "./AppStore";
import Group from "./Group";

class Bookmark {
  id: string;
  name: string;
  url: string;
  iconUrl: string;
  order: number;
  groupId: string;
  store: AppStore;

  constructor(bookmark: BookmarkData, store: AppStore) {
    this.id = bookmark.id;
    this.name = bookmark.name;
    this.url = bookmark.url;
    this.iconUrl = bookmark.iconUrl;
    this.groupId = bookmark.groupId;
    this.order = bookmark.order;
    this.store = store;
  }

  get group(): Group | null {
    return this.store.groups.find((group) => group.id === this.groupId) ?? null;
  }

  toData(): BookmarkData {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      iconUrl: this.iconUrl,
      groupId: this.groupId,
      order: this.order,
    };
  }
}

decorate(Bookmark, {
  id: observable,
  name: observable,
  url: observable,
  iconUrl: observable,
  order: observable,
  group: computed,
});

export default Bookmark;
