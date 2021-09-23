import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Wrapper.scss";

const Wrapper = ({ children }) => (
  <>
    <Header />
    <section className="main">
      <div className="main__wrapper">{children}</div>
    </section>
    <Footer />
  </>
);

export default Wrapper;
