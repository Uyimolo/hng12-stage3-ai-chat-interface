import Header from "./Header";
import InputArea from "./InputArea";
import MessageFeed from "./MessageFeed";

const ChatInterface = () => {
  return (
    <div className="h-screen px-4 py-2 lg:px-12 lg:py-2">
      <Header />
      <MessageFeed />
      <InputArea />
    </div>
  );
};

export default ChatInterface;
