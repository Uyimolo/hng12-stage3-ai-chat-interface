"use client";
import Button from "./Button";
import { Message as MessageType } from "@/types/types";

import { Dispatch, SetStateAction } from "react";
import useTranslator from "@/hooks/useTranslator";
import Message from "./Message";

const MessageFeed = ({
  messages,
  setMessages,
}: {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
}) => {
  return (
    <div className="mx-auto max-w-[1000px] space-y-6 pb-40 pt-20 lg:px-12">
      {messages?.map((message) => (
        <Message key={message.id} message={message} setMessages={setMessages} />
      ))}
    </div>
  );
};

export default MessageFeed;
