
interface StatsDataItem {
    value: string;
    label: {
        ru: string;
        en: string;
    };
    circleColor: string;
}

interface marqueeLine {
    top: {
        pc: string;
        mb: string;
    };
    height: string;
    rotate: string;
    scale: string;
    left: string;
    width: string;
    zIndex: string;
    speed: number;
    direction: 'left' | 'right';
    images: string[];
    leftGradient?: boolean;
}

export const MarqueeLines: marqueeLine[] = require('./marqueeLines.json');

export const StatsData: StatsDataItem[] = require('./stats.json');