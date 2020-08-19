import { computed, decorate, observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import AppStore from "./AppStore";
import Group from "./Group";

type BookmarkBody = {
  name: string,
  url: string,
  groupId: string,
  order: number,
};

class Bookmark extends Object {
  id: string = "";
  name: string = "";
  url: string = "";
  order: number = 1;
  groupId: string = "";
  store: AppStore;

  get iconUrl(): string {
    return this.url + "/favicon.ico";
  }

  get group(): Group | null {
    return this.store.groups.find((group) => group.id === this.groupId) ?? null;
  }

  static get props(): string[] {
    return ["name", "url", "groupId", "order"];
  }
}

decorate(Bookmark, {
  id: observable,
  name: observable,
  url: observable,
  order: observable,
  iconUrl: computed,
  group: computed,
});

export default Bookmark;
export type { BookmarkBody };
