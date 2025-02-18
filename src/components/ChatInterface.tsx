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
import { Message } from "@/types/types";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  if ("ai" in self && "translator" in self.ai) {
    console.log("translator status: working");
  }

  return (
    <div className="relative px-4 py-2 lg:px-12 lg:py-2">
      <Header />
      <div className="">
        <MessageFeed setMessages={setMessages} messages={messages} />
      </div>
      <InputArea messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default ChatInterface;
