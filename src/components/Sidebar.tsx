import { cn } from "@/lib/utils";
import Button from "./Button";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { chatType } from "@/types/types";
import SidebarChatLabel from "./SidebarChatLabel";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  createNewChat,
  chats,
  setActiveChatId,
  activeChatId,
  deleteChat,
  renameChat,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  createNewChat: () => void;
  chats: chatType[];
  setActiveChatId: (value: string) => void;
  activeChatId: string;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newName: string) => void;
}) => {
  return (
    <div
      className={cn(
        "fixed left-0 z-20 h-screen w-4/5 max-w-[350px] space-y-10 border-r bg-lightBackground transition duration-500 ease-in-out dark:bg-darkbackground lg:relative lg:w-[300px] lg:max-w-[300px]",
        showSidebar ? "translate-x-0" : "-translate-x-[100%] lg:translate-x-0",
      )}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <Button
          variant="secondary"
          // className="p-1"
          onClick={createNewChat}
          icon={FaPlus}
        >
          New Chat
        </Button>

        <button
          className="hover:bg-lightergray grid aspect-square w-6 cursor-pointer place-content-center rounded-sm transition duration-300 lg:hidden lg:w-12 lg:rounded-xl"
          onClick={() => setShowSidebar(false)}
        >
          <FaTimes className="text-lightgray text-xl" />
        </button>
      </div>

      <div className="h-[70vh] space-y-2 overflow-y-auto px-4">
        {chats?.map((chat) => (
          <SidebarChatLabel
            renameChat={renameChat}
            key={chat.id}
            deleteChat={deleteChat}
            chat={chat}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            setShowSidebar={setShowSidebar}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
