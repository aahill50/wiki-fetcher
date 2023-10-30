import { create } from 'zustand';
import { Article } from './types';
import { PAGE_SIZE } from './constants';
interface StoreStateGetters {
    articles: Article[];
    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;
    numResults: number;
    page: number;
    pageSize: number;
}

interface StoreStateSetters {
    selectDay: (day: number) => void;
    selectMonth: (month: number) => void;
    selectYear: (year: number) => void;
    setArticles: (articles: Article[]) => void;
    setPage: (page: number) => void;
    setNumResults: (pageSize: number) => void;
}

interface StoreState extends StoreStateGetters, StoreStateSetters {}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const defaulState = {
    articles: [],
    selectedMonth: yesterday.getMonth() + 1,
    selectedDay: yesterday.getDate(),
    selectedYear: yesterday.getFullYear(),
    numResults: 100,
    page: 1,
    pageSize: PAGE_SIZE,
} as StoreStateGetters;

export const useStore = create<StoreState>((setState) => ({
    articles: defaulState.articles,
    selectedMonth: defaulState.selectedMonth,
    selectedDay: defaulState.selectedDay,
    selectedYear: defaulState.selectedYear,
    numResults: defaulState.numResults,
    page: defaulState.page,
    pageSize: defaulState.pageSize,
    selectDay: (selectedDay) => setState({ selectedDay }),
    selectMonth: (selectedMonth) => setState({ selectedMonth }),
    selectYear: (selectedYear) => setState({ selectedYear }),
    setArticles: (articles) => setState({ articles }),
    setPage: (page) => setState({ page }),
    setNumResults: (numResults) => setState({ numResults }),
}));
