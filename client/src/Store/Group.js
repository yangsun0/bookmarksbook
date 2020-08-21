import { computed, observable } from "mobx";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";

type GroupBody = {
  name: string,
  column: number,
  order: number,
};

class Group {
  id: string = "";
  @observable name: string = "";
  @observable column: number = 1;
  @observable order: number = 1;
  store: AppStore;

  @computed get bookmarks(): Array<Bookmark> {
    if (this.id) {
      return this.store.bookmarks.filter(
        (bookmark) => bookmark.groupId === this.id
      );
    } else {
      return [];
    }
  }

  static get props(): string[] {
    return ["name", "column", "order"];
  }
}

export default Group;
export type { GroupBody };
