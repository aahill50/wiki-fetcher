import { useCallback } from 'react';
import { useStore } from '~/store';
import classes from '../../classes';
import { type FormattedDate } from './calendarUtilities';

interface Props {
    calendarMonths: Map<string, FormattedDate[]>;
    displayMonth: string;
    onClick: ({
        day,
        month,
        year,
    }: {
        day: number;
        month: number;
        year: number;
    }) => void;
}

export default function CalendarBody(props: Props) {
    const selectedDay = useStore((state) => state.selectedDay);
    const selectedMonth = useStore((state) => state.selectedMonth);

    const { calendarMonths, displayMonth, onClick } = props;

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

    return (
        <>
            {calendarMonths.get(displayMonth)?.map((formattedDay, index) => (
                <div key={`${displayMonth}_${index}`}>
                    <div
                        className={classes.calendarBody({
                            isInCurrentMonth: isInCurrentMonth(formattedDay),
                            isSelected: isSelected(formattedDay),
                        })}
                        onClick={() => onClick(formattedDay)}
                    >
                        {formattedDay.day}
                    </div>
                </div>
            ))}
        </>
    );
}
