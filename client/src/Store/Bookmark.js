import { computed, observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import AppStore from "./AppStore";
import { preserve } from "./copyUtility";
import Group from "./Group";

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

  static compareByOrder(left: Bookmark, right: Bookmark) {
    return left.order - right.order;
  }
}

export default Bookmark;
