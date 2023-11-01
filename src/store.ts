import { create } from 'zustand';
import { COUNTRY_CODE, MENU_KEY, PAGE_SIZE } from './constants';
import { type Article } from './types';
interface StoreStateGetters {
    articles: Article[];
    country: COUNTRY_CODE;
    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;
    numResults: number;
    openMenu: MENU_KEY | null;
    page: number;
    pageSize: number;
}

interface StoreStateSetters {
    selectDay: (day: number) => void;
    selectMonth: (month: number) => void;
    selectYear: (year: number) => void;
    setArticles: (articles: Article[]) => void;
    setCountry: (countryCode: COUNTRY_CODE) => void;
    setOpenMenu: (menu: MENU_KEY | null) => void;
    setPage: (page: number) => void;
    setNumResults: (pageSize: number) => void;
}

export interface StoreState extends StoreStateGetters, StoreStateSetters {}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const defaulState = {
    articles: [],
    country: 'US',
    selectedMonth: yesterday.getMonth() + 1,
    selectedDay: yesterday.getDate(),
    selectedYear: yesterday.getFullYear(),
    numResults: 100,
    openMenu: null,
    page: 1,
    pageSize: PAGE_SIZE,
} as StoreStateGetters;

export const useStore = create<StoreState>((setState) => ({
    articles: defaulState.articles,
    country: defaulState.country,
    selectedMonth: defaulState.selectedMonth,
    selectedDay: defaulState.selectedDay,
    selectedYear: defaulState.selectedYear,
    numResults: defaulState.numResults,
    openMenu: defaulState.openMenu,
    page: defaulState.page,
    pageSize: defaulState.pageSize,
    selectDay: (selectedDay) => setState({ selectedDay }),
    selectMonth: (selectedMonth) => setState({ selectedMonth }),
    selectYear: (selectedYear) => setState({ selectedYear }),
    setArticles: (articles) => setState({ articles }),
    setCountry: (country) => setState({ country }),
    setOpenMenu: (openMenu) => setState({ openMenu }),
    setPage: (page) => setState({ page }),
    setNumResults: (numResults) => setState({ numResults }),
}));
