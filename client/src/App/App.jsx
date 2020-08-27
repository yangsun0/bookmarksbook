import React, { useEffect } from "react";
import { useStore } from "../Store";
import "./App.scss";
import Footer from "./Footer";
import Main from "./Main";
import Navigation from "./Navigation";

function App() {
  const store = useStore();

  useEffect(() => {
    store.fetchData();
  }, [store]);

  return (
    <>
      <Navigation />
      <Main />
      <Footer />
    </>
  );
}

export default App;
