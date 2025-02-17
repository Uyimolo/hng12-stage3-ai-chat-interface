export const messages = [
  // User's original input
  {
    id: "msg-1", // Unique ID
    timestamp: "2025-02-17 09:00:00", // Realistic timestamp for user input
    userPrompt: "Hello, how are you?",
    detectedLanguage: "", // Initially empty, will be updated when detected by the AI
    summarizedText: { content: "", timestamp: "" }, // Initially empty, will be updated when summarized
    translatedText: { content: "", timestamp: "" }, // Initially empty, will be updated when translated
  },
  // After AI detects language and responds
  {
    id: "msg-2", // Unique ID
    timestamp: "2025-02-17 09:00:05", // Timestamp for AI's response
    userPrompt: "Hello, how are you?",
    detectedLanguage: "en", // Detected language (AI generated response)
    summarizedText: { content: "", timestamp: "" }, // No summary yet
    translatedText: { content: "", timestamp: "" }, // No translation yet
  },
  // User asks for a summary (text > 150 chars)
  {
    id: "msg-3", // Unique ID
    timestamp: "2025-02-17 09:05:00", // Timestamp for when user requests a summary
    userPrompt: "Can you summarize this text for me?",
    detectedLanguage: "en", // Language detected for summarization
    summarizedText: {
      content: "Summary: Lorem ipsum dolor sit amet.",
      timestamp: "2025-02-17 09:06:00",
    }, // Summarized text (AI response)
    translatedText: { content: "", timestamp: "" }, // No translation yet
  },
  // After AI provides a summary
  {
    id: "msg-4", // Unique ID
    timestamp: "2025-02-17 09:07:00", // Timestamp for AI's summarized response
    userPrompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    detectedLanguage: "en", // Detected language (AI generated)
    summarizedText: {
      content: "Summary: Lorem ipsum dolor sit amet.",
      timestamp: "2025-02-17 09:07:00",
    }, // Summarized text (AI response)
    translatedText: { content: "", timestamp: "" }, // No translation yet
  },
  // User requests translation (e.g., into French)
  {
    id: "msg-5", // Unique ID
    timestamp: "2025-02-17 09:10:00", // Timestamp for translation request
    userPrompt: "Can you translate this text?",
    detectedLanguage: "en", // Detected language for translation
    summarizedText: { content: "", timestamp: "" }, // No summary requested
    translatedText: {
      content: "Translated: Bonjour, comment ça va?",
      timestamp: "2025-02-17 09:11:00",
    }, // Translated text (AI response)
  },
  // AI provides translated response
  {
    id: "msg-6", // Unique ID
    timestamp: "2025-02-17 09:12:00", // Timestamp for AI's translation response
    userPrompt: "Hello, how are you?",
    detectedLanguage: "en", // Detected language (AI response)
    summarizedText: { content: "", timestamp: "" }, // No summary yet
    translatedText: {
      content: "Translated: Bonjour, comment ça va?",
      timestamp: "2025-02-17 09:12:00",
    }, // Translated text (AI response)
  },
];
