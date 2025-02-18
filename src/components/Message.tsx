import { FaTrash } from "react-icons/fa6";
import Paragraph from "./Paragraph";
import useTranslator from "@/hooks/useTranslator";
import { Dispatch, SetStateAction, useState } from "react";
import { Message as MessageType } from "@/types/types";
import Button from "./Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BsTranslate } from "react-icons/bs";

type Language = {
  label: string;
  value: string;
  selected: boolean;
};

const languages: Language[] = [
  { label: "English", value: "en", selected: true },
  { label: "Spanish", value: "es", selected: false },
  { label: "French", value: "fr", selected: false },
  { label: "Japanese", value: "ja", selected: false },
  { label: "Russian", value: "ru", selected: false },
  { label: "Portuguese", value: "pt", selected: false },
  { label: "Turkish", value: "tr", selected: false },
];

const Message = ({
  message,
  setMessages,
}: {
  message: MessageType;
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
}) => {
  const { translate } = useTranslator();

  const [languageOptions, setLanguageOptions] = useState(languages);

  const { id, userPrompt, detectedLanguage, summarizedText, translatedText } =
    message;

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const handleTranslation = async () => {
    const targetLanguage = languageOptions.find(
      (language) => language.selected,
    );

    if (!targetLanguage) {
      console.log("Please select a language to translate");
      return;
    } // If no target language is selected, do nothing.

    if (targetLanguage?.value === detectedLanguage.languageCode) {
      console.log("Detected language is the same as the target language");

      return; // Do nothing if the detected language is the same as the target language
    }

    const result = await translate(userPrompt, targetLanguage.value);

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              translatedText: {
                content: result.content,
                timestamp: new Date().toISOString(),
                error: result.error,
              },
            }
          : msg,
      ),
    );
  };

  const handleLanguageChange = (language: string) => {
    setLanguageOptions((prev) =>
      prev.map((option) =>
        option.value === language
          ? { ...option, selected: true }
          : { ...option, selected: false },
      ),
    );
  };
  return (
    <div className="jusitify-end flex flex-col gap-6">
      <div className="flex gap-2 self-end">
        <FaTrash
          className="w-fit cursor-pointer justify-end text-right text-sm text-lightblue"
          onClick={() => removeMessage(id)}
        />
        <div className="self-end">
          <div className="xs:max-w-[330px] w-fit max-w-[280px] space-y-4 rounded-xl border bg-lightergray p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
            <Paragraph>{userPrompt}</Paragraph>
            <div className="flex w-full items-center justify-end gap-2 self-end">
              {userPrompt.trim().length > 150 &&
                detectedLanguage.name.toLowerCase() === "english" && (
                  <Button variant="tertiary">Summarize</Button>
                )}

              <div className="flex items-center gap-2">
                <Button variant="tertiary" onClick={() => handleTranslation()}>
                  Translate
                </Button>

                <Select
                  onValueChange={(selectedLanguage) =>
                    handleLanguageChange(selectedLanguage)
                  }
                >
                  <SelectTrigger className="flex w-full min-w-40 items-center gap-1 hover:text-white border-lightblue bg-white text-xs text-lightblue hover:bg-lighterblue focus:border-white">
                    <BsTranslate className="text-xl" />
                    <SelectValue
                      placeholder={`${languageOptions[0].label}`}
                      //   defaultValue={languageOptions[0].value}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((language, index) => (
                      <SelectItem key={index + 1} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {detectedLanguage && (
            <div className="">
              <Paragraph variant="small" className="text-right">
                {detectedLanguage.name}
              </Paragraph>
            </div>
          )}
        </div>
          </div>
          
          {/* Ai responses */}
      <div className="space-y-4">
        {summarizedText.content && (
          <div className="xs:max-w-[330px] w-fit max-w-[300px] space-y-1 self-start rounded-xl border bg-lighterblue/30 p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
            <Paragraph>{`Sure here's your summarized text`}</Paragraph>
            <Paragraph>{summarizedText.content}</Paragraph>
          </div>
        )}
        {translatedText.content && (
          <div className="xs:max-w-[330px] w-fit max-w-[300px] space-y-1 self-start rounded-xl border p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
            <Paragraph>{`Sure here's your translated text.`}</Paragraph>
            <Paragraph>{translatedText.content}</Paragraph>
          </div>
        )}
        {translatedText.error && (
          <div className="text-red-500">
            <Paragraph>Translation error: {translatedText.error}</Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
