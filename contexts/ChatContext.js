// Updated ChatProvider.js with comprehensive debugging and fixes

"use client";
import ApiServeces from "@/lib/ApiServeces";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

import { io } from "socket.io-client";
import { SOCKET_URL } from "@/lib/constants";
const chatContext = createContext({});

export function ChatProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Create socket with verbose logging
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    // Connection events
    newSocket.on("connect", () => {
      setConnected(true);
      newSocket.emit("authenticate_user", user._id);
    });

    newSocket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
    });

    newSocket.on("disconnect", (reason) => {
      setConnected(false);
    });

    // Authentication events
    newSocket.on("authentication_success", (data) => {
      newSocket.emit("get_unread_counts");
    });

    newSocket.on("authentication_error", (data) => {
      setError(data.message);
    });

    // Chat events - with extensive logging
    newSocket.on("unread_counts", (data) => {
      setUnreadCounts(data.unreadCounts);
    });

    // THIS IS THE CRITICAL EVENT HANDLER FOR YOUR ISSUE
    newSocket.on("new_message", (data) => {
      // Always add the message to state if we have message data
      if (data && data.message) {
        setMessages((prev) => [...prev, data.message]);

        // Mark as read if this is the selected conversation
        if (
          selectedConversation &&
          (data.chatId === selectedConversation.orderId._id ||
            data.orderId === selectedConversation.orderId._id)
        ) {
          newSocket.emit(
            "mark_messages_read",
            selectedConversation.orderId._id
          );
        } else {
          // Update unread counts for other conversations
          setUnreadCounts((prev) => {
            const newCounts = { ...prev };
            const relevantId = data.chatId || data.orderId;
            if (relevantId) {
              newCounts[relevantId] = (newCounts[relevantId] || 0) + 1;
            }
            return newCounts;
          });
        }
      } else {
        console.error("Received malformed message data:", data);
      }
    });

    newSocket.on("chat_history", (data) => {
      if (data && data.chat && data.chat.messages) {
        setMessages(data.chat.messages);
      }
    });

    newSocket.on("messages_read", (data) => {
      // Update UI to show messages have been read
    });

    newSocket.on("error", (data) => {
      setError(data.message);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Join a specific chat - with improved logging
  const joinChat = useCallback(
    (chat) => {
      if (!socket || !chat) {
        return;
      }

      setLoading(true);
      setSelectedConversation(chat);

      socket.emit("join_chat", chat.orderId._id);

      // Mark messages as read
      socket.emit("mark_messages_read", chat.orderId._id);

      // Update unread counts
      setUnreadCounts((prev) => {
        const newCounts = { ...prev };
        delete newCounts[chat.orderId._id];
        return newCounts;
      });

      setLoading(false);
    },
    [socket]
  );

  // Send a message - with improved error handling
  const sendMessage = useCallback(
    (content) => {
      if (!socket) {
        return;
      }

      if (!selectedConversation) {
        return;
      }

      if (!content || content.trim() === "") {
        return;
      }

      const messageData = {
        orderId: selectedConversation.orderId._id,
        content,
      };

      socket.emit("send_message", messageData);
    },
    [socket, selectedConversation]
  );

  // Get chats - with improved error handling
  const getAllChats = async () => {
    try {
      const res = await ApiServeces.fetchUsersChat(user._id);

      if (res.data.success) {
        const chats = res.data.chats;

        setChats(chats);
      } else {
        console.error("Failed to fetch chats:", res.data);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      setError("Failed to load chats");
    }
  };

  useEffect(() => {
    if (user) {
      getAllChats();
    }
  }, [user]);

  const value = {
    socket,
    connected,
    messages,
    chats,
    setMessages,
    setChats,
    selectedConversation,
    setSelectedConversation,
    loading,
    error,
    unreadCounts,
    joinChat,
    sendMessage,
    refreshChats: getAllChats,
  };

  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
}

export const useChat = () => {
  return useContext(chatContext);
};
