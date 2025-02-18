export type Message = {
  id: string;
  timestamp: string;
  userPrompt: string;
  detectedLanguage: {
    languageCode: string;
    name: string;
  };
  summarizedText: Summary;
  translatedText: Translation;
};

type Summary = {
  content: string;
  timestamp: string;
};

type Translation = {
  content: string;
  error?: string;
  timestamp: string;
};
