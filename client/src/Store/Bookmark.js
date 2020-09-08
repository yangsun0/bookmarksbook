import { computed, observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import AppStore from "./AppStore";
import { transferable } from "./dataTransfer";
import Group from "./Group";

class Bookmark {
  id: string = "";
  store: AppStore;
  @observable @transferable name: string = "";
  @observable @transferable url: string = "";
  @observable @transferable order: number = 1;
  @observable @transferable groupId: string = "";

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
