import React from "react";
import { AppStore } from "./AppStore";

const storeContext: React$Context<AppStore> = React.createContext(
  new AppStore()
);

export default storeContext;
