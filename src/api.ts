import {
    PAGEVIEWS_ENDPOINT_ROOT,
    ENDPOINT_SEGMENT,
    PAGE_ENDPOINT_ROOT,
    MONTHS,
} from './constants';
import { type Access, type Project } from './types';
import { getLastDayOfMonth } from './utilities';

interface PageviewsByDayApiCallOpts {
    year: number;
    month: number;
    day: number;
}

interface SummaryApiCallOpts {
    article: string;
    month: number;
    year: number;
}

interface PageviewsByDayForArticleApiCallOpts {
    article: string;
    year: number;
    month: number;
    startDay: number;
    endDay: number;
}

export type ApiCallOpts = PageviewsByDayApiCallOpts | SummaryApiCallOpts;

// Used to ensure day and month numbers get padded with a leading 0 when converted to String
export const padLeft = (str: string): string =>
    str.length > 1 ? str : `0${str}`.slice(-2);

export const pageviewsByDay = (opts: PageviewsByDayApiCallOpts) =>
    [
        PAGEVIEWS_ENDPOINT_ROOT,
        ENDPOINT_SEGMENT.pageviewsByDay,
        'en.wikipedia',
        'all-access',
        opts.year,
        padLeft(String(opts.month)),
        padLeft(String(opts.day)),
    ].join('/');

export const articleSummary = (opts: SummaryApiCallOpts) =>
    [PAGE_ENDPOINT_ROOT, ENDPOINT_SEGMENT.summary, opts.article].join('/');

export const pageviewsByDayForArticle = (
    opts: PageviewsByDayForArticleApiCallOpts
) =>
    [
        PAGEVIEWS_ENDPOINT_ROOT,
        ENDPOINT_SEGMENT.pageviewsByDayForArticle,
        'en.wikipedia',
        'all-access',
        'all-agents',
        opts.article,
        'daily',
        [
            opts.year,
            padLeft(String(opts.month)),
            padLeft(String(opts.startDay)),
        ].join(''),
        [
            opts.year,
            padLeft(String(opts.month)),
            padLeft(String(opts.endDay)),
        ].join(''),
    ].join('/');

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

interface DetailsResponseJson {
    items: {
        project: Project;
        article: string;
        timestamp: string;
        views: number;
    }[];
}

type ArticleDailyView = { date: string; views: number };

export type SummaryResponse = SummaryResponseJson & {
    originalTitle: string;
    views: ArticleDailyView[];
};

const api = {
    pageviewsByDay: async (
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
    summary: async (opts: SummaryApiCallOpts): Promise<SummaryResponse> => {
        const articleSummaryEndpoint = articleSummary(opts);
        const articleDetailsEndpoint = pageviewsByDayForArticle({
            ...opts,
            startDay: 1,
            endDay: getLastDayOfMonth(opts.month, opts.year),
        });

        const [summary, details] = await Promise.all([
            fetch(articleSummaryEndpoint),
            fetch(articleDetailsEndpoint),
        ]);
        const [summaryJson, detailsJson]: [
            SummaryResponseJson,
            DetailsResponseJson
        ] = await Promise.all([summary.json(), details.json()]);
        const views = detailsJson?.items?.map((item) => {
            const timestamp = item?.timestamp;
            const year = timestamp.slice(0, 4);
            const month = Number(timestamp.slice(4, 6));
            const day = Number(timestamp.slice(6, 8));
            const date = `${MONTHS[month]} ${day}, ${year}`;

            return {
                date,
                views: item?.views || 0,
            };
        });

        const viewsCompareFn = (a: ArticleDailyView, b: ArticleDailyView) => {
            return b.views - a.views;
        };

        return {
            description: summaryJson.description,
            extract: summaryJson.extract,
            originalTitle: opts.article,
            thumbnail: summaryJson.thumbnail,
            views: views?.sort(viewsCompareFn) || [],
        };
    },
};

export default api;
