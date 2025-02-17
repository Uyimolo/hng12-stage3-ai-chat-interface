import useLangDetection from "@/hooks/useLangDetection";
import { getLanguageDisplayName, scrollToBottom } from "@/lib/utils";
import { Message } from "@/types/types";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  useCallback,
} from "react";
import { IoMdSend } from "react-icons/io";

const InputArea = ({
  setMessages,
}: {
  setMessages: Dispatch<SetStateAction<Message[]>>;
}) => {
  const [text, setText] = useState("");
  const { detectLanguage, error, isReady } = useLangDetection();

  const createNewMessage = useCallback(
    (text: string): Message => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      timestamp: new Date().toString(),
      userPrompt: text.trim(),
      detectedLanguage: "",
      summarizedText: {
        content: "",
        timestamp: "",
      },
      translatedText: {
        content: "",
        timestamp: "",
      },
    }),
    [],
  );

  const updateMessageLanguage = useCallback(
    (messages: Message[], messageId: string, language: string): Message[] => {
      return messages.map((message) =>
        message.id === messageId
          ? { ...message, detectedLanguage: language }
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

      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, newMessage] : [newMessage],
      );

      scrollToBottom();
      setText("");

      // detect language and set message state to show language
      try {
        const detectedLanguage = await detectLanguage(text);
        const displayLanguage = getLanguageDisplayName(detectedLanguage); // Convert code to display name

        setMessages((prevMessages) =>
          updateMessageLanguage(prevMessages, newMessage.id, displayLanguage),
        );
      } catch (error) {
        console.error("Error detecting language:", error);
        setMessages((prevMessages) =>
          updateMessageLanguage(
            prevMessages,
            newMessage.id,
            "Failed to detect language",
          ),
        );
      }
    },
    [detectLanguage, setMessages],
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  if (!isReady) {
    // You might want to show a loading state or disable the input
    console.log("Language detector is initializing...");
  }

  if (error) {
    // You might want to show an error state
    console.error("Language detector error:", error);
  }

  return (
    <form
      onSubmit={(e) => sendMessage(text, e)}
      className="fixed bottom-4 left-1/2 h-32 w-4/5 max-w-[700px] -translate-x-1/2 rounded-3xl border border-lightblue bg-white shadow"
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
        className="mx-auto h-24 w-[calc(100%-20px)] resize-none rounded-3xl p-3 placeholder:text-sm focus:outline-none disabled:bg-gray-100"
      ></textarea>
      <div className="absolute bottom-0 flex h-8 w-full items-center justify-between px-4 pb-2">
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
