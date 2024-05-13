"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAppSelector } from "@/lib/hooks";

export default function GrabItem() {
  const [query, setquery] = useState("");
  const [Ticket, setTicket] = useState();
  const [pcTable, setPctable] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [count, setcount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [posteperpage, setposteperpage] = useState(16);
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userData, setUserData] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/users/userData");

        setUserData(response.data.user);
      } catch (err) {
        toast.error(err.message);
      }
    };
    getUserData();
  }, []);
  const determineTableHeaders = (data) => {
    const headers = [];
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!headers.includes(key)) {
          headers.push(key);
        }
      });
    });
    return headers;
  };

  const GetPcTable = async () => {
    if (query) {
      axios
        .get(`/api/stock/search?category=${selectedCategory}&query=${query}`)
        .then((res) => {
          setPctable(res.data.results);
          setHeaders(determineTableHeaders(res.data.results));
        });
    } else {
      axios
        .get(
          `/api/stock/${selectedCategory}?&page=${currentPage}&limit=${posteperpage}`
        )
        .then((res) => {
          const { results, totalPages } = res.data;
          setTotalPages(totalPages);
          setPctable(results.results);
          setHeaders(determineTableHeaders(results.results));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleGrabClick = (item) => {
    setSelectedItem(item);
    setInputValue(""); // Clear input value when showing the input window
    setInputVisible(true);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleCountChange = (event) => {
    setcount(event.target.value);
  };
  const handleInputClose = () => {
    setSelectedItem(null);
    setInputVisible(false);
  };
  const handleInputSubmit = async (count) => {
    const Historique = {
      ticket: inputValue,
      item: selectedItem,
      quantity: count,
      technicien: user.name + " " + user.lastname,
    };
    try {
      const response = await axios.post(
        "/api/stock/historique",

        Historique
      );

      if (selectedItem.groupe !== ("pc" && "ecran")) {
        const newCount = selectedItem.quantity - count;
        await axios.put(
          `/api/stock/${selectedCategory}?id=${selectedItem._id}&count=${count}`
        );
        setSelectedItem((selectedItem.quantity = newCount));
      }

      handleInputClose();
    } catch (error) {
      console.error(error);
    }
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return formattedDate;
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      GetPcTable();
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  console.log(selectedItem);
  const generatePaginationNavigation = () => {
    const navigation = [];
    for (let i = 1; i <= totalPages; i++) {
      navigation.push(
        <li
          key={i}
          onClick={() => handlePageClick(i)}
          className={i === currentPage ? "page-item active" : "page-item"}>
          <a href="#qd" className="page-link ">
            {i}
          </a>
        </li>
      );
    }
    return navigation;
  };
  return (
    <Layout>
      <div className="ms-8">
        <h2>Search For The Item By Name Or Model Or Serial Number</h2>
      </div>
      <div className="flex flex-row ms-8">
        <div className="my-5 togller relative">
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn border border-gray-300 p-3 rounded-xl rounded-e-none border-e-0 h-14 font-semibold w-32 capitalize">
              {selectedCategory ? selectedCategory : "Categorys"}
              <i class="fa-solid fa-caret-down ms-3 "></i>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li
                onClick={() => {
                  setSelectedCategory("ecran");
                }}>
                <a>Ecran</a>
              </li>
              <li
                onClick={() => {
                  setSelectedCategory("accessoires");
                }}>
                <a>Accessoires</a>
              </li>
              <li
                onClick={() => {
                  setSelectedCategory("cable");
                }}>
                <a>Cable</a>
              </li>
            </ul>
          </div>
        </div>
        <div id="Search-Bar" className="my-5">
          <i className="fa fa-search"></i>
          <input
            type="text"
            name="query"
            onChange={(e) => setquery(e.target.value)}
            value={query}
            onKeyPress={handleKeyPress}
            className=" transition-all  h-14 py-3 px-12 rounded-xl border border-gray-300  rounded-s-none  focus:outline-stone-300 "
            placeholder="Search anything..."
          />

          <i className="fa-solid fa-filter rightpen" onClick={GetPcTable}></i>
        </div>
      </div>
      <div
        className="responsive-table overflow-x-auto ms-8"
        style={{ width: "70vw" }}>
        <table className="fs-15 w-full" style={{ width: "65vw" }}>
          <thead>
            {headers?.map((header) => (
              <th key={header} className="tablehead HideCh">
                {header}
              </th>
            ))}
            {headers.length > 0 && <th className="tablehead">Update</th>}
          </thead>
          <tbody>
            {pcTable.map((item, index) => (
              <>
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header} className="tabledata  HideCh capitalize">
                      {header === "date"
                        ? formatDate(item.date)
                        : typeof item[header] === "object"
                        ? Object.values(item[header]).join(" ")
                        : item[header]}
                    </td>
                  ))}

                  <td className="tabledata relative">
                    {" "}
                    <button
                      type="submit"
                      className="bg-green-400 rounded-xl p-2  text-white font-semibold  hover:shadow-md transition-shadow"
                      onClick={() => handleGrabClick(item)}>
                      Grab
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        {headers.length > 0 && (
          <div className="text-center my-8">
            <ul className="pagination flex justify-center">
              <li className="page-item disabled">
                <a
                  href="#qsd"
                  onClick={() => {
                    handlePageClick(currentPage - 1);
                  }}
                  disabled={currentPage === 1}>
                  <i className="fa fa-long-arrow-left" /> Previous
                </a>
              </li>
              {generatePaginationNavigation()}
              <li className="page-item">
                <a
                  href="#qsd"
                  className="page-link"
                  onClick={() => {
                    handlePageClick(currentPage + 1);
                  }}
                  disabled={currentPage === totalPages}>
                  Next <i className="fa fa-long-arrow-right" />
                </a>
              </li>
            </ul>
          </div>
        )}
        {inputVisible && (
          <div className="absolute flex flex-col bg-slate-200 p-4 rounded-lg border left-1/2 top-1/3  shadow-lg">
            <p className="font-semibold p-3 mb-2 text-xl">
              Enter the Ticket Number
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              required={true}
              className="border border-gray-300 rounded-xl focus:outline-gray-400 p-2"
              placeholder="Enter Ticket Number"
            />
            {selectedItem.groupe !== "pc" && "ecran" && (
              <input
                type="number"
                value={count}
                onChange={handleCountChange}
                required={true}
                className="border border-gray-300 rounded-xl focus:outline-gray-400 my-3 p-2"
                placeholder="Quantity"
              />
            )}
            <div className="flex flex-row justify-between my-3">
              <button
                className="bg-green-400 rounded-xl p-2   text-white font-semibold hover:shadow-md transition-shadow"
                onClick={() => handleInputSubmit(count)}>
                Submit
              </button>
              <button
                onClick={handleInputClose}
                className="bg-red-400  rounded-xl p-2  text-white font-semibold hover:shadow-md transition-shadow">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
