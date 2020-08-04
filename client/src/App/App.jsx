import React, { useEffect, useState } from "react";
import type { AppData } from "../Common/Types";
import { getAppData } from "../Service/bookmarkService";
import "./App.scss";
import Footer from "./Footer";
import Main from "./Main";
import Navigation from "./Navigation";

function App() {
  const initData: AppData = {
    groups: [],
  };
  const [data, setData] = useState(initData);
  useEffect(() => {
    async function fetchData() {
      const appData = await getAppData();
      setData(appData);
    }

    fetchData();
  }, []);

  return (
    <>
      <Navigation />
      <Main data={data} />
      <Footer />
    </>
  );
}

export default App;
