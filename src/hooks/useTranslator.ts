import { useCallback } from "react";
import useLangDetection from "./useLangDetection";
import { toast } from "sonner";

interface TranslatorResult {
  content: string;
  error?: string;
}

const useTranslator = () => {
  const { detectLanguage } = useLangDetection();

  const translate = useCallback(
    async (text: string, targetLanguage: string): Promise<TranslatorResult> => {
      //@ts-expect-error could not get proper typing for translator api
      if (typeof window === "undefined" || !window.ai?.translator) {
        toast.error("Translation API is unavailable.");
        return { content: "", error: "Translator API is not available" };
      }

      try {
        const sourceLanguage = await detectLanguage(text);
        //@ts-expect-error could not get proper typing for translator api
        const capabilities = await window.ai.translator.capabilities();
        const available = await capabilities.languagePairAvailable(
          sourceLanguage,
          targetLanguage,
        );

        if (available === "no") {
          toast.error(
            `Translation from ${sourceLanguage} to ${targetLanguage} is unavailable.`,
          );
          return {
            content: "",
            error: `Translation from ${sourceLanguage} to ${targetLanguage} is not available.`,
          };
        }

        //@ts-expect-error could not get proper typing for translator api
        const translatorInstance = await window.ai.translator.create({
          sourceLanguage,
          targetLanguage,
          ...(available === "after-download" && {
            monitor(m: EventTarget) {
              m.addEventListener("downloadprogress", (e) => {
                //@ts-expect-error couldnt get types
                console.log(`Downloading: ${e.loaded} / ${e.total} bytes.`);
              });
            },
          }),
        });

        const translatedText = await translatorInstance.translate(text);
        return { content: translatedText };
      } catch (err) {
        toast.error("Translation failed. Try again.");
        return {
          content: "",
          error: err instanceof Error ? err.message : "Translation failed",
        };
      }
    },
    [detectLanguage],
  );

  return { translate };
};

export default useTranslator;
