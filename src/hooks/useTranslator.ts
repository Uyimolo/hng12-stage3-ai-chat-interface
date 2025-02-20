import { useCallback } from "react";
import useLangDetection from "./useLangDetection";

interface TranslatorResult {
  content: string;
  error?: string;
}

const useTranslator = () => {
  const { detectLanguage } = useLangDetection();

  const translate = useCallback(
    async (text: string, targetLanguage: string): Promise<TranslatorResult> => {
      // Check if API is available
      if (typeof window === "undefined" || !window.ai?.translator) {
        return { content: "", error: "Translator API is not available" };
      }

      try {
        // Detect source language
          const sourceLanguage = await detectLanguage(text);
          // console.log('detected lang', sourceLanguage)

        // Check capabilities
        const capabilities = await window.ai.translator.capabilities();
        const available = await capabilities.languagePairAvailable(
          sourceLanguage,
          targetLanguage,
          );
          
          console.log("Available pair translation", available)

        if (available === "no") {
          return {
            content: "",
            error: `Translation from ${sourceLanguage} to ${targetLanguage} is not available.`,
          };
        }

        // Create translator instance
        const translatorInstance = await window.ai.translator.create({
          sourceLanguage,
          targetLanguage,
          ...(available === "after-download" && {
            monitor(m: EventTarget) {
                  m.addEventListener("downloadprogress", (e: any) => {
                  console.log('downloading')
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          }),
        });

        // Wait for translator to be ready if needed
        // if (available === "after-download") {
        //   await translatorInstance.ready;
        // }

        // Perform translation
        const translatedText = await translatorInstance.translate(text);

        return { content: translatedText };
      } catch (err) {
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
