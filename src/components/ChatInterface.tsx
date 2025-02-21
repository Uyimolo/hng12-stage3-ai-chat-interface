"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import InputArea from "./InputArea";
import MessageFeed from "./MessageFeed";
import { chatType, Message } from "@/types/types";
import Sidebar from "./Sidebar";
import { v4 as uuidv4 } from "uuid";

const ChatInterface = () => {
  const [chats, setChats] = useState<chatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  // Load chats & activeChatId from localStorage (only on client)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedChats = localStorage.getItem("chats");
      const savedActiveChatId = localStorage.getItem("activeChatId");

      if (savedChats) {
        const parsedChats: chatType[] = JSON.parse(savedChats);
        setChats(parsedChats);
        setActiveChatId(savedActiveChatId || parsedChats[0]?.id || null);
      } else {
        const defaultChat = [
          { id: uuidv4(), name: "Conversation 1", messages: [] },
        ];
        setChats(defaultChat);
        setActiveChatId(defaultChat[0].id);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

  useEffect(() => {
    if (typeof window !== "undefined" && activeChatId) {
      localStorage.setItem("activeChatId", activeChatId);
    }
  }, [activeChatId]);

  const createNewChat = () => {
    const newChat = {
      id: uuidv4(),
      name: `Conversation ${chats.length + 1}`,
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

  const setMessages = (newMessages: Message[]) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages: newMessages } : chat,
      ),
    );
  };

  const deleteChat = (chatId: string) => {
    if (chats.length === 1) {
      const defaultChat = {
        id: uuidv4(),
        name: "Chat 1",
        messages: [],
      };
      setChats([defaultChat]);
      setActiveChatId(defaultChat.id);
    } else {
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));

      if (activeChatId === chatId) {
        setActiveChatId(chats.find((chat) => chat.id !== chatId)?.id || null);
      }
    }
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <div className="relative h-screen bg-lightBackground dark:bg-darkbackground lg:grid lg:grid-cols-[300px,1fr]">
      <Sidebar
        activeChatId={activeChatId || ""}
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
