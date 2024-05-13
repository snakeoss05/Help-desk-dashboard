"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import TicketContainer from "./components/TicketContainer";
import NewTicket from "./components/NewTicket";

export default function Tickets() {
  const [show, setshow] = useState(false);
  const [TicktList, setTicketList] = useState([]);
  // Function to change the default value
  const changeDefaultStatus = (newValue) => {
    setstatus((prevStatus) => ({
      ...prevStatus,
      default: newValue,
    }));
    setshow(false);
  };
  function openModel() {
    document.getElementById("my_modal_2").showModal();
  }
  return (
    <Layout>
      <div className="projects p-16 bg-white rad-10 my-16 mx-10">
        <div className="grid grid-cols-2">
          {" "}
          <h2 className="mt-0 mb-20 ">Tickets List</h2>
          <button
            className="btn btn-wide ms-auto"
            onClick={() => document.getElementById("my_modal").showModal()}>
            Create New Ticket
          </button>
        </div>

        <div className="responsive-table shadow">
          <TicketContainer />
          <NewTicket openModal={openModel} />
        </div>
      </div>
    </Layout>
  );
}
