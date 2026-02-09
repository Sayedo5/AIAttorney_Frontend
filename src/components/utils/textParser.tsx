import React from "react";

interface ParsedSection {
  type: "paragraph" | "heading" | "list" | "quote" | "code";
  content: string;
  level?: number;
}

export const parseMarkdown = (text: string): ParsedSection[] => {
  const lines = text.split("\n");
  const sections: ParsedSection[] = [];
  
  let currentList: string[] = [];
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    
    // Heading
    if (trimmed.startsWith("#")) {
      if (currentList.length) {
        sections.push({ type: "list", content: currentList.join("\n") });
        currentList = [];
      }
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      sections.push({
        type: "heading",
        content: trimmed.replace(/^#+\s*/, ""),
        level,
      });
      return;
    }
    
    // List item
    if (trimmed.match(/^[-*]\s/) || trimmed.match(/^\d+\.\s/)) {
      currentList.push(trimmed.replace(/^[-*\d.]+\s*/, ""));
      return;
    }
    
    // Quote
    if (trimmed.startsWith(">")) {
      if (currentList.length) {
        sections.push({ type: "list", content: currentList.join("\n") });
        currentList = [];
      }
      sections.push({ type: "quote", content: trimmed.replace(/^>\s*/, "") });
      return;
    }
    
    // Code block
    if (trimmed.startsWith("```")) {
      if (currentList.length) {
        sections.push({ type: "list", content: currentList.join("\n") });
        currentList = [];
      }
      // TODO: Handle multi-line code blocks
      return;
    }
    
    // Paragraph
    if (trimmed) {
      if (currentList.length) {
        sections.push({ type: "list", content: currentList.join("\n") });
        currentList = [];
      }
      sections.push({ type: "paragraph", content: trimmed });
    }
  });
  
  if (currentList.length) {
    sections.push({ type: "list", content: currentList.join("\n") });
  }
  
  return sections;
};

export const formatInlineText = (text: string): React.ReactNode => {
  // Bold
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Inline code
  formatted = formatted.replace(/`(.*?)`/g, "<code>$1</code>");
  // Links
  formatted = formatted.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>'
  );
  
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export const extractPlainText = (html: string): string => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};
