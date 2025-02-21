// MessageFeed.tsx
import { Message as MessageType } from "@/types/types";
import Message from "./Message";
import { useEffect, useRef} from "react";

const MessageFeed = ({
  messages,
  setMessages,
  shouldScroll,
  setShouldScroll,
}: {
  messages: MessageType[];
  setMessages: (newMessages: MessageType[]) => void;
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldScroll)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div id="message-feed" className="h-[calc(100vh-140px)] overflow-y-scroll">
      <div className="mx-auto max-w-[800px] space-y-2 pb-4 pt-20 xl:max-w-[1000px]">
        {messages?.map((message) => (
          <Message
            key={message.id}
            message={message}
            messages={messages}
            setMessages={setMessages}
            setShouldScroll={setShouldScroll}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageFeed;
