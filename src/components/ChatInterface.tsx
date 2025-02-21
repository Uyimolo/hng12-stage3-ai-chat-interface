"use client";
import { useEffect, useState } from "react";

import Header from "./Header";
import InputArea from "./InputArea";
import MessageFeed from "./MessageFeed";
import { chatType, Message } from "@/types/types";
import Sidebar from "./Sidebar";

const ChatInterface = () => {
  const [chats, setChats] = useState<chatType[]>(() => {
    // Load from localStorage if available
    const savedChats = localStorage.getItem("chats");
    return savedChats
      ? JSON.parse(savedChats)
      : [{ id: crypto.randomUUID(), name: "New Chat", messages: [] }];
  });

  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

  // const [activeChatId, setActiveChatId] = useState(chats[0].id);

  const [activeChatId, setActiveChatId] = useState(() => {
    // Retrieve active chat from localStorage if available
    const savedActiveChatId = localStorage.getItem("activeChatId");
    return savedActiveChatId ? savedActiveChatId : chats[0].id;
  });

  useEffect(() => {
    localStorage.setItem("activeChatId", activeChatId);
  }, [activeChatId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const createNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      name: `Conversation ${chats.length === 0 ? "1" : chats.length + 1}`,
      messages: [],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
  };

  const renameChat = (id: string, newName: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, name: newName } : chat,
      ),
    );
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const setMessages = (newMessages: Message[]) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages: newMessages } : chat,
      ),
    );
  };

  const deleteChat = (chatId: string) => {
    const currentChatId = activeChatId;

    if (chats.length === 1) {
      setChats([
        {
          id: crypto.randomUUID(),
          name: "Chat 1",
          messages: [],
        },
      ]);
    } else {
      if (activeChatId === chatId) {
        setActiveChatId(chats[0].id);
      } else {
        setActiveChatId(currentChatId);
      }

      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    }
  };

  return (
    <div className="relative h-screen bg-lightBackground dark:bg-darkbackground lg:grid lg:grid-cols-[300px,1fr]">
      <Sidebar
        activeChatId={activeChatId}
        chats={chats}
        setActiveChatId={setActiveChatId}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
        renameChat={renameChat}
      />

      {/* main chat screen */}
      <div className="relative w-full">
        <Header setShowSidebar={setShowSidebar} />
        <div className="h-screen">
          <MessageFeed
            messages={activeChat?.messages || []}
            setMessages={setMessages}
            shouldScroll={shouldScroll}
            setShouldScroll={setShouldScroll}
          />
          <InputArea
            messages={activeChat?.messages || []}
            setMessages={setMessages}
            setShouldScroll={setShouldScroll}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
