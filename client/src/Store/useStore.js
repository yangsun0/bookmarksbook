import React from "react";
import AppStore from "./AppStore";
import StoreContext from "./StoreContext";

function useStore(): AppStore {
  return React.useContext(StoreContext);
}

export default useStore;
