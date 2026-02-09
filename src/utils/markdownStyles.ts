// Markdown styling utilities for legal documents

export const legalMarkdownStyles = {
  heading1: "text-2xl font-bold text-foreground mb-4 mt-6",
  heading2: "text-xl font-semibold text-foreground mb-3 mt-5",
  heading3: "text-lg font-medium text-foreground mb-2 mt-4",
  paragraph: "text-base text-foreground mb-4 leading-relaxed",
  list: "list-disc list-inside mb-4 space-y-1",
  orderedList: "list-decimal list-inside mb-4 space-y-1",
  listItem: "text-foreground pl-2",
  blockquote: "border-l-4 border-primary pl-4 italic text-muted-foreground my-4",
  code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
  codeBlock: "bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4",
  link: "text-primary underline hover:text-primary/80",
  strong: "font-semibold",
  emphasis: "italic",
  citation: "text-primary font-medium",
  sectionNumber: "font-bold text-primary mr-2",
};

export const applyLegalFormatting = (html: string): string => {
  let formatted = html;

  // Style section numbers (e.g., "Section 1.", "Article 2.")
  formatted = formatted.replace(
    /\b(Section|Article|Clause|Rule|Order)\s+(\d+[a-zA-Z]?)\b/g,
    '<span class="font-semibold text-primary">$1 $2</span>'
  );

  // Style legal citations
  formatted = formatted.replace(
    /\b(PLD|MLD|CLC|SCMR|PCrLJ|YLR|PLJ)\s+(\d{4})\s+([A-Za-z\s]+)\s+(\d+)\b/g,
    '<span class="font-medium text-primary italic">$1 $2 $3 $4</span>'
  );

  // Style Act references
  formatted = formatted.replace(
    /\b(\w+\s+Act,?\s*\d{4})\b/g,
    '<span class="font-medium">$1</span>'
  );

  return formatted;
};

export const getMarkdownClass = (type: keyof typeof legalMarkdownStyles): string => {
  return legalMarkdownStyles[type] || "";
};

export const combinedStyles = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};
