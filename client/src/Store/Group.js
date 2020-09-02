import { computed, observable } from "mobx";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";
import { transferable } from "./dataTransfer";

class Group {
  id: string = "";
  store: AppStore;
  @observable @transferable name: string = "";
  @observable @transferable column: number = 1;
  @observable @transferable order: number = 1;

  @computed get bookmarks(): Array<Bookmark> {
    return this.store.bookmarks
      .filter((bookmark) => bookmark.groupId === this.id)
      .sort(Bookmark.compareByOrder);
  }

  static compareByOrder(left: Group, right: Group) {
    return left.order - right.order;
  }
}

export default Group;
