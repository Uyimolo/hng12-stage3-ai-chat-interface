import { FaTrash } from "react-icons/fa6";
import { BsTranslate } from "react-icons/bs";
import Paragraph from "./Paragraph";
import Button from "./Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { useEffect, useRef, useState } from "react";
import useTranslator from "@/hooks/useTranslator";
import useSummarizer from "@/hooks/useSummarizer";
import { Message as MessageType, Translation } from "@/types/types";
import { getLanguageDisplayName } from "@/lib/utils";
import { toast } from "sonner";

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "Japanese", value: "ja" },
  { label: "Russian", value: "ru" },
  { label: "Portuguese", value: "pt" },
  { label: "Turkish", value: "tr" },
];

const Message = ({
  message,
  setMessages,
  messages,
  setShouldScroll,
}: {
  message: MessageType;
  messages: MessageType[];
  setMessages: (newMessages: MessageType[]) => void;
  setShouldScroll: (shouldScroll: boolean) => void;
}) => {
  const { translate } = useTranslator();
  const { summarize } = useSummarizer();
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0].value);

  const lastTransRef = useRef<HTMLDivElement | null>(null);

  const summaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastTransRef.current) {
      lastTransRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [message.translations]);

  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [message.summarizedText]);

  const {
    id,
    userPrompt,
    detectedLanguage,
    summarizedText,
    translations = [],
  } = message;

  const removeMessage = (messageId: string) => {
    setShouldScroll(false);
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages);
  };

  const updateMessageTranslations = (
    messageId: string,
    newTranslations: Translation[],
  ) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              translations: newTranslations,
            }
          : msg,
      ),
    );
  };

  const createTranslationObject = (
    language: string,
    content: string,
  ): Translation => ({
    language,
    content,
    timestamp: new Date().toISOString(),
  });

  const updateTranslationState = (
    currentTranslations: Translation[],
    language: string,
    content: string,
  ): Translation[] => {
    const existingIndex = currentTranslations.findIndex(
      (translation) => translation.language === language,
    );

    const newTranslation = createTranslationObject(language, content);

    if (existingIndex !== -1) {
      return currentTranslations.map((translation, index) =>
        index === existingIndex ? newTranslation : translation,
      );
    }

    return [...currentTranslations, newTranslation];
  };

  const getExistingTranslation = (
    translations: Translation[],
    language: string,
  ): Translation | undefined => {
    return translations.find(
      (translation) =>
        translation.language === language &&
        translation.content !== "Translating...",
    );
  };

  const handleTranslation = async () => {
    if (selectedLang === detectedLanguage.languageCode) {
      toast.info("Cannot translate to same language");
      return;
    }

    setShouldScroll(false);

    // Check for existing valid translation
    const existingTranslation = getExistingTranslation(
      translations,
      selectedLang,
    );
    if (existingTranslation && existingTranslation.content !== "Error") {
      console.log("Using existing translation");
      return; // Translation already exists, no need to make API call
    }

    // Set "Translating..." state
    const translatingTranslations = updateTranslationState(
      translations,
      selectedLang,
      "Translating...",
    );
    updateMessageTranslations(id, translatingTranslations);

    try {
      const result = await translate(userPrompt, selectedLang);

      if (result) {
        const currentMessage = messages.find((msg) => msg.id === id);
        if (!currentMessage) return;

        const finalTranslations = updateTranslationState(
          currentMessage.translations,
          selectedLang,
          result.content || "Error",
        );
        updateMessageTranslations(id, finalTranslations);
      }
    } catch (error) {
      console.error("Translation error:", error);

      const errorTranslations = updateTranslationState(
        translations,
        selectedLang,
        "Translation failed",
      );
      updateMessageTranslations(id, errorTranslations);
    }
  };

  const summarizeText = async () => {
    setShouldScroll(false);

    const summary = await summarize(userPrompt);
    const updatedMessages = messages.map((msg) =>
      msg.id === id
        ? {
            ...msg,
            summarizedText: {
              content: summary.content || summary.error,
              timestamp: new Date().toISOString(),
            },
          }
        : msg,
    );
    setMessages(updatedMessages);
  };

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-12">
      {/* User Message */}
      <div className="group flex w-[95%] items-start justify-end gap-1 self-end md:gap-2">
        <div className="relative w-full max-w-[400px] justify-self-end rounded-xl border border-transparent bg-darkbackground/10 p-2 dark:bg-lightBackground/10">
          {/* Delete Icon - Top Right */}
          {/* <button
            className="hover:text-red-500 absolute -right-6 top-2 text-white"
            onClick={() => removeMessage(id)}
            aria-label="Delete message"
          >
            <FaTrash className="text-sm" />
          </button> */}

          <Paragraph className="text-darkgray">{userPrompt}</Paragraph>
          <div className="flex justify-end">
            {detectedLanguage && (
              <Paragraph
                variant="small"
                className="text-lightblue mt-2 text-right"
              >
                Language: {detectedLanguage.name}
              </Paragraph>
            )}
          </div>
          {/* </div> */}

          {/* Actions */}
          <div className="flex w-full flex-wrap items-center gap-1 pt-2">
            {userPrompt.length > 150 &&
              detectedLanguage.name.toLowerCase() === "english" && (
                <Button onClick={summarizeText} variant="tertiary">
                  Summarize
                </Button>
              )}

            <Button variant="tertiary" onClick={handleTranslation}>
              Translate
            </Button>

            <Select onValueChange={setSelectedLang}>
              <SelectTrigger className="h-[34px] min-w-28 max-w-fit gap-1 border-darkbackground bg-white p-1 text-xs font-medium text-textLight hover:bg-hover/10 dark:hover:bg-white/80">
                <BsTranslate className="text-sm" />
                <SelectValue placeholder={LANGUAGES[0].label} />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="tertiary" onClick={() => removeMessage(id)}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* AI Responses */}
      <div className="w-[95%] space-y-4">
        {summarizedText?.content && (
          <div
            ref={summaryRef}
            className="hover:border-lightblue max-w-[400px] space-y-3 rounded-xl border border-transparent bg-darkbackground/20 p-2 dark:bg-lightBackground/20"
          >
            <Paragraph>{`Here's your summarized text:`}</Paragraph>
            <Paragraph>{summarizedText.content}</Paragraph>
          </div>
        )}
        {translations
          .filter(
            (translation) =>
              translation.content !== "Error" &&
              translation.content !== "Translation failed",
          )
          .map((translation, index) => (
            <div
              ref={index === translations.length - 1 ? lastTransRef : null}
              key={index}
              className="hover:border-lightblue max-w-[400px] space-y-3 rounded-xl border border-transparent bg-darkbackground/20 p-2 dark:bg-lightBackground/20"
            >
              <Paragraph>{`Sure, here's your translation in ${getLanguageDisplayName(translation.language)}:`}</Paragraph>
              <Paragraph className="text-darkgray">
                {translation.content}
              </Paragraph>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Message;
