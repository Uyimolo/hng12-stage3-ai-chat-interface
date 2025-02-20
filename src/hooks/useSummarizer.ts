import { useCallback, useState } from "react";

type DownloadProgressEvent = {
  loaded: number;
  total: number;
};

const useSummarizer = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const initializeSummarizer = useCallback(async () => {
    const options = {
      // sharedContext: message,
      type: "key-points",
      format: "markdown",
      length: "medium",
    };

    console.log("initializing");

    const capabilities = await window.ai.summarizer.capabilities();
    const available = capabilities.available;

    if (available === "no") {
      throw new Error("Summarizer is not available on this device");
    }

    const summarizerInstance = await window.ai!.summarizer.create(options);

    if (available === "after-download") {
      summarizerInstance.addEventListener(
        "downloadprogress",
        (e: DownloadProgressEvent) => {
          const progress = Math.round((e.loaded / e.total) * 100);
          console.log(`Downloading summarizer: ${progress}%`);
        },
      );
      await summarizerInstance.ready;
    }

    return summarizerInstance;
  }, []);

  const summarize = useCallback(
    async (message: string) => {
      if (typeof window === "undefined" || !window.ai?.summarizer) {
        return { content: "", error: "Summarizer API is not available" };
      }

      if (!message.trim()) {
        return {
          content: "",
          error: "No text provided for summarization",
        };
      }

      setIsInitializing(true);

      try {
        const summarizer = await initializeSummarizer();
        const summary = await summarizer.summarize(message);

        console.log(summary);

        return { content: summary };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to generate summary";

        return {
          content: "",
          error: errorMessage,
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
