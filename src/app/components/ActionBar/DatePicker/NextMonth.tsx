import { useCallback } from 'react';
import { useStore } from '~/store';
import Icon from '../../Icon';
import iconChevronRight from '~/assets/icon_chevron_right.svg';

interface Props {
    disabled: boolean;
}

export function NextMonth(props: Props) {
    const { disabled } = props;

    const selectMonth = useStore((state) => state.selectMonth);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectYear = useStore((state) => state.selectYear);
    const selectedYear = useStore((state) => state.selectedYear);

    const getNextMonth = (monthNumber: number) => {
        return monthNumber === 12 ? 1 : monthNumber + 1;
    };

    const onClickNextMonth = useCallback(() => {
        if (disabled) {
            return;
        }
        const nextMonth = getNextMonth(selectedMonth);

        selectMonth(nextMonth);

        if (nextMonth === 1) {
            selectYear(selectedYear + 1);
        }
    }, [disabled, selectMonth, selectYear, selectedMonth, selectedYear]);

    return (
        <div onClick={onClickNextMonth}>
            <Icon
                alt='next-month'
                width={24}
                height={24}
                svg={iconChevronRight}
            />
        </div>
    );
}
