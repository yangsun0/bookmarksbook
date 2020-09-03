import { action, observable } from "mobx";
import AppStore from "./AppStore";
import BookmarkFormStore from "./BookmarkFormStore";

class BookmarkModalStore {
  appStore: AppStore;
  bookmarkFormStore: BookmarkFormStore = new BookmarkFormStore();

  @observable isShown: boolean = false;

  @action open(id?: string) {
    this.bookmarkFormStore = new BookmarkFormStore();
    this.bookmarkFormStore.appStore = this.appStore;
    this.bookmarkFormStore.init(id);
    this.isShown = true;
  }

  @action close() {
    this.isShown = false;
  }
}

export default BookmarkModalStore;
