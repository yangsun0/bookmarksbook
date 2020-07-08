import React from "react";
import "./App.scss";
import Footer from "./Footer";
import Main from "./Main";
import Navigation from "./Navigation";
import { getSampleData } from "./sampleData";

function App() {
  const data = getSampleData();

  return (
    <>
      <Navigation />
      <Main data={data} />
      <Footer />
    </>
  );
}

export default App;
