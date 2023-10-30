import iconChevronRight from '~/assets/icon_chevron_right.svg';
import Icon from '../../Icon';
import { useStore } from '~/store';

export function NextMonth() {
    const selectMonth = useStore((state) => state.selectMonth);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectYear = useStore((state) => state.selectYear);
    const selectedYear = useStore((state) => state.selectedYear);

    const getNextMonth = <T extends number>(monthNumber: T): T => {
        return (monthNumber === 12 ? 1 : monthNumber + 1) as T;
    };

    const onClickNextMonth = () => {
        const nextMonth = getNextMonth(selectedMonth);

        selectMonth(nextMonth);

        if (nextMonth === 1) {
            selectYear(selectedYear + 1);
        }
    };

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
