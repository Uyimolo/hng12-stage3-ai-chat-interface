"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ai: any;
  }
}

import Header from "./Header";
import InputArea from "./InputArea";
import MessageFeed from "./MessageFeed";
import { chatType, Message } from "@/types/types";
import Paragraph from "./Paragraph";
import { cn } from "@/lib/utils";

const ChatInterface = () => {
  // const [messages, setMessages] = useState<Message[]>([]);

  const [chats, setChats] = useState<chatType[]>(() => {
    // Load from localStorage if available
    const savedChats = localStorage.getItem("chats");
    return savedChats
      ? JSON.parse(savedChats)
      : [{ id: crypto.randomUUID(), name: "New Chat", messages: [] }];
  });

  const [activeChatId, setActiveChatId] = useState(chats[0].id);
  const [showSidebar, setShowSidebar] = useState(false);

  const createNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      name: `Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const setMessages = (newMessages: Message[]) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages: newMessages } : chat,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // if ("ai" in self && "translator" in self.ai) {
  //   console.log("translator status: working");
  // }

  // if ("ai" in self && "summarizer" in self.ai) {
  //   // The Summarizer API is supported.
  //   console.log("summarizer status: working");
  //   const summarizer = async () => {
  //     const available = await window.ai.summarizer.capabilities();
  //     console.log("summerizer:", available);
  //   };

  //   summarizer();
  // }

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  return (
    <div className="relative h-screen lg:grid lg:grid-cols-[300px,1fr]">
      <div
        className={cn(
          "fixed left-0 z-20 h-screen w-4/5 border-r bg-white px-4",
          showSidebar ? "translate-x-0" : "-translate-x-[100%] lg:translate-x-0 relative",
        )}
      >
        <div className="">
          <Paragraph
            className="cursor-pointer text-center text-2xl font-bold"
            onClick={createNewChat}
          >
            + New Chat
          </Paragraph>
          <Paragraph className="text-center text-sm">
            {chats.length} Chats
          </Paragraph>
        </div>
        <div className="">
          {chats.map((chat) => (
            <div key={chat.id} className="">
              <Paragraph
                className="cursor-pointer"
                onClick={() => setActiveChatId(chat.id)}
              >
                {chat.name}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <Header setShowSidebar={setShowSidebar} />
        <div className="">
          <MessageFeed
            messages={activeChat?.messages || []}
            setMessages={setMessages}
          />
          <InputArea
            messages={activeChat?.messages || []}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
