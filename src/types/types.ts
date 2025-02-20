export type Message = {
  id: string;
  timestamp: string;
  userPrompt: string;
  detectedLanguage: {
    languageCode: string;
    name: string;
  };
  summarizedText: Summary | null;
  translations: Translation[]; // Store multiple translations
  edited: boolean; // Track if userPrompt was edited
};

type Summary = {
  content: string;
  timestamp: string;
};

export type Translation = {
  language: string;
  content: string;
  error?: string;
  timestamp: string;
};

export type chatType = { id: string; name: string; messages: Message[] };
