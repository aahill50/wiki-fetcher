import {
    PAGEVIEWS_ENDPOINT_ROOT,
    ENDPOINT_SEGMENT,
    PAGE_ENDPOINT_ROOT,
} from './constants';
import { Access, Country, Project } from './types';

interface PageviewsByDayApiCallOpts {
    project: Project;
    access: Access;
    year: number;
    month: number;
    day: number;
}

interface PageviewsByDayPerCountryApiCallOpts {
    country: Country;
    access: Access;
    year: number;
    month: number;
    day: number;
}

interface SummaryApiCallOpts {
    article: string;
}

export type ApiCallOpts =
    | PageviewsByDayApiCallOpts
    | PageviewsByDayPerCountryApiCallOpts
    | SummaryApiCallOpts;

// Used to ensure day and month numbers get padded with a leading 0 when converted to String
export const padLeft = (str: string): string =>
    str.length > 1 ? str : `0${str}`.slice(-2);

export const pageviewsByDayPerCountry = (opts: PageviewsByDayPerCountryApiCallOpts) =>
    [
        PAGEVIEWS_ENDPOINT_ROOT,
        ENDPOINT_SEGMENT.pageviewsByDayPerCountry,
        opts.country,
        opts.access,
        opts.year,
        padLeft(String(opts.month)),
        padLeft(String(opts.day)),
    ].join('/');

export const pageviewsByDay = (opts: PageviewsByDayApiCallOpts) =>
    [
        PAGEVIEWS_ENDPOINT_ROOT,
        ENDPOINT_SEGMENT.pageviewsByDay,
        opts.project,
        opts.access,
        opts.year,
        padLeft(String(opts.month)),
        padLeft(String(opts.day)),
    ].join('/');

export const articleSummary = (opts: SummaryApiCallOpts) =>
    [PAGE_ENDPOINT_ROOT, ENDPOINT_SEGMENT.summary, opts.article].join('/');

interface PageviewsByDayResponseArticle {
    article: string;
    rank: number;
    views: number;
}
interface PageviewsByDayResponseJson {
    items: {
        access: Access;
        articles: PageviewsByDayResponseArticle[];
        day: string;
        month: string;
        project: Project;
        year: string;
    }[];
}

interface PageviewsByDayPerCountryResponseArticle {
    article: string;
    project: Project;
    rank: number;
    views_ceil: number;
}
interface PageviewsByDayPerCountryResponseJson {
    items: {
        access: Access;
        articles: PageviewsByDayPerCountryResponseArticle[];
        country: Country;
        day: string;
        month: string;
        year: string;
    }[];
}

interface PageviewsResponse {
    items: {
        articles: {
            article: string;
            originalTitle: string;
            rank: number;
            views: number;
        }[];
    }[];
}
interface SummaryResponseJson {
    description: string;
    extract: string;
    thumbnail: {
        source: string;
        width: number;
        height: number;
    };
}

export type SummaryResponse = SummaryResponseJson & { originalTitle: string };

const api = {
    getPageViewsByDay: async (
        opts: PageviewsByDayApiCallOpts
    ): Promise<PageviewsResponse> => {
        const endpoint = pageviewsByDay(opts);
        const res = await fetch(endpoint);
        const json: PageviewsByDayResponseJson = await res.json();

        const articles = json.items?.[0].articles?.map(
            ({ article, rank, views }: PageviewsByDayResponseArticle) =>
                ({
                    article,
                    originalTitle: article,
                    rank,
                    views,
                } || [])
        );

        return {
            ...json,
            items: [
                {
                    ...json?.items?.[0],
                    articles,
                },
            ],
        };
    },
    getPageviewsByDayPerCountry: async (
        opts: PageviewsByDayPerCountryApiCallOpts
    ): Promise<PageviewsResponse> => {
        const endpoint = pageviewsByDayPerCountry(opts);
        const res = await fetch(endpoint);
        const json: PageviewsByDayPerCountryResponseJson = await res.json();

        const articles = json.items?.[0].articles.map(
            ({
                article,
                rank,
                views_ceil,
            }: PageviewsByDayPerCountryResponseArticle) =>
                ({
                    article,
                    originalTitle: article,
                    rank,
                    views: views_ceil,
                } || [])
        );

        return {
            ...json,
            items: [
                {
                    ...json?.items?.[0],
                    articles,
                },
            ],
        };
    },
    getSummary: async (opts: SummaryApiCallOpts): Promise<SummaryResponse> => {
        const endpoint = articleSummary(opts);
        const res = await fetch(endpoint);
        const json: SummaryResponseJson = await res.json();

        return {
            description: json.description,
            extract: json.extract,
            originalTitle: opts.article,
            thumbnail: json.thumbnail,
        };
    },
};

export default api;
