import React from "react";
import Header from "../header";
import Footer from "../footer";

const Layouts = ({ children }) => {
    console.log('children',children)
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layouts;
