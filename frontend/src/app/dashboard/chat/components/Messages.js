"use client";
import { useEffect, useRef } from "react";
import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "@/hooks/useListenMessages";

export default function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 py-2 flex-1 overflow-auto bg-slate-100">
      {!loading &&
        messages.length > 0 &&
        messages?.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}
