"use client";

import { useEffect } from "react";
import useConversation from "@/lib/useConversation";
import MessageInput from "./MessageInputs";
import Messages from "./Messages";
import { useAppSelector } from "@/lib/hooks";

export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className=" px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.name}&nbsp;
              {selectedConversation.lastname}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export function NoChatSelected() {
  const authUser = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.name} ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
}
