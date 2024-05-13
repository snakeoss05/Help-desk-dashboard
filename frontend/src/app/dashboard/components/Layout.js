// components/Layout.js

import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main className="min-h-screen ps-64">{children}</main>
    </div>
  );
};

export default Layout;
