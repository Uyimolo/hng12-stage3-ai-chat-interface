"use client";

import { messages } from "@/lib/data";
import Paragraph from "./Paragraph";

const MessageFeed = () => {
  return (
    <div className="space-y-2">
      {messages.map((message) => {
        const {
          id,
          timestamp,
          userPrompt,
          detectedLanguage,
          summarizedText,
          translatedText,
        } = message;
        return (
          <div className="flex flex-col">
            {/* user input */}
            <div className="w-fit self-end rounded-xl border p-2 transition duration-300 hover:border-lightblue">
              <Paragraph>{userPrompt}</Paragraph>
              {/* actions on initial message */}
              <div className=""></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageFeed;
