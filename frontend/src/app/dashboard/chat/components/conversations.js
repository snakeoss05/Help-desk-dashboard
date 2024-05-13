"use client";

import useGetConversations from "@/hooks/useGetConversations";
import { getRandomEmoji } from "@/app/utils/emojis";
import Conversation from "./conversation";

export default function Conversations() {
  const { loading, conversations } = useGetConversations();
console.log(conversations)
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations != null &&
        conversations.length > 0 &&
        conversations
          .flatMap((conversation) => conversation) // Flatten the array
          .map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation.participants[0]}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.length - 1}
              lastMsg={conversation.messages}
            />
          ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}
