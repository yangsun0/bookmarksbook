import { action, observable } from "mobx";
import AppStore from "./AppStore";
import GroupFormStore from "./GroupFormStore";

class GroupModalStore {
  appStore: AppStore;
  groupFormStore: GroupFormStore = new GroupFormStore();

  @observable isShown: boolean = false;

  @action open(id?: string) {
    this.groupFormStore = new GroupFormStore();
    this.groupFormStore.appStore = this.appStore;
    this.groupFormStore.init(id);
    this.isShown = true;
  }

  @action close() {
    this.isShown = false;
  }
}

export default GroupModalStore;
