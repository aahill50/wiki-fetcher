'use client';
import { useCallback } from 'react';
import { apiCall } from '~/api';
import { useStore } from '~/store';
import { formatArticles } from '~/utilities';

export default function SearchButton() {
    const selectedDay = useStore((state) => state.selectedDay);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const numResults = useStore((state) => state.numResults);
    const setArticles = useStore((state) => state.setArticles);
    const setPage = useStore((state) => state.setPage);

    const onClickSearch = useCallback(async () => {
        const day = selectedDay;
        const month = selectedMonth;
        const year = selectedYear;
        const res = await apiCall({
            endpointSegment: 'pageviewsByDay',
            access: 'all-access',
            day,
            month,
            project: 'en.wikipedia',
            year,
        });
        const articles = res.items[0].articles || [];
        setArticles(formatArticles(articles, numResults, { day, month, year }));
        setPage(1);
    }, [
        selectedDay,
        selectedMonth,
        selectedYear,
        numResults,
        setArticles,
        setPage,
    ]);

    return (
        <button
            className='font-averta sm:font-poppins bg-brandGreen-500 text-base py-3 sm:py-5 sm:ml-5 grow rounded-full text-white font-semibold sm:font-medium tracking-wide cursor-pointer'
            onClick={() => void onClickSearch()}
        >
            Search
        </button>
    );
}
