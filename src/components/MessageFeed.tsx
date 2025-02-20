// MessageFeed.tsx
import { chatType, Message as MessageType } from "@/types/types";
import Message from "./Message";



const MessageFeed = ({
  messages,
  setMessages,
}: {
  messages: MessageType[];
  setMessages: (newMessages: MessageType[]) => void;
}) => {
  return (
    <div className="h-[calc(100vh-140px)] overflow-y-scroll">
      <div className="mx-auto max-w-[800px] space-y-2 pb-40 pt-20">
        {messages?.map((message) => (
          <Message
            key={message.id}
            message={message}
            messages={messages}
            setMessages={setMessages}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageFeed;
