import { computed, decorate, observable } from "mobx";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";

type GroupBody = {
  name: string,
  column: number,
  order: number,
};

class Group {
  id: string = "";
  name: string = "";
  column: number = 1;
  order: number = 1;
  store: AppStore;

  get bookmarks(): Array<Bookmark> {
    return this.store.bookmarks.filter(
      (bookmark) => bookmark.groupId === this.id
    );
  }

  static get props(): string[] {
    return ["name", "column", "order"];
  }
}

decorate(Group, {
  id: observable,
  name: observable,
  column: observable,
  bookmarks: computed,
});

export default Group;
export type { GroupBody };
