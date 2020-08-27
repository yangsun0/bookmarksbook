import React from "react";
import AppStore from "./AppStore";
import BookmarkFormStore from "./BookmarkFormStore";
import DeleteStore from "./DeleteStore";
import GroupFormStore from "./GroupFormStore";
import StoreContext from "./StoreContext";

function useStore(): AppStore {
  return React.useContext(StoreContext);
}

function useBookmarkFormStore(): BookmarkFormStore {
  return useStore().bookmarkFormStore;
}

function useGroupFormStore(): GroupFormStore {
  return useStore().groupFormStore;
}

function useDeleteStore(): DeleteStore {
  return useStore().deleteStore;
}

export default useStore;
export { useBookmarkFormStore, useGroupFormStore, useDeleteStore };
