'use client';

import { useCallback } from 'react';
import { useStore } from '~/store';
import api from '~/api';
import { formatArticles } from '~/utilities';
import classes from '../classes';

export default function SearchButton() {
    const selectedDay = useStore((state) => state.selectedDay);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const numResults = useStore((state) => state.numResults);
    const setArticles = useStore((state) => state.setArticles);
    const setPage = useStore((state) => state.setPage);
    const setOpenMenu = useStore((state) => state.setOpenMenu);

    const onClickSearch = useCallback(async () => {
        const day = selectedDay;
        const month = selectedMonth;
        const year = selectedYear;
        const res = await api.pageviewsByDay({ day, month, year });
        const articles = res.items[0].articles || [];
        setArticles(formatArticles(articles, numResults, { day, month, year }));
        setPage(1);
        setOpenMenu(null);
    }, [
        selectedDay,
        selectedMonth,
        selectedYear,
        numResults,
        setArticles,
        setPage,
        setOpenMenu,
    ]);

    return (
        <button
            className={classes.searchButton}
            onClick={() => void onClickSearch()}
        >
            Search
        </button>
    );
}
