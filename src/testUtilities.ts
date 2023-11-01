import { type StoreState } from './store';
import { type Article } from './types';

export const createMockArticles = (count: number): Article[] => {
    return Array(count)
        .fill(0)
        .map((_, n) => ({
            article: `Test-${n + 1}`,
            originalTitle: `Test-${n + 1}`,
            rank: n + 1,
            views: 1000 - n,
            key: 'article-key',
        }));
};

export const mockState: StoreState = {
    articles: createMockArticles(100),
    country: 'US',
    numResults: 10,
    openMenu: null,
    page: 1,
    pageSize: 10,
    selectedDay: 1,
    selectedMonth: 1,
    selectedYear: 2020,
    selectDay: jest.fn(),
    selectMonth: jest.fn(),
    selectYear: jest.fn(),
    setArticles: jest.fn(),
    setCountry: jest.fn(),
    setOpenMenu: jest.fn(),
    setPage: jest.fn(),
    setNumResults: jest.fn(),
};
