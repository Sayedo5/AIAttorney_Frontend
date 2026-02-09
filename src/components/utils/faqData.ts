export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is AI Attorney?",
    answer: "AI Attorney is an AI-powered legal assistant designed to help legal professionals with research, document drafting, case management, and more. It provides instant access to legal knowledge and streamlines your workflow.",
    category: "General",
  },
  {
    id: "2",
    question: "How accurate is the legal information provided?",
    answer: "Our AI is trained on extensive legal databases and provides highly accurate information. However, we recommend verifying critical information with official sources and consulting with qualified legal professionals for case-specific advice.",
    category: "General",
  },
  {
    id: "3",
    question: "How do I start a new chat?",
    answer: "Simply tap on the Chat tab in the bottom navigation, then tap the 'New Chat' button or start typing your query in the input field. You can also access chat history from the drawer menu.",
    category: "Features",
  },
  {
    id: "4",
    question: "Can I save and organize my research?",
    answer: "Yes! You can bookmark cases, save document drafts, and organize your research in the Library section. All your saved items are accessible from the Library tab.",
    category: "Features",
  },
  {
    id: "5",
    question: "How do I draft legal documents?",
    answer: "Navigate to the Documents tab and select 'Draft Document'. Choose from our templates or start from scratch. Our AI assistant can help you with formatting, language, and legal accuracy.",
    category: "Features",
  },
  {
    id: "6",
    question: "What subscription plans are available?",
    answer: "We offer Free, Professional, and Enterprise plans. The Free plan includes basic features, while Professional and Enterprise plans unlock unlimited chats, advanced document drafting, and priority support.",
    category: "Subscription",
  },
  {
    id: "7",
    question: "How do I upgrade my plan?",
    answer: "Go to Settings > Subscription and select 'Upgrade Plan'. Choose your preferred plan and complete the payment process. Your new features will be activated immediately.",
    category: "Subscription",
  },
  {
    id: "8",
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption for all data transmission and storage. Your conversations and documents are private and never shared with third parties.",
    category: "Privacy",
  },
  {
    id: "9",
    question: "Can I use AI Attorney offline?",
    answer: "Some features like viewing saved documents and bookmarks are available offline. However, chat functionality and real-time legal research require an internet connection.",
    category: "Technical",
  },
  {
    id: "10",
    question: "How do I contact support?",
    answer: "You can reach our support team through the Help Center in Settings, by emailing support@aiattorney.com.pk, or by using the in-app feedback form.",
    category: "Support",
  },
];

export const faqCategories = [...new Set(faqData.map((item) => item.category))];

export const getFAQsByCategory = (category: string): FAQItem[] => {
  return faqData.filter((item) => item.category === category);
};
