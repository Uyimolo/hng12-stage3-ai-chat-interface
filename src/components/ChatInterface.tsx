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

  if ("ai" in self && "summarizer" in self.ai) {
    // The Summarizer API is supported.
    console.log("summarizer status: working");
    const summarizer = async () => {
      const available = await window.ai.summarizer.capabilities();
      console.log("summerizer:", available);
    };

    summarizer();
  }

  return (
    <div className="relative h-screen py-2 lg:py-2">
      <Header />
      <div className="h-[calc(100vh-140px)] bg-blac overflow-y-scroll">
        <MessageFeed setMessages={setMessages} messages={messages} />
      </div>
      <InputArea messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default ChatInterface;
