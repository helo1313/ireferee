import React, { PropsWithChildren } from "react";
import Header from "./header/Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default Layout;
