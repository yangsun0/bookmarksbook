import { computed, observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import AppStore from "./AppStore";
import { preserve } from "./copyUtility";
import Group from "./Group";

type BookmarkBody = {
  name: string,
  url: string,
  groupId: string,
  order: number,
};

class Bookmark {
  id: string = "";
  store: AppStore;

  @observable @preserve name: string = "";
  @observable @preserve url: string = "";
  @observable @preserve order: number = 1;
  @observable @preserve groupId: string = "";

  @computed get iconUrl(): string {
    return this.url + "/favicon.ico";
  }

  @computed get group(): Group | null {
    return this.store.groups.find((group) => group.id === this.groupId) ?? null;
  }

  static get props(): string[] {
    return ["name", "url", "groupId", "order"];
  }
}

export default Bookmark;
export type { BookmarkBody };
