import { MONTHS } from '~/constants';

const MS_TO_SECS = 1000;
const SECS_TO_MINS = 60;
const MINS_TO_HOURS = 60;
const HOURS_TO_DAYS = 24;
const FIRST_SUNDAY = new Date(2015, 3, 26);
const DAYS_TO_PREV_SUNDAY = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
} as const;

type DayNameAbbr = keyof typeof DAYS_TO_PREV_SUNDAY;

export interface FormattedDate {
    day: number;
    month: number;
    dayName: DayNameAbbr;
    year: number;
}

export interface FormattedDateWithDisplayMonth extends FormattedDate {
    displayMonth: Record<string, boolean>;
}

const getMonthName = (monthNum: number) => MONTHS[monthNum];

export const getDisplayMonth = <T extends { month: number; year: number }>(
    date: T
): string => {
    return `${getMonthName(date.month)} ${date.year}`;
};

const getFormattedDate = (date: Date): FormattedDate => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    const [dayNamePart, , monthNumPart, , dayPart, , yearPart] =
        Intl.DateTimeFormat('en', options).formatToParts(date);

    const day = Number(dayPart.value);
    const month = Number(monthNumPart.value);
    const dayName = dayNamePart.value as DayNameAbbr;
    const year = Number(yearPart.value);

    return {
        day,
        month,
        dayName,
        year,
    };
};

const getFormattedDatesWithDisplayMonth = (
    formattedDates: FormattedDate[]
): FormattedDateWithDisplayMonth[] => {
    const finalFormattedDates: FormattedDateWithDisplayMonth[] = [
        ...formattedDates,
    ].map((date) => {
        const displayMonth = getDisplayMonth(date);
        return {
            ...date,
            displayMonth: {
                [displayMonth]: true,
            },
        };
    });

    finalFormattedDates.forEach((formattedDate, index) => {
        const { month, year } = formattedDate;
        if (formattedDate.day === 1) {
            let prevIndex = index - 1;
            let prevDay = finalFormattedDates[prevIndex];

            // Add current display month to days from the previous month that fall in the same week as the 1st of the new month
            while (prevDay && prevDay.dayName !== 'Sat') {
                prevDay.displayMonth[getDisplayMonth(formattedDate)] = true;
                prevIndex--;
                prevDay = finalFormattedDates[prevIndex];
            }

            const prevDisplayMonth = month - 1 < 1 ? 12 : month - 1;
            const prevDisplayYear = prevDisplayMonth === 12 ? year - 1 : year;
            let nextIndex = index;
            let nextDay = finalFormattedDates[nextIndex];

            // Add previous display month to days from the current month that fall in the same week as the last day of the previous month
            while (nextDay && nextDay.dayName !== 'Sun') {
                nextDay.displayMonth[
                    getDisplayMonth({
                        month: prevDisplayMonth,
                        year: prevDisplayYear,
                    })
                ] = true;
                nextIndex++;
                nextDay = finalFormattedDates[nextIndex];
            }
        }
    });

    return finalFormattedDates;
};

export const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

const getDiffInMs = (date1: Date, date2: Date): number => {
    return Math.abs(date1.getTime() - date2.getTime());
};

const getDiffInDays = (date1: Date, date2: Date): number => {
    const diffInMs = getDiffInMs(date1, date2);

    return (
        diffInMs / (MS_TO_SECS * SECS_TO_MINS * MINS_TO_HOURS * HOURS_TO_DAYS)
    );
};

const getCalendarDays = () => {
    const day = new Date(FIRST_SUNDAY);
    const diffInDays = getDiffInDays(getToday(), day);
    const calendarDays = [];

    while (calendarDays.length < diffInDays) {
        const formattedDate = getFormattedDate(day);
        calendarDays.push(formattedDate);
        day.setDate(day.getDate() + 1);
    }

    return calendarDays;
};

export const getCalendarMonths = () => {
    const calendarMonths = new Map<string, FormattedDate[]>([]);
    const calendarDays = getCalendarDays();
    const datesWithDisplayMonths =
        getFormattedDatesWithDisplayMonth(calendarDays);

    datesWithDisplayMonths.forEach((date) => {
        Object.keys(date.displayMonth).forEach((displayMonth) => {
            const currentDisplayMonth = calendarMonths.get(displayMonth) || [];
            calendarMonths.set(displayMonth, [...currentDisplayMonth, date]);
        });
    });

    return calendarMonths;
};
