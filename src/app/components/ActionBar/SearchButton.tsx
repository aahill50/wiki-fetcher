'use client';
import { useCallback } from 'react';
import { apiCall } from '~/api';
import { useStore } from '~/store';
import { formatArticles } from '~/utilities';

export default function SearchButton() {
    const calendarDay = useStore((state) => state.calendarDay);
    const calendarMonth = useStore((state) => state.calendarMonth);
    const calendarYear = useStore((state) => state.calendarYear);
    const numResults = useStore((state) => state.numResults);
    const setArticles = useStore((state) => state.setArticles);
    const setPage = useStore((state) => state.setPage);

    const onClickSearch = useCallback(async () => {
        const res = await apiCall({
            endpointSegment: 'pageviewsByDay',
            access: 'all-access',
            day: calendarDay,
            month: calendarMonth,
            project: 'en.wikipedia',
            year: calendarYear,
        });
        const articles = res.items[0].articles || [];
        setArticles(formatArticles(articles, numResults));
        setPage(1);
    }, [
        calendarDay,
        calendarMonth,
        calendarYear,
        numResults,
        setArticles,
        setPage,
    ]);

    return (
        <button
            className='font-averta sm:font-poppins bg-brandGreen-500 text-base py-3 sm:py-5 sm:ml-5 grow rounded-full text-white font-semibold sm:font-medium tracking-wide'
            onClick={() => void onClickSearch()}
        >
            Search
        </button>
    );
}
