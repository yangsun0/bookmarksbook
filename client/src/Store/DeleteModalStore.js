import { action, observable } from "mobx";
import BookmarkBody from "../Service/Data/BookmarkBody";
import GroupBody from "../Service/Data/GroupBody";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";
import Group from "./Group";

class EmptyObj {}

class DeleteModalStore {
  appStore: AppStore;
  id: string = "";
  itemType: string = "";
  targetClass: Function = EmptyObj;
  bodyClass: Function = EmptyObj;

  @observable isShown: boolean = false;
  @observable name: string = "";
  @observable targetKey: string = "";

  @action open(targetClass: Function, id: string) {
    this.id = id;
    this.targetClass = targetClass;
    this.targetKey = this.targetClass.name.toLowerCase();
    if (this.targetClass === Bookmark) {
      this.bodyClass = BookmarkBody;
      this.name = this.appStore.findBookmark(this.id).name;
    } else if (this.targetClass === Group) {
      this.bodyClass = GroupBody;
      this.name = this.appStore.findGroup(this.id).name;
    } else {
      throw Error("Unknown class: " + this.targetClass.name);
    }

    this.isShown = true;
  }

  @action close() {
    this.isShown = false;
  }

  @action async delete() {
    this.isShown = false;
    if (this.targetClass === Bookmark) {
      const index = this.appStore.bookmarks.findIndex(
        (bookmark) => bookmark.id === this.id
      );
      this.appStore.bookmarks.splice(index, 1);
    } else {
      const index = this.appStore.groups.findIndex(
        (group) => group.id === this.id
      );
      this.appStore.groups.splice(index, 1);
    }

    await this.appStore.bookmarkService.delete(this.bodyClass, this.id);
  }
}

export default DeleteModalStore;
