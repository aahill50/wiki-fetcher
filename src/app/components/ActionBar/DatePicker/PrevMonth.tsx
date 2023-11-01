import { useCallback } from 'react';
import { useStore } from '~/store';
import Icon from '../../Icon';
import iconChevronLeft from '~/assets/icon_chevron_left.svg';

interface Props {
    disabled: boolean;
}

export default function PrevMonth(props: Props) {
    const { disabled } = props;

    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const selectMonth = useStore((state) => state.selectMonth);
    const selectYear = useStore((state) => state.selectYear);

    const getPreviousMonth = <T extends number>(monthNumber: T): T => {
        return (monthNumber === 1 ? 12 : monthNumber - 1) as T;
    };

    const onClickPrevMonth = useCallback(() => {
        if (disabled) {
            return;
        }
        const prevMonth = getPreviousMonth(selectedMonth);

        selectMonth(prevMonth);

        if (prevMonth === 12) {
            selectYear(selectedYear - 1);
        }
    }, [disabled, selectMonth, selectYear, selectedMonth, selectedYear]);

    return (
        <div onClick={onClickPrevMonth} role='button' aria-label='prev-month'>
            <Icon
                alt='prev-month'
                width={24}
                height={24}
                svg={iconChevronLeft}
            />
        </div>
    );
}
