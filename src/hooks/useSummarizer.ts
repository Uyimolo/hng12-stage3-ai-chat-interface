import { useCallback, useState } from "react";
import { toast } from "sonner";

type DownloadProgressEvent = {
  loaded: number;
  total: number;
};

const useSummarizer = () => {
  const [isInitializing, setIsInitializing] = useState(false);

  const initializeSummarizer = useCallback(async () => {
    //@ts-expect-error could not get proper typing for summarizer api could not get proper typing for summarizer api could not get proper typing for summarizer api
    if (typeof window === "undefined" || !window.ai?.summarizer) {
      toast.error("Summarizer API is unavailable.");
      throw new Error("Summarizer API is not available");
    }

    try {
      //@ts-expect-error could not get proper typing for summarizer api could not get proper typing for summarizer api could not get proper typing for summarizer api
      const capabilities = await window.ai.summarizer.capabilities();
      if (capabilities.available === "no") {
        toast.error("Summarizer is not available on this device.");
        throw new Error("Summarizer is not available on this device");
      }

      //@ts-expect-error could not get proper typing for summarizer api could not get proper typing for summarizer api could not get proper typing for summarizer api
      const summarizerInstance = await window.ai.summarizer.create({
        type: "key-points",
        format: "markdown",
        length: "medium",
      });

      if (capabilities.available === "after-download") {
        summarizerInstance.addEventListener(
          "downloadprogress",
          (e: DownloadProgressEvent) => {
            console.log(
              `Downloading summarizer: ${Math.round((e.loaded / e.total) * 100)}%`,
            );
          },
        );
        await summarizerInstance.ready;
      }

      return summarizerInstance;
    } catch (err) {
      toast.error("Failed to initialize summarizer.");
      throw new Error(
        err instanceof Error ? err.message : "Initialization failed",
      );
    }
  }, []);

  const summarize = useCallback(
    async (message: string) => {
      if (!message.trim())
        return { content: "", error: "No text provided for summarization" };

      setIsInitializing(true);

      try {
        const summarizer = await initializeSummarizer();
        const summary = await summarizer.summarize(message);
        return { content: summary };
      } catch (err) {
        toast.error("Summarization failed.");
        return {
          content: "",
          error:
            err instanceof Error ? err.message : "Failed to generate summary",
        };
      } finally {
        setIsInitializing(false);
      }
    },
    [initializeSummarizer],
  );

  return { summarize, isInitializing };
};

export default useSummarizer;
