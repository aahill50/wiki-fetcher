import { COUNTRY_CODES, ENDPOINT_SEGMENT, MONTHS } from './constants';

export type Access = 'all-access' | 'desktop' | 'mobile-app' | 'mobile-web';

export interface Article {
    article: string;
    views: number;
    rank: number;
}

export type Project = 'en.wikipedia';

export interface PageviewsResult {
    articles: Article[];
    country: keyof typeof COUNTRY_CODES;
    day: string;
    month: keyof typeof MONTHS;
    project: Project;
    year: string;
}

export type EndpointSegment = keyof typeof ENDPOINT_SEGMENT