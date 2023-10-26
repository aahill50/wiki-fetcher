import { create } from 'zustand';
import { Article } from './types';
import { MONTHS } from './constants';

interface StoreState {
    articles: Article[];
    calendarDay: number;
    calendarMonth: keyof typeof MONTHS;
    calendarYear: number;
    page: number;
    pageSize: number;
    setArticles: (articles: Article[]) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

export const useStore = create<StoreState>((setState) => ({
    articles: [],
    calendarMonth: 1,
    calendarDay: 12,
    calendarYear: 2023,
    page: 1,
    pageSize: 100,
    setArticles: (articles) => setState({ articles }),
    setPage: (page) => setState({ page }),
    setPageSize: (pageSize) => setState({ pageSize }),
}));
