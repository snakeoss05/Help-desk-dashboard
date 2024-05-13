"use client";
import React from "react";
import Layout from "./components/Layout";
import Image from "next/image";
import Link from "next/link";
export default function Dashboard() {
  return (
    <Layout>
      <div className="w-100 flex bg-slate-100 h-screen p-4 gap-5 ">
        <div className="welcome bg-white rounded-xl h-fit ">
          <div className="intro p-5 flex justify-between bg-gray-200 overflow-hidden">
            <div>
              <h2 className="m-0">Welcome</h2>
              <p className="text-gray-500 font-semibold mt-5">
                Noussaier&nbsp; Bibani
              </p>
            </div>
            <Image
              className="hidden lg:block w-full
              "
              width={250}
              height={0}
              src="/assests/welcome.png"
              alt=""
            />
          </div>
        </div>

        <div className="tickets gap-5 rounded-xl  bg-white p-5 h-fit">
          <h2 className="mt-0 mb-2.5">Tickets Statistics</h2>
          <p className="mt-0 mb-5 text-gray-400 text-base">
            Everything About Support Tickets
          </p>
          <div className="flex txt-center gap-5 flex-wrap">
            <div className="box p-5 rounded-xl text-lg font-semibold text-gray-500 mb-2">
              <i className="fa-regular fa-rectangle-list fa-2x mb-2.5 text-orange-400" />
              <span className="block text-black font-bold text-2xl mb-5">
                2500
              </span>
              Total
            </div>
            <div className="box p-5 rounded-xl text-lg font-semibold text-gray-500">
              <i className="fa-solid fa-spinner fa-2x mb-2.5 text-blue" />
              <span className="block text-black font-bold text-2xl mb-5">
                500
              </span>
              Pending
            </div>
            <div className="box p-5 rounded-xl text-lg font-semibold text-gray-500 mb-2">
              <i className="fa-regular fa-circle-check fa-2x mb-2.5 text-green-500" />
              <span className="block text-black font-bold text-2xl mb-5">
                1900
              </span>
              Closed
            </div>
            <div className="box p-5 rounded-xl text-lg font-semibold text-gray-500 mb-2">
              <i className="fa-regular fa-rectangle-xmark fa-2x mb-2.5 c-red" />
              <span className="block text-black font-bold text-2xl mb-5">
                100
              </span>
              Completed
            </div>
          </div>
        </div>
        <div className="tasks p-5 bg-white rounded-xl h-fit">
          <h2 className="mt-0 mb-5">Latest Tasks</h2>
          <div className="task-row between-flex">
            <div className="grow">
              <h3 className="mt-0 mb-5 text-lg font-semibold ">
                Record One New Video
              </h3>
              <p className="m-0 text-gray-500 mb-2">
                Record Python Create Exe Project
              </p>
            </div>
            <i className="fa-regular fa-trash-can text-red-500"></i>
          </div>
          <div className="task-row between-flex">
            <div className="grow">
              <h3 className="mt-0 mb-5 text-lg font-semibold">Write Article</h3>
              <p className="m-0 text-gray-500 mb-2">
                Write Low Level vs High Level Languages
              </p>
            </div>
            <i className="fa-regular fa-trash-can text-red-500"></i>
          </div>
          <div className="task-row between-flex">
            <div className="grow">
              <h3 className="mt-0 mb-5 text-lg font-semibold">
                Finish Project
              </h3>
              <p className="m-0 text-gray-500 mb-2">
                Publish Academy Programming Project
              </p>
            </div>
            <i className="fa-regular fa-trash-can text-red-500"></i>
          </div>
          <div className="task-row between-flex done">
            <div className="grow">
              <h3 className="mt-0 mb-5 text-lg font-semibold">
                Attend The Meeting
              </h3>
              <p className="m-0 text-gray-500 mb-2">
                Attend The Project Business Analysis Meeting
              </p>
            </div>
            <i className="fa-regular fa-trash-can text-red-500"></i>
          </div>
          <div className="task-row between-flex">
            <div className="grow">
              <h3 className="mt-0 mb-1.5 text-lg font-semibold">
                Finish Lesson
              </h3>
              <p className="m-0 text-gray-500 mb-2">Finish Teaching Flex Box</p>
            </div>
            <i className="fa-regular fa-trash-can text-red-500"></i>
          </div>
        </div>
      </div>
    </Layout>
  );
}
