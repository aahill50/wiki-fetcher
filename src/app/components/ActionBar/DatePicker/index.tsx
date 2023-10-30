'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Icon from '../../Icon';
import iconCalendar from '~/assets/icon_calendar.svg';
import iconChevronUp from '~/assets/icon_chevron_up.svg';
import { useStore } from '~/store';
import Calendar from './Calendar';

export default function DatePicker() {
    const selectedDay = useStore((state) => state.selectedDay);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const date = new Date(
        Date.UTC(selectedYear, selectedMonth - 1, selectedDay + 1)
    );
    const dateString = Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(date);

    const chevron = (
        <div
            className={clsx('transition-all', {
                'rotate-180': !isCalendarOpen,
            })}
        >
            <Icon
                svg={iconChevronUp}
                width={12}
                height={16}
                alt='date-selector-inactive'
            />
        </div>
    );

    const onClickDatePicker = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    return (
        <div className='flex relative mb-6 sm:mb-0 sm:pr-9 sm:hover:bg-neutral-100 sm:rounded-full sm:px-3 sm:py-4 cursor-pointer'>
            <Icon
                alt='calendar-icon'
                height={40}
                svg={iconCalendar}
                width={40}
            />
            <Calendar isOpen={isCalendarOpen} />
            <div className='flex flex-col ml-6' onClick={onClickDatePicker}>
                <div className='flex items-center font-poppins font-medium text-neutral-400 text-sm tracking-wider cursor-pointer'>
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
