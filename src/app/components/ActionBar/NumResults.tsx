'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon';
import iconList from '~/assets/icon_list.svg';
import iconChevronUp from '~/assets/icon_chevron_up.svg';

export default function NumResults() {
    const [isOpen, setIsOpen] = useState(false);
    const numResults = 100;

    const onClickNumResults = () => {
        setIsOpen(!isOpen);
    };

    const chevron = (
        <div className={clsx('transition-all', { 'rotate-180': !isOpen })}>
            <Icon
                svg={iconChevronUp}
                width={12}
                height={16}
                alt='num-results-inactive'
            />
        </div>
    );
    return (
        <div className='flex mb-6 sm:mb-0 sm:max-w-[180px] md:max-w-[260px] sm:hover:bg-neutral-100 sm:rounded-full sm:px-3 sm:py-4 cursor-pointer'>
            <Icon alt='results-icon' height={40} svg={iconList} width={40} />
            <div className='flex flex-col ml-6'>
                <div
                    className='flex items-center font-poppins font-medium text-neutral-400 text-sm tracking-wider cursor-pointer'
                    onClick={onClickNumResults}
                >
                    <span className='inline-block sm:hidden mr-1'>#</span>
                    <span className='hidden sm:inline-block mr-1'>NUM</span> RESULTS
                    <div className='ml-1'>{chevron}</div>
                </div>
                <div className='font-poppins font-normal text-black text-base'>
                    {numResults}
                </div>
            </div>
        </div>
    );
}
