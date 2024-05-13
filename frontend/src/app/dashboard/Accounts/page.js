"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
export default function Account() {
  const [image, setImage] = useState(null);
  const [alertsuccessmsg, setsuccessmsg] = useState();
  const [alertdangermsg, setdangermsg] = useState();
  const [AdminList, setAdminList] = useState([]);
  const [addPhoto, setaddPhoto] = useState(false);
  const [register, setregister] = useState({
    name: "",
    lastname: "",
    file: null,
    email: "",
    password: "",
    role: "",
  });

  function HandleChange(event) {
    const { name, value } = event.target;
    setregister((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setregister({ ...register, file: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  async function registerForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", register.name);
    formData.append("lastname", register.lastname);
    formData.append("email", register.email);
    formData.append("password", register.password);
    formData.append("role", register.role);
    if (register.file) {
      formData.append("file", register.file);
    }
    try {
      const response = await axios.post("/api/users/register", formData);
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getAdminList() {
      const response = await axios.get("/api/users/register");
      setAdminList(response.data.AdminList);
    }
    getAdminList();
  }, []);
  return (
    <Layout>
      <div className="container shadow" id="Accounts">
        <div className="flex items-center justify-center flex-col">
          <h2>Add New Account</h2>

          <div className=" bg-slate-100 rounded-lg p-10 border border-gray-300">
            <form onSubmit={registerForm}>
              <div className="text-center mb-2">
                <div className="mx-auto font-semibold mb-2">Add Your Photo</div>
                {image ? (
                  <Image
                    src={image}
                    alt="profileimg"
                    className="rounded-full h-20 w-20 mx-auto shadow "
                    width={0}
                    height={0}
                  />
                ) : (
                  <label>
                    <i
                      className={`fa-solid ${
                        addPhoto ? "fa-plus" : "fa-user"
                      } mx-auto text-4xl border rounded-full py-4 px-5 border-gray-300 shadow`}
                      onMouseLeave={() => setaddPhoto(false)}
                      onMouseOver={() => setaddPhoto(true)}
                    />
                    <input
                      id="formFileSm"
                      type="file"
                      name="profilePicture"
                      required
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
              <div className="flex flex-row ">
                <div className="flex flex-col gap-2">
                  <label className="text-lg ms-1 font-medium text-gray-500">
                    Name
                  </label>
                  <input
                    className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                    type="text"
                    name="name"
                    value={register.name}
                    onChange={HandleChange}
                    placeholder="Ahmed"
                  />
                </div>
                <div className="flex flex-col gap-2 mx-4">
                  <label className="text-lg ms-1 font-medium text-gray-500">
                    Last Name
                  </label>
                  <input
                    className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                    type="text"
                    name="lastname"
                    value={register.lastname}
                    onChange={HandleChange}
                    placeholder="Maghraoui"
                  />
                </div>
              </div>
              <div className="flex flex-row mt-5">
                <div className="flex flex-col gap-2">
                  <label className="text-lg ms-1 font-medium text-gray-500">
                    Email
                  </label>
                  <input
                    className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                    type="email"
                    name="email"
                    value={register.email}
                    onChange={HandleChange}
                    placeholder="example@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2 mx-4">
                  <label className="text-lg ms-1 font-medium text-gray-500">
                    Password
                  </label>
                  <input
                    className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                    type="password"
                    name="password"
                    value={register.password}
                    onChange={HandleChange}
                    placeholder="***********"
                  />
                </div>
              </div>
              <div className="flex flex-row mt-5">
                <div className="flex flex-col gap-2">
                  <label className="text-lg ms-1 font-medium text-gray-500">
                    Role
                  </label>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    name="role"
                    value={register.role}
                    onChange={HandleChange}>
                    <option>Choose one</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="technicien_réseau">Technicien Réseau</option>
                    <option value="technicien_maintenance">
                      Technicien Maintenance
                    </option>
                  </select>
                </div>
                <div className="ms-auto pt-8 pe-5">
                  <button
                    className="border font-semibold hover:shadow-lg hover:scale-105 border-slate-400 text-gray-500 rounded-xl p-2 shadow transition-all"
                    type="submit">
                    Submit
                  </button>
                </div>
              </div>
              {alertsuccessmsg && (
                <div
                  className={`bg-green-400 text-white p-2 my-2 w-fit text-center mx-auto rounded-xl ${
                    alertsuccessmsg && "alertfadeup"
                  }`}
                  role="alert">
                  {alertsuccessmsg}
                </div>
              )}
              {alertdangermsg && (
                <div
                  className={`bg-red-400 text-white p-2 my-2 w-fit text-center mx-auto rounded-xl ${
                    alertdangermsg && "alertfadeup"
                  }`}
                  role="alert">
                  {alertdangermsg}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="projects p-20 bg-white rad-10 m-20">
          <h2 className="mt-0 mb-20">Admin List</h2>
          <div className="responsive-table">
            <table className="fs-15 w-full">
              <thead>
                <tr>
                  <td>Photo</td>
                  <td>Name</td>
                  <td>LastName</td>
                  <td>Email</td>
                  <td>Role</td>
                </tr>
              </thead>
              <tbody>
                {AdminList?.map((admin) => {
                  return (
                    <tr key={admin._id}>
                      <td>
                        <Image
                          src={admin.imageURL}
                          className="m-2 rounded-circle object-fit-contain h-40"
                          alt="photoprofile"
                        />
                      </td>
                      <td>{admin.name}</td>
                      <td>{admin.lastname}</td>
                      <td>{admin.email}</td>
                      <td>{admin.role}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
