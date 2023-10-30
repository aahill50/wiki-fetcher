import iconChevronLeft from '~/assets/icon_chevron_left.svg';
import Icon from '../../Icon';
import { useStore } from '~/store';

export function PrevMonth() {
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const selectMonth = useStore((state) => state.selectMonth);
    const selectYear = useStore((state) => state.selectYear);

    const getPreviousMonth = <T extends number>(monthNumber: T): T => {
        return (monthNumber === 1 ? 12 : monthNumber - 1) as T;
    };

    const onClickPrevMonth = () => {
        const prevMonth = getPreviousMonth(selectedMonth);

        selectMonth(prevMonth);

        if (prevMonth === 12) {
            selectYear(selectedYear - 1);
        }
    };

    return (
        <div onClick={onClickPrevMonth}>
            <Icon
                alt='prev-month'
                width={24}
                height={24}
                svg={iconChevronLeft}
            />
        </div>
    );
}
