export type Message = {
  id: string;
  timestamp: string;
  userPrompt: string;
  detectedLanguage: string;
  summarizedText: Summary;
  translatedText: Translation;
};

type Summary = {
  content: string;
  timestamp: string;
};

type Translation = {
  content: string;
  timestamp: string;
};
