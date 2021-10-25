import React from "react";

//COMPONENTS
import Header from "../components/Header";

const BasicLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default BasicLayout;
