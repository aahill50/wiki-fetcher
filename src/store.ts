import { create } from 'zustand';
import { Article } from './types';
import { MONTHS, PAGE_SIZE } from './constants';

interface StoreStateGetters {
    articles: Article[];
    calendarDay: number;
    calendarMonth: keyof typeof MONTHS;
    calendarYear: number;
    numResults: number;
    page: number;
    pageSize: number;
}

interface StoreStateSetters {
    setArticles: (articles: Article[]) => void;
    setPage: (page: number) => void;
    setNumResults: (pageSize: number) => void;
}

interface StoreState extends StoreStateGetters, StoreStateSetters {}

const defaulState = {
    articles: [],
    calendarMonth: 1,
    calendarDay: 12,
    calendarYear: 2023,
    numResults: 100,
    page: 1,
    pageSize: PAGE_SIZE,
} as StoreStateGetters;

export const useStore = create<StoreState>((setState) => ({
    articles: defaulState.articles,
    calendarMonth: defaulState.calendarMonth,
    calendarDay: defaulState.calendarDay,
    calendarYear: defaulState.calendarYear,
    numResults: defaulState.numResults,
    page: defaulState.page,
    pageSize: defaulState.pageSize,
    setArticles: (articles) => setState({ articles }),
    setPage: (page) => setState({ page }),
    setNumResults: (numResults) => setState({ numResults }),
}));
