"use client";

// import { messages } from "@/lib/data";
import Paragraph from "./Paragraph";
import Button from "./Button";
import { Message } from "@/types/types";

const MessageFeed = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="mx-auto max-w-[1000px] space-y-6 pb-40 pt-20 lg:px-12">
      {messages?.map((message) => {
        const {
          id,
          timestamp,
          userPrompt,
          detectedLanguage,
          summarizedText,
          translatedText,
        } = message;
        return (
          <div key={id} className="flex flex-col gap-6">
            {/* user input */}
            <div className="self-end">
              <div className="xs:max-w-[330px] bg-lightergray w-fit max-w-[300px] space-y-4 rounded-xl border p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
                <Paragraph className="">{userPrompt}</Paragraph>
                {/* actions on initial message */}
                <div className="flex w-full items-center justify-end gap-2 self-end">
                  {userPrompt.trim().length > 150 && (
                    <Button variant="tertiary">Summarize</Button>
                  )}
                  <Button variant="tertiary">Translate</Button>
                </div>
              </div>
              <Paragraph>{detectedLanguage}</Paragraph>
            </div>

            {/* ai response */}

            <div className="space-y-4">
              {summarizedText.content && (
                <div className="xs:max-w-[330px] w-fit max-w-[300px] space-y-1 self-start rounded-xl border bg-lighterblue/30 p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
                  <Paragraph>{`Sure here's your summarized text`}</Paragraph>

                  <Paragraph>{summarizedText.content}</Paragraph>
                </div>
              )}

              {translatedText.content && (
                <div className="xs:max-w-[330px] w-fit max-w-[300px] space-y-1 self-start rounded-xl border p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
                  <Paragraph>{`Sure here's your translated text`}</Paragraph>

                  <Paragraph>{translatedText.content}</Paragraph>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageFeed;
