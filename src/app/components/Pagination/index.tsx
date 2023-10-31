'use client';

import { useCallback } from 'react';
import { useStore } from '~/store';
import PageNumber from './PageNumber';
import PrevPage from './PrevPage';
import NextPage from './NextPage';
import { getDisplayPageNumbers } from '~/utilities';

export default function Pagination() {
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const pageSize = useStore((state) => state.pageSize);
    const setPage = useStore((state) => state.setPage);
    const displayPageNumbers = getDisplayPageNumbers({
        articles,
        pageSize,
        currentPage: page,
    });

    const onClickPageNumber = useCallback(
        (pageNumber: number) => {
            setPage(pageNumber);
        },
        [setPage]
    );

    return (
        <div className='flex my-10 justify-center'>
            <PrevPage onClick={onClickPageNumber} />
            <ul className='flex cursor-pointer'>
                {displayPageNumbers.map((pageNumber) => (
                    <PageNumber
                        key={pageNumber}
                        pageNumber={pageNumber}
                        onClick={onClickPageNumber}
                    />
                ))}
            </ul>
            <NextPage onClick={onClickPageNumber} />
        </div>
    );
}
