import React, { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketContext";
import { extractTime } from "../../utils/extractTime";
import Cookies from "js-cookie";
import axios from "axios";
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;
    socket.on("notify", (notification) => {
      // Check if the notification is already in the state
      const isNotificationExists = notifications.some(
        (n) => n._id === notification._id
      );
      if (!isNotificationExists) {
        setNotifications((oldarray) => [...oldarray, notification]);
      }
    });
    return () => {
      socket.off("notify");
    };
  }, [notifications]);

  useEffect(() => {
    async function fetchNotifications() {
      const notifications = await fetch(
        "http://localhost:3001/api/notifications/get",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      ).then((res) => res.json());
      setNotifications(notifications);
    }
    fetchNotifications();
  }, []);
  const deleteNotification = async (notificationId) => {
    setNotifications((notifications) =>
      notifications.filter(
        (notification) => notification._id !== notificationId
      )
    );
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/notifications/delete${notificationId}`
      );
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };
  return (
    <div>
      <div className="dropdown dropdown-top">
        <i
          tabIndex={0}
          role="button"
          className={`fa-regular text-black z-10 w-8 fa-bell relative  ${
            notifications.length !== 0 && "fa-shake"
          }`}>
          {notifications.length !== 0 && (
            <div className="badge badge-warning badge-xs text-white rounded-full py-2 px-1 absolute top-0 ">
              {notifications.length}
            </div>
          )}
        </i>

        <div
          tabIndex={0}
          className="dropdown-content z-[1] p-0 menu  shadow bg-base-100 rounded-box w-52 ">
          {notifications?.map((notfication) => {
            return (
              <div
                className={`flex flex-row hover:bg-gray-100 rounded-md border-b-2 m-2 border-slate-100  cursor-pointer`}
                onClick={() => deleteNotification(notfication._id)}
                key={notfication._id}>
                <img
                  src={notfication?.senderId.profilePicture}
                  alt="profile"
                  className="w-10 h-10 rounded-full m-2 p-2"
                />
                <div className="flex flex-col ">
                  <span className="font-bold text-nowrap">
                    {notfication?.senderId.name +
                      " " +
                      notfication?.senderId.lastname}
                  </span>
                  <p className="text-sm mt-2 text-slate-500">
                    {notfication?.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
