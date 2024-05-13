"use client";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/lib/useConversation";
import useGetMessages from "@/hooks/useGetMessages";
import useListenMessages from "@/hooks/useListenMessages";
export default function Conversation({
  conversation,
  lastIdx,
  emoji,
  lastMsg,
}) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded mb-2 w-80 p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation?.profilePicture} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-400">
              {conversation.name}&nbsp;
              {conversation.lastname}
            </p>
            <span className="text-xl">{emoji}</span>
          </div>
          <p className="text-slate-300 font-normal  text-nowrap w-52 truncate">
            {lastMsg.length > 0 && lastMsg[0].message}
          </p>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
