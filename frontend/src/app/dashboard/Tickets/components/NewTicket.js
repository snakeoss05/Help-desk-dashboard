import React, { useState } from "react";

export default function NewTicket() {
  const [service, setService] = useState("");
  const [listPersonnel, setListPersonnel] = useState([]);
  return (
    <div>
      <dialog id="my_modal" className="modal">
        <div className="modal-box">
          <h1 className="text-lg font-bold">New Ticket</h1>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Select Service Name</span>
            </div>
            <select className="select select-bordered">
              <option
                disabled
                selected
                onChange={(e) => setService(e.target.value)}>
                Pick one
              </option>
              <option value="network">Network Service</option>
              <option value="maintenence">maintenance Service</option>
              <option value="quality">Quality Service</option>
              <option value="rh">RH</option>
              <option value="finance">Finance Service</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Affected to </span>
            </div>
            <select className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              {listPersonnel?.map((personne) => (
                <option>
                  <div>
                    <Image
                      src={personne.profilePicture}
                      widht={10}
                      height={10}
                      alt="profilePicture"
                    />
                    <p>
                      {personne.name}+" " +{personne.lastName}
                    </p>
                  </div>
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Select Praiority</span>
            </div>
            <select className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              <option>Very Heigh</option>
              <option>Heigh</option>
              <option>medium</option>
              <option>Low</option>
            </select>
          </label>
          <div className="label mt-4">
            <span className="label-text">Add File !</span>
          </div>
          <input type="file" className="file-input w-full max-w-xs mb-4" />
          <textarea
            className="textarea textarea-bordered my-4 w-80 textarea-md"
            placeholder="Message"></textarea>
        </div>
      </dialog>
    </div>
  );
}
