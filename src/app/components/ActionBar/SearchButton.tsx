'use client';
import { useCallback } from 'react';
import { apiCall } from '~/api';
import { useStore } from '~/store';
import { formatArticles } from '~/utilities';

export default function SearchButton() {
    const selectedDay = useStore((state) => state.selectedDay);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const country = useStore((state) => state.country);
    const numResults = useStore((state) => state.numResults);
    const setArticles = useStore((state) => state.setArticles);
    const setPage = useStore((state) => state.setPage);
    const setOpenMenu = useStore((state) => state.setOpenMenu);

    const onClickSearch = useCallback(async () => {
        const day = selectedDay;
        const month = selectedMonth;
        const year = selectedYear;
        const res = await apiCall({
            endpointSegment: 'pageviewsByDayPerCountry',
            access: 'all-access',
            country,
            day,
            month,
            project: 'en.wikipedia',
            year,
        });
        const articles = res.items[0].articles || [];
        setArticles(formatArticles(articles, numResults, { day, month, year }));
        setPage(1);
        setOpenMenu(null);
    }, [
        selectedDay,
        selectedMonth,
        selectedYear,
        country,
        numResults,
        setArticles,
        setPage,
        setOpenMenu,
    ]);

    return (
        <button
            className='font-averta sm:font-poppins bg-brandGreen-500 text-base sm:max-md:text-sm py-3 sm:py-5 sm:ml-5 grow-0 min-w-[160px] sm:max-md:min-w-[100px] rounded-full text-white font-semibold sm:font-medium tracking-wide cursor-pointer'
            onClick={() => void onClickSearch()}
        >
            Search
        </button>
    );
}
