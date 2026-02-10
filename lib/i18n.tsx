'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'ru' | 'en';

const translations = {
  text: { ru: '', en: '' },
  name: { ru: 'AXIOM', en: 'AXIOM' },
  hero: {
    fature: { ru: 'Будущее начинается с вас!', en: 'The future begins with you!' },
    experience: { ru: 'Твой новый опыт!', en: 'Your new experience!' },
    download_pc: { ru: 'Скачать для ПК', en: 'Download for PC' },
    download_git: { ru: 'Скачать на GitHub', en: 'Download on GitHub' },
  },
  about: {
    what_is: { ru: 'ЧТО ТАКОЕ?', en: 'WHAT IS?' },
    text: {
      ru: 'Ваш персональный игровой хаб. Управляйте библиотекой, следите за обновлениями и запускайте любимые игры в несколько кликов. Открывайте игры по новому!',
      en: 'Your personal gaming hub. Manage your library, track updates, and launch your favorite games in just a few clicks. Discover games in a new way!',
    }
  },
  functional: {
    functionality: { ru: 'Обзор функционала', en: 'Review of functionality' },
    launcher: { ru: 'LAUNCHER', en: 'LAUNCHER' },
    subscribe: { ru: 'Подписывайся на нас', en: 'Subscribe to us' },
    get_news: { ru: 'Узнавай наши новости первым', en: 'Get to know our news first' },
  },
  faq: {
    title: { ru: 'Ответы на вопросы', en: 'Answers to questions' },
  },
  footer: {
    name: { ru: 'AXIOMA LAUNCHER', en: 'AXIOMA LAUNCHER' },
    year_start: { ru: '202?', en: '202?' },
    all_rights_reserved: { ru: 'Все права защищены', en: 'All rights reserved' },
    terms_and_policy: { ru: 'Условия и политика', en: 'Terms and policy' },
    support_email: { ru: 'support@axioma.online', en: 'support@axioma.online' },
  },
} as const;

type I18nContextType = {
  lang: Lang;
  changeLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && (saved === 'ru' || saved === 'en')) {
      setLang(saved);
    }
  }, []);

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations;
    for (const k of keys) {
      result = result?.[k];
      if (!result) return key;
    }
    return result[lang] ?? result.ru ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useT = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useT must be used within I18nProvider');
  }
  return context;
};