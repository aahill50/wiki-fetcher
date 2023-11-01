import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useStore } from '~/store';
import PrevMonth from './PrevMonth';
import NextMonth from './NextMonth';
import {
    getCalendarMonths as getCalendarMonths,
    FormattedDate,
    getDisplayMonth,
} from './calendarUtilities';
import { DAY_LABELS, MONTHS } from '~/constants';

interface Props {
    isOpen: boolean;
}

export default function Calendar(props: Props) {
    const { isOpen } = props;

    const selectedDay = useStore((state) => state.selectedDay);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const selectDay = useStore((state) => state.selectDay);
    const selectMonth = useStore((state) => state.selectMonth);
    const selectYear = useStore((state) => state.selectYear);

    const [calendarMonths, setCalendarMonths] = useState<
        Map<string, FormattedDate[]>
    >(new Map());
    const [selectedDate, setSelectedDate] = useState<FormattedDate | null>(
        null
    );
    const [displayMonth, setDisplayMonth] = useState<string>(
        getDisplayMonth({ month: selectedMonth, year: selectedYear })
    );
    const calendarLabel = `${MONTHS[selectedMonth]} ${selectedYear}`;

    const isNextMonthValid = () => {
        const nextMonth = selectedMonth + 1 >= 12 ? 1 : selectedMonth + 1;
        const nextMonthYear = nextMonth === 1 ? selectedYear + 1 : selectedYear;
        const nextDisplayMonth = getDisplayMonth({
            month: nextMonth,
            year: nextMonthYear,
        });
        return !!calendarMonths.get(nextDisplayMonth);
    };

    const isPrevMonthValid = () => {
        const prevMonth = selectedMonth - 1 <= 0 ? 12 : selectedMonth - 1;
        const prevMonthYear =
            prevMonth === 12 ? selectedYear - 1 : selectedYear;
        const prevDisplayMonth = getDisplayMonth({
            month: prevMonth,
            year: prevMonthYear,
        });
        return !!calendarMonths.get(prevDisplayMonth);
    };

    const daysHeader = (
        <>
            {DAY_LABELS.map((label) => (
                <div
                    key={label}
                    className='flex flex-col place-content-center text-center font-poppins font-normal text-sm text-neutral-500 w-12 h-12'
                >
                    {label}
                </div>
            ))}
        </>
    );

    useEffect(() => {
        const calendarMonths = getCalendarMonths();
        setCalendarMonths(calendarMonths);
    }, []);

    useEffect(() => {
        const nextDisplayMonth = getDisplayMonth({
            month: selectedMonth,
            year: selectedYear,
        });

        const isNextMonthValid = !!calendarMonths?.get(nextDisplayMonth);
        const activeDisplayMonth = isNextMonthValid
            ? calendarMonths?.get(nextDisplayMonth)
            : calendarMonths?.get(displayMonth);

        const lastDayOfMonth = [...(activeDisplayMonth || [])].findLast(
            (date) => date.month === selectedMonth
        ) as FormattedDate;
        const activeSelectedDate =
            activeDisplayMonth?.find(
                (date) =>
                    date.year === selectedYear &&
                    date.month === selectedMonth &&
                    date.day === selectedDay
            ) ?? lastDayOfMonth;

        selectDay(activeSelectedDate?.day || selectedDay);
        selectMonth(activeSelectedDate?.month || selectedMonth);
        selectYear(activeSelectedDate?.year || selectedYear);
        setSelectedDate(
            isNextMonthValid ? activeSelectedDate ?? null : selectedDate
        );
        setDisplayMonth(isNextMonthValid ? nextDisplayMonth : displayMonth);
    }, [
        calendarMonths,
        displayMonth,
        selectedDay,
        selectedMonth,
        selectedYear,
        selectedDate,
        selectDay,
        selectMonth,
        selectYear,
    ]);

    const onClickDate = useCallback(
        ({
            day,
            month,
            year,
        }: {
            day: number;
            month: number;
            year: number;
        }) => {
            selectDay(day);
            selectMonth(month);
            selectYear(year);
        },
        [selectDay, selectMonth, selectYear]
    );

    const isSelected = useCallback(
        (formattedDate: FormattedDate) => {
            return (
                selectedDay === formattedDate.day &&
                selectedMonth === formattedDate.month
            );
        },
        [selectedDay, selectedMonth]
    );

    const isInCurrentMonth = (date: FormattedDate) =>
        date.month === selectedMonth;

    const showCalendar =
        typeof calendarMonths !== 'undefined' && displayMonth !== null;
    const calendarBody = !showCalendar ? null : (
        <>
            {calendarMonths.get(displayMonth)?.map((formattedDay, index) => (
                <div key={`${displayMonth}_${index}`}>
                    <div
                        className={clsx(
                            'flex flex-col place-content-center text-center w-12 h-12 rounded-full font-poppins text-sm',
                            {
                                'bg-ivy-300': isSelected(formattedDay),
                                'font-normal': !isSelected(formattedDay),
                                'font-medium': isSelected(formattedDay),
                                'text-neutral-900':
                                    !isSelected(formattedDay) &&
                                    isInCurrentMonth(formattedDay),
                                'text-neutral-500':
                                    !isInCurrentMonth(formattedDay),
                                'text-brandGreen-500': isSelected(formattedDay),
                            }
                        )}
                        onClick={() => onClickDate(formattedDay)}
                    >
                        {formattedDay.day}
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <div
            role='document'
            aria-label='calendar'
            className={clsx(
                'absolute',
                'flex',
                'flex-col',
                'sm:top-[88px]',
                'top-16',
                '-left-2',
                'w-[375px]',
                'bg-white',
                'rounded-3xl',
                'shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]',
                'font-poppins',
                'font-normal',
                'text-base',
                'transition-all',
                'overflow-hidden',
                'z-10',
                {
                    'h-0': !isOpen,
                    'h-fit': isOpen,
                    'px-4': isOpen,
                    'py-8': isOpen,
                }
            )}
        >
            <div className='justify-center'>
                <div className='flex'>
                    <PrevMonth disabled={!isPrevMonthValid()} />
                    <div className='grow text-center flex flex-col place-content-center font-poppins font-medium text-base'>
                        {calendarLabel}
                    </div>
                    <NextMonth disabled={!isNextMonthValid()} />
                </div>
                <div className='grid grid-cols-7 grid-rows-5'>
                    {daysHeader}
                    {calendarBody}
                </div>
            </div>
        </div>
    );
}
