import { chatType } from "@/types/types";
import React, { useState } from "react";
import Paragraph from "./Paragraph";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscKebabVertical } from "react-icons/vsc";
import { cn } from "@/lib/utils";

const SidebarChatLabel = ({
  chat,
  activeChatId,
  setActiveChatId,
  deleteChat,
  renameChat,
  setShowSidebar,
}: {
  chat: chatType;
  activeChatId: string;
  setActiveChatId: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newName: string) => void;
  setShowSidebar: (showSidebar: boolean) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(chat.name);

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chat.id);
  };

  return (
    <div
      key={chat.id}
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-xl text-textLight transition duration-300 hover:bg-hover hover:text-white",
        activeChatId === chat.id && "text-darkgray bg-hover",
      )}
      onClick={() => {
        if (!isEditing) {
          setActiveChatId(chat.id);
        }
        setShowSidebar(false);
      }}
    >
      {!isEditing ? (
        <div className="flex w-full items-center justify-between px-4 py-3">
          <Paragraph
            className={cn(
              "text-textLight group-hover:text-textPrimary dark:text-textPrimary",
              activeChatId === chat.id && "bg-hover text-textPrimary",
            )}
          >
            {chat.name}
          </Paragraph>

          <DropdownMenu>
            <DropdownMenuTrigger
              className=""
              onClick={(e) => e.stopPropagation()}
            >
              <VscKebabVertical className={cn("dark:text-white", activeChatId === chat.id && "text-white")} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-sm dark:bg-lightBackground">
              <DropdownMenuLabel className="text-sm dark:text-textLight">
                Chat actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-textLight"
                onClick={handleRenameClick}
              >
                Rename Chat
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-textLight"
                onClick={handleDeleteClick}
              >
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className={cn(
            "mx-4 my-2 w-full rounded-md border-none px-4 py-1 text-sm focus:outline-none",
            chat.id === activeChatId && "text-textLight",
          )}
          onBlur={() => {
            renameChat(chat.id, newName || chat.name);
            setIsEditing(false);
          }}
          autoFocus
        />
      )}
    </div>
  );
};

export default SidebarChatLabel;
