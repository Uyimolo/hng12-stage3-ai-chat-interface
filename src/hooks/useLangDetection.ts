import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface LanguageDetector {
  ready: Promise<void>;
  detect(
    text: string,
  ): Promise<{ confidence: number; detectedLanguage: string }[]>;
}

declare global {
  interface Window {
    ai?: {
      languageDetector?: {
        capabilities(): Promise<{
          available: "no" | "readily" | "after-download";
        }>;
        create(options?: {
          monitor: (monitor: EventTarget) => void;
        }): Promise<LanguageDetector>;
      };
    };
  }
}

const useLangDetection = () => {
  const [detector, setDetector] = useState<LanguageDetector | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const initializeLanguageDetector = async () => {
      if (isInitializing || detector) return;
      if (typeof window === "undefined" || !window.ai?.languageDetector) {
        toast.error("Language detection is unavailable.");
        return;
      }

      setIsInitializing(true);

      try {
        const capabilities = await window.ai.languageDetector.capabilities();
        if (capabilities.available === "no") return;

        const detectorInstance = await window.ai.languageDetector.create(
          capabilities.available === "after-download"
            ? {
                monitor(m: EventTarget) {
                  m.addEventListener("downloadprogress", (e: any) => {
                    console.log(`Downloading: ${e.loaded} / ${e.total} bytes.`);
                  });
                },
              }
            : undefined,
        );

        if (capabilities.available === "after-download") {
          await detectorInstance.ready;
        }

        setDetector(detectorInstance);
      } catch (err) {
        toast.error("Failed to initialize language detection.");
        console.log(err);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeLanguageDetector();
  }, []);

  const detectLanguage = useCallback(
    async (text: string): Promise<string> => {
      if (!text.trim()) return "";
      if (!detector) throw new Error("Language detector is not initialized");

      try {
        const detected = await detector.detect(text);
        return detected[0]?.detectedLanguage ?? "";
      } catch (err) {
        toast.error("Language detection failed.");
        throw new Error(err instanceof Error ? err.message : "Unknown error");
      }
    },
    [detector],
  );

  return {
    detectLanguage,
    isInitializing,
    isReady: !!detector && !isInitializing,
  };
};

export default useLangDetection;
