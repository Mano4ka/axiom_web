interface FaqItem {
  question: {
    ru: string;
    en: string;
  };
  answer: {
    ru: string;
    en: string;
  };
}

export const faqData: FaqItem[] = require('./Faq.json');