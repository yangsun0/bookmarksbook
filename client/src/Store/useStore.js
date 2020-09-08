import React from "react";
import AppStore from "./AppStore";
import BookmarkFormStore from "./BookmarkFormStore";
import BookmarkModalStore from "./BookmarkModalStore";
import DeleteStore from "./DeleteModalStore";
import GroupFormStore from "./GroupFormStore";
import GroupModalStore from "./GroupModalStore";
import StoreContext from "./StoreContext";

function useStore(): AppStore {
  return React.useContext(StoreContext);
}

function useBookmarkModalStore(): BookmarkModalStore {
  return useStore().bookmarkModalStore;
}

function useBookmarkFormStore(): BookmarkFormStore {
  return useStore().bookmarkModalStore.bookmarkFormStore;
}

function useGroupModalStore(): GroupModalStore {
  return useStore().groupModalStore;
}
function useGroupFormStore(): GroupFormStore {
  return useStore().groupModalStore.groupFormStore;
}

function useDeleteModalStore(): DeleteStore {
  return useStore().deleteStore;
}

export default useStore;
export {
  useBookmarkFormStore,
  useGroupFormStore,
  useDeleteModalStore,
  useBookmarkModalStore,
  useGroupModalStore,
};
