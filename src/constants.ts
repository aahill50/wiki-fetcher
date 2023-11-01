import { type Access, type Project } from './types';

export const PAGEVIEWS_ENDPOINT_ROOT =
    'https://wikimedia.org/api/rest_v1/metrics/pageviews';
export const PAGE_ENDPOINT_ROOT = 'https://en.wikipedia.org/api/rest_v1/page';

export const ENDPOINT_SEGMENT = {
    pageviewsByDay: 'top',
    pageviewsByDayForArticle: 'per-article',
    summary: 'summary',
} as const;

export const DEFAULTS = {
    project: 'en.wikipedia',
    access: 'all-access',
    year: 2023,
    month: 1,
    day: 1,
} as {
    project: Project;
    access: Access;
    year: number;
    month: number;
    day: number;
};

export const PAGE_SIZE = 10;

export const NUM_RESULTS = [25, 50, 75, 100, 200];

export const NUM_PAGES_TO_DISPLAY = 4;

export const MENUS = {
    DATE_PICKER: 'DATE_PICKER',
    NUM_RESULTS: 'NUM_RESULTS',
} as const;

export type MENU_KEY = keyof typeof MENUS;

export const DAY_LABELS = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
] as const;

export const MONTHS = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
} as Record<number, string>;

export const MONTHS_WITH_30_DAYS = [4, 6, 9, 11];
