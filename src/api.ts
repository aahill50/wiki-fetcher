import { ENDPOINT_ROOT, ENDPOINT_SEGMENT } from './constants';
import { Access, Article, Country, Project } from './types';

interface RawResponseArticle {
    article: string;
    project?: string;
    rank: number;
    views?: number;
    views_ceil?: number;
}
interface ResponseJsonItem {
    access: Access;
    articles: Omit<Article, 'key'>[];
    day: string;
    month: string;
    project: Project;
    year: string;
}

interface ResponseJson {
    items: ResponseJsonItem[];
}

export interface ApiCallOpts {
    endpointSegment: keyof typeof ENDPOINT_SEGMENT;
    project: Project;
    country?: Country;
    access: Access;
    year: number;
    month: number;
    day: number;
}

// Used to ensure day and month numbers get padded with a leading 0 when converted to String
const padLeft = (str: string): string =>
    str.length > 1 ? str : `0${str}`.slice(-2);

const pageviewsByDayPerCountry = (opts: ApiCallOpts) =>
    [
        ENDPOINT_ROOT,
        ENDPOINT_SEGMENT.pageviewsByDayPerCountry,
        opts.country,
        opts.access,
        opts.year,
        padLeft(String(opts.month)),
        padLeft(String(opts.day)),
    ].join('/');

const pageviewsByDay = (opts: ApiCallOpts) =>
    [
        ENDPOINT_ROOT,
        ENDPOINT_SEGMENT.pageviewsByDay,
        opts.project,
        opts.access,
        opts.year,
        padLeft(String(opts.month)),
        padLeft(String(opts.day)),
    ].join('/');

export const getEndpoint = (opts: ApiCallOpts): string => {
    switch (opts.endpointSegment) {
        case 'pageviewsByDay': {
            return pageviewsByDay(opts);
        }
        case 'pageviewsByDayPerCountry': {
            return pageviewsByDayPerCountry(opts);
        }
        default: {
            return pageviewsByDay(opts);
        }
    }
};

export const apiCall = async (opts: ApiCallOpts): Promise<ResponseJson> => {
    const endpoint = getEndpoint(opts);

    const res = await fetch(endpoint);
    const json: ResponseJson = await res.json();

    const articles = json.items?.[0].articles.map(
        ({ article, project, rank, views, views_ceil }: RawResponseArticle) =>
            ({
                article,
                project,
                rank,
                views: views ?? views_ceil ?? 0,
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
};
