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

  const sendMessage = useCallback(
    async (text: string, e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!text.trim()) return;

      const id = Math.floor(
        Number(new Date()) + Math.random() * 1000000,
      ).toString();

      const newMessage: Message = {
        id: id,
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
      };

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
       prevMessages.map((message) =>
         message.id === id
           ? { ...message, detectedLanguage: displayLanguage }
           : message,
       ),
     );
      } catch (error) {
        console.error("Error detecting language:", error);
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === id
              ? { ...message, detectedLanguage: "Error detecting language" }
              : message,
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
