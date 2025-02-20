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
import { useState } from "react";
import useTranslator from "@/hooks/useTranslator";
import useSummarizer from "@/hooks/useSummarizer";
import { Message as MessageType, Translation } from "@/types/types";
import { getLanguageDisplayName } from "@/lib/utils";

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
}: {
  message: MessageType;
  messages: MessageType[];
  setMessages: (newMessages: MessageType[]) => void;
}) => {
  const { translate } = useTranslator();
  const { summarize } = useSummarizer();
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0].value);

  const {
    id,
    userPrompt,
    detectedLanguage,
    summarizedText,
    translations = [],
  } = message;

  const removeMessage = (messageId: string) => {
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
    if (selectedLang === detectedLanguage.languageCode) return;

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
    const summary = await summarize(userPrompt);
    const updatedMessages = messages.map((msg) =>
      msg.id === id
        ? {
            ...msg,
            summarizedText: {
              content: summary.content,
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
      <div className="w-[90%] self-end">
        <div className="w-full max-w-[400px] justify-self-end rounded-xl border bg-lightergray p-2 hover:border-lighterblue">
          <Paragraph className="text-darkgray">{userPrompt}</Paragraph>
          <div className="flex justify-end">
            {detectedLanguage && (
              <Paragraph variant="small" className="text-right text-darkgray">
                Language: {detectedLanguage.name}
              </Paragraph>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-1 pt-2">
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
              <SelectTrigger className="h-[34px] min-w-28 max-w-fit border-lightblue bg-white p-1 text-xs text-blue hover:bg-lighterblue hover:text-white">
                <BsTranslate className="text-sm" />
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* AI Responses */}
      <div className="w-full space-y-4">
        {summarizedText?.content && (
          <div className="max-w-[400px] rounded-xl border bg-lighterblue/30 p-2 hover:border-lightblue">
            <Paragraph>{`Summary:`}</Paragraph>
            <Paragraph>{summarizedText.content}</Paragraph>
          </div>
        )}
        {translations.length > 0 &&
          translations.map(({ language, content, timestamp }) => (
            <div
              key={timestamp}
              className="max-w-[400px] rounded-xl border bg-lighterblue/20 p-2 hover:border-lightblue"
            >
              <Paragraph>{`Sure here's your message in ${getLanguageDisplayName(language)}:`}</Paragraph>
              <Paragraph className="text-darkgray">{content}</Paragraph>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Message;
