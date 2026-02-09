// Additional text utilities (extends textUtil.ts)

export * from "./textUtil";

// Urdu/Arabic text utilities
export const isRTL = (text: string): boolean => {
  const rtlChars = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlChars.test(text);
};

export const getTextDirection = (text: string): "ltr" | "rtl" => {
  return isRTL(text) ? "rtl" : "ltr";
};

// Legal text formatting
export const formatSectionNumber = (section: number | string): string => {
  return `Section ${section}.`;
};

export const formatArticleNumber = (article: number | string): string => {
  return `Article ${article}.`;
};

export const formatClauseNumber = (clause: number | string): string => {
  return `Clause ${clause}.`;
};

// Case number formatting
export const formatCaseNumber = (
  type: string,
  number: number,
  year: number
): string => {
  return `${type.toUpperCase()} ${number}/${year}`;
};

export const parseCaseNumber = (
  caseNumber: string
): { type: string; number: number; year: number } | null => {
  const match = caseNumber.match(/^([A-Z]+)\s*(\d+)\/(\d{4})$/i);
  if (match) {
    return {
      type: match[1].toUpperCase(),
      number: parseInt(match[2], 10),
      year: parseInt(match[3], 10),
    };
  }
  return null;
};

// Name formatting for legal documents
export const formatLegalName = (
  firstName: string,
  lastName: string,
  title?: string
): string => {
  const name = `${firstName} ${lastName}`.trim();
  return title ? `${title} ${name}` : name;
};

export const formatPartiesVs = (
  petitioner: string,
  respondent: string
): string => {
  return `${petitioner} vs. ${respondent}`;
};

// Currency formatting for Pakistani Rupees
export const formatPKR = (amount: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(amount);
};
