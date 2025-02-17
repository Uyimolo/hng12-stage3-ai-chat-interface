"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ai: any;
  }
}

import Header from "./Header";
import InputArea from "./InputArea";
import MessageFeed from "./MessageFeed";
import { Message } from "@/types/types";

const ChatInterface = () => {
  // const [detector, setDetector] = useState<any>(null);
  // const [isReady, setIsReady] = useState(false);
  // const [isInitializing, setIsInitializing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //   const initializeLanguageDetector = async () => {
  //     // Prevent multiple initialization attempts
  //     if (isInitializing || detector) return;

  //     setIsInitializing(true);

  //     try {
  //       const languageDetectorCapabilities =
  //         await self.ai.languageDetector.capabilities();
  //       const canDetect = languageDetectorCapabilities.available;

  //       console.log("status", canDetect);

  //       if (canDetect === "no") {
  //         console.log("Language detector is not usable");
  //         setIsInitializing(false);
  //         return;
  //       }

  //       let detectorInstance;
  //       if (canDetect === "readily") {
  //         detectorInstance = await self.ai.languageDetector.create();
  //         setIsReady(true);
  //       } else if (canDetect === "after-download") {
  //         detectorInstance = await self.ai.languageDetector.create({
  //           monitor(m: EventTarget) {
  //             m.addEventListener("downloadprogress", (e: any) => {
  //               console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
  //             });
  //           },
  //         });
  //         await detectorInstance.ready;
  //         setIsReady(true);
  //       }

  //       setDetector(detectorInstance);
  //       // console.log(detectorInstance);
  //     } catch (error) {
  //       console.error("Error initializing language detector:", error);
  //     } finally {
  //       setIsInitializing(false);
  //     }
  //   };

  //   initializeLanguageDetector();

  // }, []);

  // useEffect(() => {
  //   console.log(detector)
  // }, [detector])

  // if (!isReady) {
  //   return <div>Loading language detector...</div>;
  // }

  return (
    <div className="relative px-4 py-2 lg:px-12 lg:py-2">
      <Header />
      <div className="">
        <MessageFeed messages={messages} />
      </div>
      <InputArea setMessages={setMessages} />
    </div>
  );
};

export default ChatInterface;
