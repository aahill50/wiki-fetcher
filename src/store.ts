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
    calendarMonth: 1,
    calendarDay: 12,
    calendarYear: 2023,
    setArticles: (articles) => setState({ articles }),
}));
