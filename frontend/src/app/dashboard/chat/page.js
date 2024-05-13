"use client";

import Layout from "../components/Layout";
import MessageContainer from "./components/MessageContainer";
import Sidebar from "./components/sidebar";
export default function CHAT() {
  return (
    <Layout>
      <div className="flex sm:h-[450px] md:h-screen rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg  p-4 w-fit">
        <Sidebar />

        <MessageContainer />
      </div>
    </Layout>
  );
}
