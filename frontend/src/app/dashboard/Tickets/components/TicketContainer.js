import React, { useState } from "react";
import Ticket from "./Ticket";
export default function TicketContainer({ comment }) {
  return (
    <div className="overflow-x-auto">
      <table className="table capitalize text-center">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>ticketId</th>
            <th>fullname</th>
            <th>start</th>
            <th>service</th>
            <th>priority</th>
            <th>affected</th>
            <th>message</th>
            <th className={`hidden ${comment && "block"}`}>comment</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <Ticket />
        </tbody>

        <tfoot>
          <tr>
            <th></th>
            <th>ticketId</th>
            <th>fullname</th>
            <th>start</th>
            <th>service</th>
            <th>priority</th>
            <th>affected</th>
            <th>message</th>
            <th className={`hidden ${comment && "block"}`}>comment</th>
            <th>status</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
