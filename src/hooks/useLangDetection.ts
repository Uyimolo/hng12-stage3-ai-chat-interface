import { useCallback, useEffect, useState } from "react";

interface LanguageDetector {
  ready: Promise<void>;
  detect(
    text: string,
  ): Promise<{ confidence: number; detectedLanguage: string }[]>;
}

interface LanguageDetectorCapabilities {
  capabilities: "no" | "readily" | "after-download";
}

const useLangDetection = () => {
  const [detector, setDetector] = useState<LanguageDetector | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the detector
  useEffect(() => {
    const initializeLanguageDetector = async () => {
      // Prevent multiple initialization attempts
      if (isInitializing || detector) return;

      setIsInitializing(true);

      try {
        const languageDetectorCapabilities =
          await self.ai.languageDetector?.capabilities();
        const canDetect = languageDetectorCapabilities.available;

        console.log("status", canDetect);

        if (canDetect === "no") {
          console.log("Language detector is not usable");
          setIsInitializing(false);
          return;
        }

        let detectorInstance;
        if (canDetect === "readily") {
          detectorInstance = await self.ai.languageDetector.create();
        } else if (canDetect === "after-download") {
          detectorInstance = await self.ai.languageDetector.create({
            monitor(m: EventTarget) {
              m.addEventListener("downloadprogress", (e: any) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
          await detectorInstance.ready;
        }

        setDetector(detectorInstance);
        // console.log(detectorInstance);
      } catch (error) {
        console.error("Error initializing language detector:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeLanguageDetector();
  }, []);

  // The main detection function
  const detectLanguage = useCallback(
    async (text: string): Promise<string> => {
      if (!text.trim()) {
        return "";
      }

      if (error) {
        throw new Error(error);
      }

      if (!detector) {
        throw new Error("Language detector not initialized");
      }

      try {
        const detectedLanguage = await detector.detect(text);
        return detectedLanguage[0].detectedLanguage;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Language detection failed";
        console.error("Language detection error:", err);
        throw new Error(errorMessage);
      }
    },
    [detector, error],
  );

  return {
    detectLanguage,
    isInitializing,
    error,
    isReady: !!detector && !isInitializing,
  };
};

export default useLangDetection;
