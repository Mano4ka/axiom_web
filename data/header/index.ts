interface HeaderItem {
  title: {
    en: string;
    ru: string;
  };
  link: string;
}

export const HeaderData: HeaderItem[] = require('./header.json');
