import { useEffect } from "react";
import useConversation from "../lib/useConversation";
import { useSocketContext } from "@/context/SocketContext";
import { useAppDispatch } from "@/lib/hooks";


const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (newMessage) => {
      // Create a new message object with shouldShake property
      const messageWithShake = { ...newMessage, shouldShake: true };
      // Update messages state by adding the new message
      setMessages([...messages, messageWithShake]);
  
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
