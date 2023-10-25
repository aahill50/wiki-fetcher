'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon';
import iconCalendar from '~/assets/icon_calendar.svg';
import iconChevronUp from '~/assets/icon_chevron_up.svg';

export default function DatePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const date = new Date(Date.UTC(2020, 5, 10));
    const dateString = Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(date);

    const chevron = (
        <div className={clsx('transition-all', { 'rotate-180': !isOpen })}>
            <Icon
                svg={iconChevronUp}
                width={12}
                height={16}
                alt='date-selector-inactive'
            />
        </div>
    );

    const onClickDate = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex mb-6'>
            <Icon
                alt='calendar-icon'
                height={40}
                svg={iconCalendar}
                width={40}
            />
            <div className='flex flex-col ml-6'>
                <div
                    className='flex items-center font-poppins font-medium text-neutral-400 text-sm tracking-wider cursor-pointer'
                    onClick={onClickDate}
                >
                    DATE
                    <div className='ml-1'>{chevron}</div>
                </div>
                <div className='font-poppins font-normal text-black text-base'>
                    {dateString}
                </div>
            </div>
        </div>
    );
}
