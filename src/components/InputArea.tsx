import useLangDetection from "@/hooks/useLangDetection";
import { cn, getLanguageDisplayName, scrollToBottom } from "@/lib/utils";
import { Message } from "@/types/types";
import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import { IoMdSend } from "react-icons/io";

const InputArea = ({
  setMessages,
  messages,
}: {
  messages: Message[];
  setMessages: (newMessages: Message[]) => void;
}) => {
  const [text, setText] = useState("");
  const { detectLanguage, error, isReady } = useLangDetection();

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

      const newMessage = createNewMessage(text.trim());

      // Create new messages array with the new message
      const updatedMessages = messages
        ? [...messages, newMessage]
        : [newMessage];
      setMessages(updatedMessages);

      scrollToBottom();
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
        "absolute bottom-4 left-1/2 h-32 w-[calc(100vw-32px)] max-w-[718px] -translate-x-1/2 rounded-3xl border border-lightgray bg-white p-4 shadow-lg shadow-black/30 transition-all duration-500 md:w-4/5",
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
        className="mx-auto h-24 w-[calc(100%-20px)] resize-none rounded text-sm placeholder:text-sm focus:outline-none disabled:bg-transparent"
      ></textarea>

      {/* actions */}
      <div className="absolute bottom-0 flex h-8 w-full items-center justify-between px-4 pb-2 pr-8">
        <div className="">
          {error && (
            <span className="text-red-500 text-sm">Error: {error}</span>
          )}
        </div>
        <button className="" disabled={!isReady || !text.trim()}>
          <IoMdSend
            className={`text-2xl ${isReady ? "text-blue" : "text-gray-400"}`}
          />
        </button>
      </div>
    </form>
  );
};

export default InputArea;
