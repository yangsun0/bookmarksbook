import { computed, observable } from "mobx";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";
import { preserve } from "./copyUtility";

class Group {
  id: string = "";
  store: AppStore;
  @observable @preserve name: string = "";
  @observable @preserve column: number = 1;
  @observable @preserve order: number = 1;

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
