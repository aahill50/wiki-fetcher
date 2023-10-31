import { COUNTRY_CODE, COUNTRY_CODES, MONTHS } from './constants';

export type Access = 'all-access' | 'desktop' | 'mobile-app' | 'mobile-web';

export interface Article {
    article: string;
    views: number;
    rank: number;
    key: string;
}

export type Project = 'en.wikipedia';

export type Country = COUNTRY_CODE;

export interface PageviewsResult {
    articles: Article[];
    country: keyof typeof COUNTRY_CODES;
    day: string;
    month: keyof typeof MONTHS;
    project: Project;
    year: string;
}
