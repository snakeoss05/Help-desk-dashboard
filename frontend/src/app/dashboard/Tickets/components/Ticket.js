import React, { useState } from "react";

export default function Ticket() {
  const [show, setshow] = useState(false);
  const [status, setstatus] = useState({
    default: { value: "Pending", color: "orange-500" },
    Pending: { value: "Pending", color: "orange-500" },
    completed: { value: "Completed", color: "green-500" },
    InProgress: { value: "In Progress", color: "cyan-500" },
    Rejected: { value: "Rejected", color: "red-500" },
  });
  async function addTicketToMyList() {
    setshow(false);
  }
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>2131235341</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle rounded-full w-12 h-12">
              <img
                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">Hart Hagerty</div>
            <div className="text-sm opacity-50">United States</div>
          </div>
        </div>
      </td>
      <td>2022-01-01 12:00</td>
      <td>
        Zemlak, Daniel and Leannon
        <br />
        <span className="badge badge-ghost badge-sm">
          Desktop Support Technician
        </span>
      </td>
      <td>
        <div className="flex flex-row gap-x-2 text-center items-center justify-center ">
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <p>Heigh</p>
        </div>
      </td>
      <th className="relative">
        <i
          className="fa-regular fa-square-plus text-xl hover:scale-105 "
          onClick={() => setshow(!show)}></i>
        {show && (
          <div
            role="alert"
            className="alert w-64 text-normal shadow-xl absolute z-40 left-0 top-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>are you sure.</span>
            <div>
              <button className="btn btn-sm mx-2" onClick={addTicketToMyList}>
                Yes
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setshow(false)}>
                no
              </button>
            </div>
          </div>
        )}
      </th>
      <th>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => document.getElementById("my_modal_5").showModal()}>
          details
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4 font-normal">i need help for somthing</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </th>
      <th className="font-normal">
        <div class="badge badge-warning gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-4 h-4 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Pending
        </div>
      </th>
    </tr>
  );
}
