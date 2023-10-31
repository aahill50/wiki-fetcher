'use client';

import { useEffect, useState } from 'react';
import Icon from '../../Icon';
import iconCalendar from '~/assets/icon_calendar.svg';
import { useStore } from '~/store';
import Calendar from './Calendar';
import ActionBarMenu from '../ActionBarMenu';
import { MENUS } from '~/constants';

export default function DatePicker() {
    const selectedDay = useStore((state) => state.selectedDay);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const openMenu = useStore((state) => state.openMenu);
    const setOpenMenu = useStore((state) => state.setOpenMenu);

    const [isOpen, setIsOpen] = useState(openMenu === MENUS.DATE_PICKER);

    useEffect(() => {
        setIsOpen(openMenu === MENUS.DATE_PICKER);
    }, [openMenu]);

    const date = new Date(
        Date.UTC(selectedYear, selectedMonth - 1, selectedDay + 1)
    );
    const dateString = Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(date);

    const onClickDatePicker = () => {
        setOpenMenu(isOpen ? null : MENUS.DATE_PICKER);
    };

    return (
        <ActionBarMenu
            isOpen={isOpen}
            displayValue={dateString}
            label='DATE'
            icon={
                <Icon
                    alt='calendar-icon'
                    height={40}
                    svg={iconCalendar}
                    width={40}
                />
            }
            onClick={onClickDatePicker}
        >
            <Calendar isOpen={isOpen} />
        </ActionBarMenu>
    );
}
