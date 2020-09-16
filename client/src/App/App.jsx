import React from "react";
import SigninModal from "../Modal/SignInModal";
import "./App.scss";
import Footer from "./Footer";
import Main from "./Main";
import Navigation from "./Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Main />
      <Footer />
      <SigninModal />
    </>
  );
}

export default App;
