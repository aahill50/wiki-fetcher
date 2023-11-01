import { MONTHS } from './constants';

export type Access = 'all-access' | 'desktop' | 'mobile-app' | 'mobile-web';

export interface Article {
    article: string;
    originalTitle: string;
    views: number;
    rank: number;
    key: string;
}

export type Project = 'en.wikipedia';

export interface PageviewsResult {
    articles: Article[];
    day: string;
    month: keyof typeof MONTHS;
    project: Project;
    year: string;
}
