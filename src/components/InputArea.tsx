import useLangDetection from "@/hooks/useLangDetection";
import { cn, getLanguageDisplayName } from "@/lib/utils";
import { Message } from "@/types/types";
import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import { IoMdSend } from "react-icons/io";

const InputArea = ({
  setMessages,
  messages,
  setShouldScroll,
}: {
  messages: Message[];
  setMessages: (newMessages: Message[]) => void;
  setShouldScroll: (shouldScroll: boolean) => void;
}) => {
  const [text, setText] = useState("");
  const { detectLanguage, isReady } = useLangDetection();

  const createNewMessage = useCallback(
    (text: string): Message => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      timestamp: new Date().toString(),
      userPrompt: text.trim(),
      detectedLanguage: {
        languageCode: "",
        name: "",
      },
      summarizedText: {
        content: "",
        timestamp: "",
      },
      edited: false,
      translations: [],
    }),
    [],
  );

  const updateMessageLanguage = useCallback(
    (
      allMessages: Message[],
      messageId: string,
      name: string,
      languageCode: string,
    ): Message[] => {
      return allMessages.map((message) =>
        message.id === messageId
          ? { ...message, detectedLanguage: { languageCode, name } }
          : message,
      );
    },
    [],
  );

  const sendMessage = useCallback(
    async (text: string, e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!text.trim()) return;
      setShouldScroll(true);
      const newMessage = createNewMessage(text.trim());

      // Create new messages array with the new message
      const updatedMessages = messages
        ? [...messages, newMessage]
        : [newMessage];
      setMessages(updatedMessages);

      // scrollToBottom("message-feed");
      document.getElementById("message-feed")?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      setText("");

      // Detect language and update messages array
      try {
        const detectedLanguage = await detectLanguage(text);
        const displayLanguage = getLanguageDisplayName(detectedLanguage);

        const messagesWithLanguage = updateMessageLanguage(
          updatedMessages,
          newMessage.id,
          displayLanguage,
          detectedLanguage,
        );

        setMessages(messagesWithLanguage);
      } catch (error) {
        console.error("Error detecting language:", error);
      }
    },
    [detectLanguage, setMessages, messages],
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <form
      onSubmit={(e) => sendMessage(text, e)}
      className={cn(
        "border-lightgray absolute bottom-4 left-1/2 h-28 w-[calc(100vw-32px)] max-w-[718px] -translate-x-1/2 rounded-3xl border bg-white p-4 shadow-lg shadow-black/30 transition-all duration-500 dark:bg-darkbackground/20 md:w-4/5 xl:max-w-[980px]",
        !messages.length && "top-1/2 -translate-y-1/2",
      )}
    >
      <textarea
        name="prompt-input"
        id="promptInput"
        value={text}
        onChange={handleChange}
        placeholder={
          isReady
            ? "Type a message to linguify"
            : "Initializing language detector..."
        }
        disabled={!isReady}
        className="mx-auto h-20 w-[calc(100%-24px)] resize-none rounded bg-transparent text-sm text-textLight placeholder:text-sm focus:outline-none disabled:bg-transparent dark:text-textPrimary dark:placeholder:text-textPrimary"
      ></textarea>

      {/* actions */}
      <div className="absolute bottom-0 flex h-8 w-full items-center justify-between px-4 pb-2 pr-8">
        <div className="">
          {/* {error && (
            <span className="text-red-500 text-sm">Error: {error}</span>
          )} */}
        </div>
        <button className="" disabled={!isReady || !text.trim()}>
          <IoMdSend
            className={cn(
              "text-2xl",
              isReady ? "text-textLight" : "text-textLight",
            )}
          />
        </button>
      </div>
    </form>
  );
};

export default InputArea;
