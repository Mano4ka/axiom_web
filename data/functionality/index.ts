interface FeaturesDataItem {
  id: number;
  name: {
    ru: string;
    en: string;
  };
  info: {
    ru: string;
    en: string;
  };
  img: string;
  bg: {
    img: string;
    rotate: string;
  };
}

export const FeaturesData: FeaturesDataItem[] = require('./FeaturesData.json');