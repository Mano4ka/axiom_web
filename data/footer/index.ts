
interface footerItems {
    name: { 
        ru: string;
        en: string;
    };
    links: {
        name: {
            ru: string;
            en: string;
        };
        link: string;
    }[];
}

export const footerData: footerItems[] = require('./footer.json');