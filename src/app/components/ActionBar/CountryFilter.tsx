'use client';

import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useStore } from '~/store';
import ActionBarMenu from './ActionBarMenu';
import Icon from '../Icon';
import iconGlobe from '~/assets/icon_globe.svg';
import { COUNTRY_CODE, COUNTRY_CODES, MENUS } from '~/constants';

export default function CountryFilter() {
    const country = useStore((state) => state.country);
    const setCountry = useStore((state) => state.setCountry);
    const openMenu = useStore((state) => state.openMenu);
    const setOpenMenu = useStore((state) => state.setOpenMenu);

    const [displayCountry, setDisplayCountry] = useState(
        COUNTRY_CODES[country]
    );

    const [isOpen, setIsOpen] = useState(openMenu === MENUS.COUNTRY);

    useEffect(() => {
        setDisplayCountry(COUNTRY_CODES[country]);
    }, [country]);

    useEffect(() => {
        setIsOpen(openMenu === MENUS.COUNTRY);
    }, [openMenu]);

    const onClickCountryMenu = useCallback(() => {
        setOpenMenu(isOpen ? null : MENUS.COUNTRY);
    }, [isOpen, setOpenMenu]);

    const onClickCountry = useCallback(
        (code: COUNTRY_CODE) => {
            setCountry(code);
        },
        [setCountry]
    );

    const isActiveCountry = (countryCode: COUNTRY_CODE) => {
        return countryCode === country;
    };

    const countryPicker = (
        <>
            {Object.keys(COUNTRY_CODES)
                .sort((a, b) => {
                    return COUNTRY_CODES[a as COUNTRY_CODE].localeCompare(
                        COUNTRY_CODES[b as COUNTRY_CODE]
                    );
                })
                .map((key) => {
                    const code = key as COUNTRY_CODE;
                    const countryName = COUNTRY_CODES[code];
                    return (
                        <div
                            role='option'
                            aria-selected={isActiveCountry(code)}
                            key={`page-size-${code}`}
                            className='flex mb-6 last:mb-0 text-xs'
                            onClick={() => onClickCountry(code)}
                        >
                            {countryName}
                        </div>
                    );
                })}
        </>
    );

    return (
        <ActionBarMenu
            isOpen={isOpen}
            displayValue={displayCountry}
            label='COUNTRY'
            icon={
                <Icon
                    alt='results-icon'
                    height={40}
                    svg={iconGlobe}
                    width={40}
                />
            }
            onClick={onClickCountryMenu}
        >
            <div
                className={clsx(
                    'absolute',
                    'flex',
                    'flex-col',
                    'sm:top-[88px]',
                    'top-16',
                    '-left-2',
                    'w-[200px]',
                    'bg-white',
                    'rounded-3xl',
                    'shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]',
                    'font-poppins',
                    'font-normal',
                    'text-base',
                    'transition-all',
                    'overflow-y-scroll',
                    'max-h-[400px]',
                    'z-10',
                    {
                        'h-0': !isOpen,
                        'h-fit': isOpen,
                        'px-2': isOpen,
                        'py-8': isOpen,
                    }
                )}
            >
                {countryPicker}
            </div>
        </ActionBarMenu>
    );
}
