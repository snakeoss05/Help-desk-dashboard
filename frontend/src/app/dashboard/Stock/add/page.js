"use client";

import { React, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
export default function AddStock() {
  const [selectedValue, setSelectedValue] = useState("");
  const [formDataPc, setformData] = useState({
    groupe: "pc",
    type: "",
    model: "",
    s_n: "",
    n_i: "",
    ram: {
      stockageRam: "",
      typeRam: "",
    },
    stockage1: {
      typestk1: "",
      stockage1: "",
    },
    stockage2: {
      typestk2: "",
      stockage2: "",
    },
    processeur: "",
    carte_graphique: "",
  });
  const [formDataEcran, setformDataEcran] = useState({
    groupe: "ecran",
    mark: "",
    model: "",
    s_n: "",
    n_i: "",
    size: "",
  });
  const [formDataCable, setformDataCable] = useState({
    groupe: "cable",
    type: "",
    height: "1.5",
    quantity: "",
  });
  const [formDataAdaptateur, setformDataAdaptateur] = useState({
    groupe: "adaptateur",
    type: "",
    quantity: "",
  });
  const [formDataAccessoires, setformDataAccessoires] = useState({
    groupe: "accessoires",
    type: "",
    quantity: "",
  });

  const SuccessNotify = () => toast.success("Successfully created!");
  const ErrorNotify = () => toast.error("This is an error!");
  const handleSubmitPc = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/stock/pc",

        formDataPc
      );

      SuccessNotify();
    } catch (error) {
      ErrorNotify();
    }
  };
  const handleSubmitEcran = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/stock/ecran",

        formDataEcran
      );

      SuccessNotify();
    } catch (error) {
      ErrorNotify();
    }
  };
  const handleSubmitcable = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/stock/cable",

        formDataCable
      );

      SuccessNotify();
    } catch (error) {
      ErrorNotify();
    }
  };
  const handleSubmitaccessoires = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/stock/accessoires",

        formDataAccessoires
      );

      SuccessNotify();
    } catch (error) {
      ErrorNotify();
    }
  };
  const handleAddaptateur = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/stock/adaptateur",

        formDataAdaptateur
      );
      SuccessNotify();
    } catch (error) {
      ErrorNotify();
    }
  };
  const handleNestedObj = (event, property) => {
    const { name, value } = event.target;
    setformData((prevData) => ({
      ...prevData,
      [property]: {
        ...prevData[property],
        [name]: value,
      },
    }));
  };
  const handleChangeSelectedValue = (event) => {
    setSelectedValue(event.target.value);
  };
  function HandleChange(event) {
    const { name, value } = event.target;
    setformData((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataEcran((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataCable((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataAccessoires((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataAdaptateur((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  return (
    <Layout>
      <div id="stock" className="mb-3 ms-8  ">
        <div eventkey="home" title="Add Items To Storage">
          <div className="font-semibold text-2xl my-8 ">Add Item To Stock</div>
          <div className="flex">
            <select
              className="select select-bordered w-full max-w-xs rounded-sm"
              aria-label=".round-lg example"
              value={selectedValue}
              onChange={handleChangeSelectedValue}>
              <option>Select Items Type</option>
              <option value="Pc" name="pc">
                Pc
              </option>
              ange
              <option value="Ecran" name="ecran">
                Ecran
              </option>
              <option value="Cable" name="Cabel">
                Cable
              </option>
              <option value="Accessoires" name="accessoires">
                Accessoires
              </option>
              <option value="Adaptateur" name="Adaptateur">
                Adaptateur
              </option>
            </select>
          </div>
          {selectedValue === "Pc" && (
            <div>
              <h2 className="text-center">Add New Pc To Storage</h2>
              <form onSubmit={handleSubmitPc} className="d-grid grid-cols-1">
                <div className="container">
                  <div className="flex justify-start">
                    <label>Type</label>
                    <select
                      className="select select-bordered w-full max-w-xs "
                      name="type"
                      value={formDataPc.type}
                      onChange={HandleChange}
                      aria-label=".round-sm example">
                      <option>Type</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Laptop">Laptop</option>
                    </select>
                  </div>

                  <div className="flex justify-start">
                    <label>Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formDataPc.model}
                      onChange={HandleChange}
                      className="form-control"
                      required></input>
                  </div>
                  <div className="flex justify-start">
                    <label>S/N</label>
                    <input
                      type="text"
                      name="s_n"
                      value={formDataPc.s_n}
                      onChange={HandleChange}
                      className="form-control"
                      required></input>
                  </div>
                  <div className="flex justify-start">
                    <label>N/Inventaire</label>
                    <input
                      type="text"
                      name="n_i"
                      value={formDataPc.n_i}
                      onChange={HandleChange}
                      className="form-control"></input>
                  </div>
                </div>
                <h2 className="my-8 text-center">Caracteristique</h2>
                <div className="container2">
                  <div className="flex justify-start">
                    <label>Ram</label>

                    <input
                      type="text"
                      className="form-control "
                      placeholder="GB"
                      name="stockageRam"
                      onChange={(e) => handleNestedObj(e, "ram")}
                      value={formDataPc.ram.stockageRam}
                    />
                    <span className="input-group-text">GB</span>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="typeRam"
                      type="text"
                      value={formDataPc.ram.typeRam}
                      onChange={(e) => handleNestedObj(e, "ram")}
                      aria-label=".round-sm example">
                      <option>Type</option>
                      <option value="DDR3">DDR3</option>
                      <option value="DDR4">DDR4</option>
                    </select>
                  </div>

                  <div className="flex justify-start">
                    <label>Stockage</label>
                    <input
                      type="text"
                      className="form-control  "
                      placeholder="GB"
                      name="stockage1"
                      aria-describedby="basic-addon2"
                      onChange={(e) => handleNestedObj(e, "stockage1")}
                      value={formDataPc.stockage1.stockage1}
                    />
                    <span className="input-group-text" id="basic-addon2">
                      GB
                    </span>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(e) => handleNestedObj(e, "stockage1")}
                      type="text"
                      name="typestk1"
                      value={formDataPc.stockage1.typestk1}
                      aria-label=".round-sm example">
                      <option>Type</option>
                      <option value="SSD">SSD</option>
                      <option value="HDD">HDD</option>
                    </select>
                  </div>

                  <div className="flex justify-start">
                    <label>Stockage</label>
                    <input
                      type="text"
                      className="form-control  "
                      placeholder="GB"
                      name="stockage2"
                      onChange={(e) => handleNestedObj(e, "stockage2")}
                      value={formDataPc.stockage2.stockage2}
                    />
                    <span className="input-group-text" id="basic-addon2">
                      GB
                    </span>
                    <select
                      className="select select-bordered w-full max-w-xs "
                      name="typestk2"
                      onChange={(e) => handleNestedObj(e, "stockage2")}
                      value={formDataPc.stockage2.typestk2}
                      aria-label=".round-sm example">
                      <option>Type</option>
                      <option value="SSD">SSD</option>
                      <option value="HDD">HDD</option>
                    </select>
                  </div>

                  <div className="flex justify-start">
                    <label>Processeur</label>
                    <input
                      type="text"
                      name="processeur"
                      className="form-control "
                      onChange={HandleChange}
                      value={formDataPc.processeur}></input>
                  </div>
                  <div className="flex justify-start">
                    <label className=" text-wrap">Carte Graphique</label>
                    <input
                      type="text"
                      name="carte_graphique"
                      className="form-control  "
                      onChange={HandleChange}
                      value={formDataPc.carte_graphique}></input>
                    <button
                      type="submit"
                      className="btn-green ms-auto   w-40  me-2 hover:shadow-md hover:scale-95 transition-all">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {selectedValue === "Ecran" && (
            <div>
              <h2 className="text-center">Add New Ecran To Storage</h2>
              <form onSubmit={handleSubmitEcran} className="d-grid grid-cols-1">
                <div className="container">
                  <div className="flex justify-start ">
                    <label>Mark</label>
                    <select
                      className="select select-bordered w-full max-w-xs "
                      aria-label=".round-sm example"
                      name="mark"
                      value={formDataEcran.mark}
                      onChange={HandleChange}>
                      <option>Mark</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Dell">Dell</option>
                      <option value="Tcl">Tcl</option>
                    </select>
                  </div>

                  <div className="flex justify-start">
                    <label>Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formDataEcran.model}
                      onChange={HandleChange}
                      className="form-control"></input>
                  </div>
                  <div className="flex justify-start">
                    <label>S/N</label>
                    <input
                      type="text"
                      name="s_n"
                      value={formDataEcran.s_n}
                      onChange={HandleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="flex justify-start">
                    <label>N/Inventaire</label>
                    <input
                      type="text"
                      name="n_i"
                      value={formDataEcran.n_i}
                      onChange={HandleChange}
                      className="form-control"></input>
                  </div>

                  <div className="flex justify-start">
                    <label>Size</label>
                    <select
                      className="select select-bordered  w-full max-w-xs "
                      name="size"
                      value={formDataEcran.size}
                      onChange={HandleChange}
                      aria-label=".round-sm example">
                      <option>Select Size</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="22">22</option>
                      <option value="24">24</option>
                      <option value="27">27</option>
                    </select>
                  </div>
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="btn-green w-full mt-4 hover:shadow-md hover:scale-95 transition-all">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {selectedValue === "Cable" && (
            <div>
              <h2 className="text-center">Add New Cable To Storage</h2>
              <form className="d-grid grid-cols-1" onSubmit={handleSubmitcable}>
                <div className="container">
                  <div className="flex justify-start">
                    <label>Type Cabel</label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="type"
                      value={formDataCable.type}
                      onChange={HandleChange}>
                      <option>Select Cabel Type</option>
                      <option value="Alimentation">Alimentation</option>
                      <option value="Display">Display</option>

                      <option value="Hdmi">Hdmi</option>
                      <option value="Vga">Vga</option>
                      <option value="Dvi">Dvi</option>
                      <option value="Rj11">Rj11</option>
                      <option value="Rj45">Rj45</option>
                      <option value="C">C</option>
                      <option value="Micro Usb">Micro Usb</option>
                    </select>
                  </div>

                  <div className="flex justify-start">
                    <label>Height</label>
                    <input
                      type="text"
                      name="height"
                      placeholder="Default 1.5 M"
                      value={formDataCable.height}
                      onChange={HandleChange}
                      className="form-control"></input>
                  </div>
                  <div className="flex justify-start">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      onChange={HandleChange}
                      value={formDataCable.quantity}
                      className="form-control"></input>
                  </div>

                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="btn-green w-full  mt-4 hover:shadow-md hover:scale-95 transition-all">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {selectedValue === "Adaptateur" && (
            <div>
              <h2 className="text-center">Add New Adaptateur To Storage</h2>
              <form className="d-grid grid-cols-1" onSubmit={handleAddaptateur}>
                <div className="container">
                  <div className="flex justify-start">
                    <label>Adaptateur Type</label>
                    <select
                      name="type"
                      value={formDataAdaptateur.type}
                      onChange={HandleChange}
                      className="select select-bordered w-full max-w-xs">
                      <option>Select Adaptateur Type</option>
                      <option value="Hdmi to display">hdmi to display</option>
                      <option value="Hdmi to vga">Hdmi to vga</option>
                      <option value="vga to hdmi">vga to hdmi</option>
                      <option value="vga to display">vga to display</option>
                      <option value="hdmi to miniHdmi">hdmi to miniHdmi</option>
                      <option value="display to minihdmi">
                        display to minihdmi
                      </option>
                      <option value="minihdmi to Hdmi vga display">
                        minihdmi to Hdmi vga display
                      </option>
                    </select>
                  </div>

                  <div className="flex justify-start">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      onChange={HandleChange}
                      value={formDataAdaptateur.quantity}
                      className="form-control"></input>
                  </div>

                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="btn-green w-full mt-4 hover:shadow-md hover:scale-95 transition-all">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {selectedValue === "Accessoires" && (
            <div>
              <h2 className="text-center">Add New Adaptateur To Storage</h2>
              <form
                className="d-grid  grid-cols-1"
                onSubmit={handleSubmitaccessoires}>
                <div className="container">
                  <div className="flex justify-start">
                    <label>Accessoires Name</label>
                    <select
                      name="type"
                      value={formDataAccessoires.type}
                      onChange={HandleChange}
                      className="select select-bordered  w-full max-w-xs">
                      <option>Select Accessoires Name</option>
                      <option value="Souris">Souris</option>
                      <option value="Clavier">Clavier</option>
                      <option value="Casque">Casque</option>
                    </select>
                  </div>

                  <div className="flex justify-start ">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      onChange={HandleChange}
                      value={formDataAccessoires.quantity}
                      className="form-control"></input>
                  </div>

                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="btn-green w-full mt-4 hover:shadow-md hover:scale-95 transition-all">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
