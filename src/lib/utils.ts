import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToBottom = (id: string) => {
  setTimeout(() => {
    window.scrollTo({
      top: document.getElementById(id)?.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
};

export const getLanguageDisplayName = (
  langCode: string,
  locale: string = "en",
) => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(langCode) || langCode;
  } catch (e) {
    console.error("Failed to get language display name:", e);
    return langCode;
  }
};
