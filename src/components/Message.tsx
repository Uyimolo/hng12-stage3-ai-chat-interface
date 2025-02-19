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
import { FaUser } from "react-icons/fa";

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
    <div className="jusitify-end flex flex-col gap-6 px-4 lg:px-12">
      <div className="flex w-full gap-1 self-end">
        <div className="order-2 grid aspect-square w-4 place-content-center self-start rounded-full border border-blue sm:w-8">
          <FaUser
            className="borde w-fit cursor-pointer justify-end rounded-full border-blue text-right text-sm leading-none text-lightblue sm:text-xl"
            onClick={() => removeMessage(id)}
          />
        </div>

        {/* User Message */}
        <div className="flex w-full flex-col">
          <div className="w-full space-y-4 self-end rounded-xl border bg-lightergray p-2 transition duration-300 hover:border-lightblue sm:w-3/5 md:max-w-[500px]">
            <Paragraph>{userPrompt}</Paragraph>

            {/* actions */}
            <div className="justify-en flex w-full flex-wrap items-center gap-1 self-end">
              {userPrompt.trim().length > 150 &&
                detectedLanguage.name.toLowerCase() === "english" && (
                  <Button variant="tertiary">Summarize</Button>
                )}

              {/* <div className="flex items-center gap-1"> */}
              <Button variant="tertiary" onClick={() => handleTranslation()}>
                Translate
              </Button>

              <Select
                onValueChange={(selectedLanguage) =>
                  handleLanguageChange(selectedLanguage)
                }
              >
                <SelectTrigger className="flex w-fit min-w-28 items-center gap-1 border-lightblue bg-white p-1 text-xs text-lightblue hover:bg-lighterblue hover:text-white focus:border-white">
                  <BsTranslate className="text-sm" />
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
              {/* </div> */}
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
      <div className="w-full space-y-4">
        {summarizedText.content && (
          <div className="w-full space-y-1 self-start rounded-xl border bg-lighterblue/30 p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
            <Paragraph>{`Sure here's your summarized text`}</Paragraph>
            <Paragraph>{summarizedText.content}</Paragraph>
          </div>
        )}
        {translatedText.content && (
          <div className="w-full space-y-1 self-start rounded-xl border bg-lighterblue/30 p-2 transition duration-300 hover:border-lightblue md:max-w-[500px]">
            <Paragraph>{`Sure here's your translated text.`}</Paragraph>
            <Paragraph>{translatedText.content}</Paragraph>
            {/* todo: add confidence score */}
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
