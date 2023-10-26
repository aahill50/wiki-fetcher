import { create } from 'zustand';
import { Article } from './types';
import { MONTHS } from './constants';

interface StoreState {
    articles: Article[];
    calendarDay: number;
    calendarMonth: keyof typeof MONTHS;
    calendarYear: number;
    setArticles: (articles: Article[]) => void;
}


export const useStore = create<StoreState>((setState) => ({
    articles: [],
    calendarDay: 1,
    calendarMonth: 1,
    calendarYear: 2021,
    setArticles: (articles) => setState({ articles }),
}));
