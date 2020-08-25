import { action, computed, observable } from "mobx";
import type { DropDownOption } from "../Form/Control/Dropdown";
import GroupBody from "../Service/Data/GroupBody";
import AppStore from "./AppStore";
import { formToStore, storeToBody, storeToForm } from "./copyUtility";
import Group from "./Group";

interface IGroupFormValues {
  name: string;
  column: string;
  order: string;
}

class GroupFormValues implements IGroupFormValues {
  name: string;
  column: string;
  order: string;
}

class GroupFormStore {
  appStore: AppStore;
  groupId: string;
  group: Group;
  column: string;

  @observable isModalShown: boolean = false;
  @observable orderOptionsCount: number = 1;

  @computed get orderOptions(): Array<DropDownOption> {
    const options = [];
    for (let i = 1; i <= this.orderOptionsCount; i++) {
      options.push({
        label: i.toString(),
        value: i.toString(),
      });
    }

    return options;
  }

  toGroupFormValues() {
    const formValues = new GroupFormValues();
    storeToForm(this.group, formValues);
    return formValues;
  }

  shouldResetOrder(orderString: string) {
    const order = parseInt(orderString);
    return order > this.orderOptionsCount;
  }

  @action openModal(id?: string) {
    this.groupId = id ? id : "";
    if (this.groupId) {
      const result = this.appStore.groups.find(
        (group) => group.id === this.groupId
      );
      if (!result) {
        throw Error("Group Id not found. groupId: " + this.groupId);
      }

      this.group = result;
    } else {
      this.group = new Group();
      this.group.store = this.appStore;
    }

    this.column = "";
    this.changeColumn(this.group.column.toString());
    this.isModalShown = true;
  }

  @action closeModal() {
    this.groupId = "";
    this.group = new Group();
    this.column = "";
    this.isModalShown = false;
  }

  @action changeColumn(column: string) {
    if (column === this.column) {
      return;
    }

    this.column = column;
    let count =
      this.column === "1"
        ? this.appStore.leftGroups.length
        : this.appStore.rightGroups.length;
    if (this.column !== this.group.column.toString()) {
      count += 1;
    }

    this.orderOptionsCount = count;
  }

  @action save(groupFormValues: IGroupFormValues) {
    formToStore(groupFormValues, this.group);
    const groupBody = new GroupBody();
    storeToBody(this.group, groupBody);
    if (this.groupId) {
      this.appStore.bookmarkService.update(this.groupId, groupBody);
    } else {
      this.appStore.bookmarkService.new(groupBody);
    }
  }
}

export default GroupFormStore;
export type { IGroupFormValues };
