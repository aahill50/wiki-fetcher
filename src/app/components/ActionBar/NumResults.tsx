'use client';

import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon';
import iconList from '~/assets/icon_list.svg';
import iconChevronUp from '~/assets/icon_chevron_up.svg';
import { useStore } from '~/store';
import { NUM_RESULTS } from '~/constants';

export default function NumResults() {
    const numResults = useStore((state) => state.numResults);
    const setNumResults = useStore((state) => state.setNumResults);
    const [isOpen, setIsOpen] = useState(false);

    const onClickNumResultsMenu = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const onClickNumResultsOption = useCallback(
        (numResults: number) => {
            setNumResults(numResults);
            setIsOpen(false);
        },
        [setNumResults]
    );

    const chevron = (
        <div className={clsx('transition-all', { 'rotate-180': !isOpen })}>
            <Icon
                svg={iconChevronUp}
                width={12}
                height={16}
                alt={isOpen ? 'num-results-active' : 'num-results-inactive'}
            />
        </div>
    );

    const pageSizePicker = (
        <>
            {NUM_RESULTS.map((val) => {
                return (
                    <div
                        key={`page-size-${val}`}
                        className='flex mb-6 last:mb-0 justify-center'
                        onClick={() => onClickNumResultsOption(val)}
                    >
                        {val}
                    </div>
                );
            })}
        </>
    );

    return (
        <div
            className='flex mb-6 sm:mb-0 sm:max-w-[200px] md:max-w-[260px] sm:hover:bg-neutral-100 sm:rounded-full sm:px-3 sm:py-4 cursor-pointer'
            onClick={onClickNumResultsMenu}
        >
            <div className='relative'>
                <Icon
                    alt='results-icon'
                    height={40}
                    svg={iconList}
                    width={40}
                />
                <div
                    className={clsx(
                        'absolute',
                        'flex',
                        'flex-col',
                        'top-16',
                        '-left-2',
                        'w-[200px]',
                        'bg-white',
                        'rounded-3xl',
                        'shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]',
                        'font-poppins',
                        'font-normal',
                        'text-base',
                        'transition-all',
                        'overflow-hidden',
                        {
                            'h-0': !isOpen,
                            'h-fit': isOpen,
                            'px-2': isOpen,
                            'py-8': isOpen,
                        }
                    )}
                >
                    {pageSizePicker}
                </div>
            </div>
            <div className='flex flex-col ml-6'>
                <div className='flex items-center font-poppins font-medium text-neutral-400 text-sm tracking-wider cursor-pointer'>
                    <span className='inline-block sm:hidden mr-1'>#</span>
                    <span className='hidden sm:inline-block mr-1'>
                        NUM
                    </span>{' '}
                    RESULTS
                    <div className='ml-1'>{chevron}</div>
                </div>
                <div className='font-poppins font-normal text-black text-base'>
                    {numResults}
                </div>
            </div>
        </div>
    );
}
