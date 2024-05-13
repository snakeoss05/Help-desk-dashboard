"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const inputRefs = useRef([]);
  const [image, setImage] = useState(null);
  const [otp, setOtp] = useState(false);
  const [code, setCode] = useState("");
  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    file: null,
    email: "",
    password: "",
  });

  async function verifyOtp(e) {
    e.preventDefault();
    const data = {
      email: register.email,
      otp: code,
    };

    try {
      await axios.post("/api/users/verify", data);
      const response = await axios.post("api/users/login", register);
      toast.success(response.data.message);
      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function registerForm(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", register.name);
    formData.append("lastname", register.lastname);
    formData.append("email", register.email);
    formData.append("password", register.password);
    if (register.file) {
      formData.append("file", register.file);
    }
    try {
      const response = await axios.post("/api/users/register", formData);
      const responseé = await axios.post("api/users/login", register);
      router.push("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (index, value) => {
    const newOtp = code.split("");
    newOtp[index] = value;
    setCode(newOtp.join(""));

    // Move to the next input field if available
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    // Move to the previous input field if the backspace key is pressed and the input field is empty
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };
  function HandleChange(event) {
    const { name, value } = event.target;

    setRegister((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegister({ ...register, file: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">IT-SP</h1>
          <p className="text-white mt-1">
            Network Monitoring and Reporting Dashboard
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
      </div>
      {otp ? (
        <div className="flex  md:w-1/2 justify-center py-10 items-center bg-white">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-fit max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email ${register.email}</p>
                </div>
              </div>
              <div>
                <form>
                  <div className="flex flex-col space-y-16 ">
                    <div className="flex flex-row items-center justify-between mx-auto w-full  gap-2">
                      {[...Array(6)].map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          className="w-16 h-16 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          maxLength="1"
                          value={code[index] || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-indigo-600 border-none text-white text-sm shadow-sm"
                          onClick={verifyOtp}>
                          Verify Account
                        </button>
                      </div>
                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn t recieve code?</p>
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer">
                          Resend
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white" onSubmit={registerForm}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <span className=" text-slate-400">Profile Image</span>
              <div className="flex items-center justify-center w-full">
                {image ? (
                  <Image
                    src={image}
                    alt="Landscape picture"
                    className="h-36 w-36 rounded-full"
                    width={800}
                    height={0}
                  />
                ) : (
                  <label className="flex flex-col items-center justify-center w-full  h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG (MAX. 500x500px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="name"
                onChange={HandleChange}
                value={register.name}
                placeholder="FirstName"
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="lastname"
                onChange={HandleChange}
                value={register.lastname}
                placeholder="LastName"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="email"
                onChange={HandleChange}
                value={register.email}
                placeholder="Email Address"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name="password"
                onChange={HandleChange}
                value={register.password}
                placeholder="Password"
              />
            </div>
            <button className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
              Register
            </button>
            <Link
              href="/"
              className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Sign In !
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
