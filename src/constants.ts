import { Access, Project } from './types';

export const PAGEVIEWS_ENDPOINT_ROOT =
    'https://wikimedia.org/api/rest_v1/metrics/pageviews';
export const PAGE_ENDPOINT_ROOT = 'https://en.wikipedia.org/api/rest_v1/page';

export const ENDPOINT_SEGMENT = {
    pageviewsByDay: 'top',
    pageviewsByDayPerCountry: 'top-per-country',
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
    COUNTRY: 'COUNTRY',
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

// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
// Filtered to remove any countries with < 25 results yesterday (as of 10/31/23)
export const COUNTRY_CODES = {
    ES: 'Spain',
    FI: 'Finland',
    FR: 'France',
    GB: 'United Kingdom of Great Britain and Northern Ireland',
    GR: 'Greece',
    HK: 'Hong Kong',
    HU: 'Hungary',
    ID: 'Indonesia',
    IE: 'Ireland',
    IL: 'Israel',
    IN: 'India',
    IT: 'Italy',
    JP: 'Japan',
    KR: 'Korea, Republic of',
    MA: 'Morocco',
    MX: 'Mexico',
    MY: 'Malaysia',
    NG: 'Nigeria',
    NL: 'Netherlands, Kingdom of the',
    NO: 'Norway',
    PE: 'Peru',
    PH: 'Philippines',
    PL: 'Poland',
    RO: 'Romania',
    SE: 'Sweden',
    SG: 'Singapore',
    TW: 'Taiwan, Province of China',
    UA: 'Ukraine',
    US: 'United States of America',
    ZA: 'South Africa',
    AR: 'Argentina',
    AT: 'Austria',
    AU: 'Australia',
    BE: 'Belgium',
    BR: 'Brazil',
    CA: 'Canada',
    CL: 'Chile',
    CO: 'Colombia',
    CZ: 'Czechia',
    DE: 'Germany',
    DZ: 'Algeria',
} as const;

export type COUNTRY_CODE = keyof typeof COUNTRY_CODES;
