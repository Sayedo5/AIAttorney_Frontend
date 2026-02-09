// Text processing utilities

export const capitalizeFirst = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const truncate = (text: string, length: number, suffix: string = "..."): string => {
  if (text.length <= length) return text;
  return text.slice(0, length - suffix.length).trim() + suffix;
};

export const wordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const characterCount = (text: string, includeSpaces: boolean = true): number => {
  return includeSpaces ? text.length : text.replace(/\s/g, "").length;
};

export const sentenceCount = (text: string): number => {
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
};

export const readingTime = (text: string, wordsPerMinute: number = 200): number => {
  const words = wordCount(text);
  return Math.ceil(words / wordsPerMinute);
};

export const removeHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, "");
};

export const normalizeWhitespace = (text: string): string => {
  return text.replace(/\s+/g, " ").trim();
};

export const extractEmails = (text: string): string[] => {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailPattern) || [];
};

export const extractUrls = (text: string): string[] => {
  const urlPattern = /https?:\/\/[^\s]+/g;
  return text.match(urlPattern) || [];
};

export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};
