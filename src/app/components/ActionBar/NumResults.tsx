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
        <div className='flex mb-6'>
            <Icon alt='results-icon' height={40} svg={iconList} width={40} />
            <div className='flex flex-col ml-6'>
                <div
                    className='flex items-center font-poppins font-medium text-neutral-400 text-sm tracking-wider cursor-pointer'
                    onClick={onClickNumResults}
                >
                    # RESULTS
                    <div className='ml-1'>{chevron}</div>
                </div>
                <div className='font-poppins font-normal text-black text-base'>
                    {numResults}
                </div>
            </div>
        </div>
    );
}
