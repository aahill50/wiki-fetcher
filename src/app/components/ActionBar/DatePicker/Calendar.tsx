import { useCallback, useEffect, useState } from 'react';
import { useStore } from '~/store';
import CalendarBody from './CalendarBody';
import PrevMonth from './PrevMonth';
import NextMonth from './NextMonth';
import {
    getCalendarMonths as getCalendarMonths,
    FormattedDate,
    getDisplayMonth,
    numDaysNextMonth,
    numDaysPrevMonth,
} from './calendarUtilities';
import classes from '../../classes';
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
    const setOpenMenu = useStore((state) => state.setOpenMenu);

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
            setOpenMenu(null);
        },
        [selectDay, selectMonth, selectYear]
    );

    const showCalendar = !!calendarMonths && !!displayMonth;

    return (
        <div
            role='document'
            aria-label='calendar'
            className={classes.calendar({ isOpen })}
        >
            <div className='justify-center'>
                <div className='flex'>
                    <PrevMonth
                        disabled={
                            !numDaysPrevMonth(
                                selectedMonth,
                                selectedYear,
                                calendarMonths
                            )
                        }
                    />
                    <div className='grow text-center flex flex-col place-content-center font-poppins font-medium text-base'>
                        {calendarLabel}
                    </div>
                    <NextMonth
                        disabled={
                            !numDaysNextMonth(
                                selectedMonth,
                                selectedYear,
                                calendarMonths
                            )
                        }
                    />
                </div>
                <div className='grid grid-cols-7 grid-rows-5'>
                    {daysHeader}
                    {!showCalendar ? null : (
                        <CalendarBody
                            calendarMonths={calendarMonths}
                            displayMonth={displayMonth}
                            onClick={onClickDate}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
