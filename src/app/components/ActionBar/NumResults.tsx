'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '~/store';
import ActionBarMenu from './ActionBarMenu';
import Icon from '../Icon';
import iconList from '~/assets/icon_list.svg';
import { MENUS, NUM_RESULTS } from '~/constants';
import classes from '../classes';

export default function NumResults() {
    const numResults = useStore((state) => state.numResults);
    const setNumResults = useStore((state) => state.setNumResults);
    const openMenu = useStore((state) => state.openMenu);
    const setOpenMenu = useStore((state) => state.setOpenMenu);

    const [isOpen, setIsOpen] = useState(openMenu === MENUS.NUM_RESULTS);

    useEffect(() => {
        setIsOpen(openMenu === MENUS.NUM_RESULTS);
    }, [openMenu]);

    const onClickNumResultsMenu = useCallback(() => {
        setOpenMenu(isOpen ? null : MENUS.NUM_RESULTS);
    }, [isOpen, setOpenMenu]);

    const onClickNumResultsOption = useCallback(
        (numResults: number) => {
            setNumResults(numResults);
            setIsOpen(false);
        },
        [setNumResults]
    );

    const pageSizePicker = (
        <>
            {NUM_RESULTS.map((val) => {
                return (
                    <div
                        key={`page-size-${val}`}
                        className='flex mb-6 last:mb-0 justify-center'
                        onClick={() => onClickNumResultsOption(val)}
                    >
                        {val}
                    </div>
                );
            })}
        </>
    );

    return (
        <ActionBarMenu
            isOpen={isOpen}
            displayValue={numResults}
            label='NUM RESULTS'
            smallLabel='# RESULTS'
            icon={
                <Icon
                    alt='results-icon'
                    height={40}
                    svg={iconList}
                    width={40}
                />
            }
            onClick={onClickNumResultsMenu}
        >
            <div className={classes.numResults({ isOpen })}>
                {pageSizePicker}
            </div>
        </ActionBarMenu>
    );
}
